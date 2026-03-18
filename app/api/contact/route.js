import { NextResponse } from "next/server";
import { contactSchema } from "../../../lib/contactSchema";
import { rateLimit } from "../../../lib/rateLimit";
import { createMauticContact } from "../../../lib/mauticClient";

function getClientIp(req) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "0.0.0.0";
}

export async function POST(req) {
  const origin = req.headers.get("origin") || "";
  const host = req.headers.get("host") || "";
  const isSameOrigin = !origin || origin.includes(host);

  if (!isSameOrigin) {
    return NextResponse.json({ ok: false, error: "Bad origin" }, { status: 403 });
  }

  const ip = getClientIp(req);
  const ua = req.headers.get("user-agent") || "unknown";
  const key = `contact:${ip}:${ua.slice(0, 40)}`;

  const rl = rateLimit({ key, windowMs: 60_000, max: 5 });
  if (!rl.ok) {
    return NextResponse.json({ ok: false, error: "Rate limited" }, { status: 429 });
  }

  let json;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }

  const data = parsed.data;

  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const elapsed = Date.now() - data.startedAt;
  if (elapsed < 1200) {
    return NextResponse.json({ ok: false, error: "Too fast" }, { status: 400 });
  }

  try {
    await createMauticContact({
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message,
      budget: data.budget,
      source: { ip },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Submission failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

