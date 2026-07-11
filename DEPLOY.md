# Deploy Mister Plumbr to Vercel

## 1. Prerequisites

- A [Vercel](https://vercel.com) account
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (free tier is fine)
- Push access to `https://github.com/mister-plumbr/mr-plumber-webapp.git`

## 2. Set up MongoDB Atlas

1. Create a cluster in MongoDB Atlas.
2. Create a database user (Database Access → Add New Database User).
3. Get the connection string:
   - Clusters → Connect → Drivers → Node.js
   - Copy the SRV string, e.g.:
     ```
     mongodb+srv://<db_user>:<password>@cluster0.xxxxx.mongodb.net/misterplumbr?retryWrites=true&w=majority
     ```
4. Whitelist Vercel IPs:
   - Network Access → Add IP Address → `0.0.0.0/0` (for testing) or Vercel’s static IPs on a Pro plan.

## 3. Connect repo to Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Import `mister-plumbr/mr-plumber-webapp`.
3. Vercel should auto-detect **Next.js**.
4. Leave build/output settings as default.
5. Click **Deploy**.

## 4. Add environment variables

In your Vercel project dashboard:

1. Go to **Settings → Environment Variables**.
2. Add:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `MONGODB_URI` | `mongodb+srv://...` | Production, Preview, Development |
   | `JWT_SECRET` | A random 32+ character string | Production, Preview, Development |
   | `BLOB_STORE_ID` | Your Vercel Blob store ID | Production, Preview, Development |
   | `BLOB_READ_WRITE_TOKEN` | Your Vercel Blob read/write token | Production, Preview, Development |

3. **Redeploy** the project.

## 5. Seed the production database

From your local machine, run:

```bash
# Make sure you have the latest code
git pull origin main

# Set production MongoDB URI temporarily
export MONGODB_URI="mongodb+srv://<db_user>:<password>@cluster0.xxxxx.mongodb.net/misterplumbr"

# Install deps if needed
npm install

# Seed demo users, plumbers, and bookings
npm run seed
```

On Windows (PowerShell):

```powershell
$env:MONGODB_URI="mongodb+srv://..."
npm run seed
```

## 6. Verify the deployment

Open the live URL Vercel gives you and test these flows:

- **Customer:** `/login` → `rahul@example.com` / `password123` → `/dashboard`
- **Operations:** `/ops/login` → `ops@misterplumbr.in` / `ops123` → `/ops/dashboard`
- **Plumber:** `/plumber/login` → `+919876567890` / `plumber123` → `/plumber/dashboard`

## 7. Optional: custom domain

1. Vercel project → **Settings → Domains**.
2. Add your domain and follow DNS instructions.

## Notes

- Image uploads currently preview locally only. To store real images, Vercel Blob is configured via `BLOB_STORE_ID` and `BLOB_READ_WRITE_TOKEN`.
- Do **not** commit `.env` — it is already in `.gitignore`.
