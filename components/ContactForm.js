"use client";

import { useEffect, useRef, useState } from "react";

export function ContactForm() {
  const startedAtRef = useRef(0);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    if (!startedAtRef.current) {
      setStatus({
        state: "error",
        message: "Please wait a moment and try again.",
      });
      return;
    }
    payload.startedAt = startedAtRef.current;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setStatus({ state: "error", message: "Could not submit. Please try again." });
        return;
      }

      e.currentTarget.reset();
      setStatus({ state: "success", message: "Submitted. I’ll reply soon." });
    } catch {
      setStatus({ state: "error", message: "Network error. Please try again." });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-panel/30 p-6"
    >
      <div className="grid gap-2">
        <label className="text-sm text-slate-200" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="rounded-xl border border-white/10 bg-black/20 px-3 py-2"
          autoComplete="name"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm text-slate-200" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-xl border border-white/10 bg-black/20 px-3 py-2"
          autoComplete="email"
        />
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm text-slate-200" htmlFor="company">
            Company (optional)
          </label>
          <input
            id="company"
            name="company"
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2"
            autoComplete="organization"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm text-slate-200" htmlFor="budget">
            Budget (optional)
          </label>
          <input
            id="budget"
            name="budget"
            placeholder="$2k–$10k"
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm text-slate-200" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="rounded-xl border border-white/10 bg-black/20 px-3 py-2"
        />
      </div>

      {/* honeypot */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <button
        disabled={status.state === "loading"}
        className="rounded-xl bg-neonCyan/15 px-4 py-2 text-sm font-medium text-neonCyan shadow-glow hover:bg-neonCyan/20 disabled:opacity-60"
      >
        {status.state === "loading" ? "Sending..." : "Send message"}
      </button>

      {status.state !== "idle" && (
        <p className={status.state === "success" ? "text-sm text-neonCyan" : "text-sm text-slate-200"}>
          {status.message}
        </p>
      )}

      <p className="text-xs text-slate-400">
        Security: server-side validation, rate limiting, spam protection, and no client-exposed
        secrets.
      </p>
    </form>
  );
}

