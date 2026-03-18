const buckets = new Map();

/**
 * Very small/simple rate limiter:
 * - max attempts per window per key
 *
 * Note: in-memory is not reliable across serverless instances. For Vercel/Netlify,
 * swap this with Redis/Upstash for consistent limiting.
 */
export function rateLimit({ key, windowMs, max }) {
  const now = Date.now();
  const b = buckets.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > b.resetAt) {
    b.count = 0;
    b.resetAt = now + windowMs;
  }

  b.count += 1;
  buckets.set(key, b);

  const ok = b.count <= max;
  return { ok, remaining: Math.max(0, max - b.count), resetAt: b.resetAt };
}

