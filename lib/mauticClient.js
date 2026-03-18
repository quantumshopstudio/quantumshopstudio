import { getMauticAccessToken } from "./mauticAuth";

export async function createMauticContact({ name, email, company, message, budget, source }) {
  const base = process.env.MAUTIC_BASE_URL;
  if (!base) throw new Error("Missing MAUTIC_BASE_URL.");

  const token = await getMauticAccessToken();

  const tag = process.env.MAUTIC_CONTACT_TAG;
  const messageField = process.env.MAUTIC_MESSAGE_FIELD_ALIAS;
  const budgetField = process.env.MAUTIC_BUDGET_FIELD_ALIAS;

  const payload = {
    firstname: name,
    email,
    company: company || undefined,
    tags: tag ? [tag] : undefined,
    ipAddress: source?.ip,
    ...(messageField ? { [messageField]: message } : {}),
    ...(budgetField ? { [budgetField]: budget || undefined } : {}),
  };

  const res = await fetch(`${base.replace(/\/$/, "")}/api/contacts/new`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Mautic contact create failed: ${res.status} ${text}`);
  }

  return JSON.parse(text);
}

