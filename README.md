# Artiq Marketing Site

Public informational website for **Artiq** — Discover & Collect Art.

This is a separate site from the mobile/web marketplace app. It shares the same Supabase Auth project, so people can sign in with the same email/password.

## Pages

- `/` — Home
- `/how-it-works` — How Artiq works
- `/download` — App Store / Play links
- `/auth` — Sign in / Sign up
- `/account` — Signed-in account (no marketplace)

## Develop

```bash
npm install
npm run dev
```

Open the local URL (usually `http://localhost:5173`).

## Environment

Copy `.env.example` to `.env` and use the same Supabase values as the main app:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

In the [Supabase Auth settings](https://supabase.com/dashboard/project/dlelgxbxgoqksppvaikq/auth/url-configuration), add your marketing site URL to **Redirect URLs** (e.g. `http://localhost:5173/**` and later `https://yourdomain.com/**`).

## Deploy + custom domain

1. Push this repo to GitHub.
2. Deploy on [Vercel](https://vercel.com) or [Netlify](https://netlify.com) (Vite preset).
3. Buy a domain (Cloudflare, Namecheap, etc.) and connect it in the host’s Domain settings.
4. Add the production URL to Supabase redirect allowlist.

## App Store links

Edit `src/lib/appStore.ts` and set `APPLE_APP_STORE_ID` after App Store Connect submission. Android uses package `com.artiq.app`.
