let cached = { accessToken: null, expiresAt: 0 };

export async function getMauticAccessToken() {
  const tokenUrl = process.env.MAUTIC_OAUTH_TOKEN_URL;
  const clientId = process.env.MAUTIC_OAUTH_CLIENT_ID;
  const clientSecret = process.env.MAUTIC_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.MAUTIC_OAUTH_REFRESH_TOKEN;

  if (!tokenUrl || !clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing required Mautic OAuth environment variables.");
  }

  const now = Date.now();
  if (cached.accessToken && now < cached.expiresAt - 30_000) return cached.accessToken;

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Mautic token refresh failed: ${res.status} ${text}`);
  }

  const json = await res.json();
  cached.accessToken = json.access_token;
  cached.expiresAt = now + json.expires_in * 1000;
  return cached.accessToken;
}

