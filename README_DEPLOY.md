Deployment guide — Cloud Function seeder and Next.js site

This repository includes a Cloud Function seeder (`functions/seedFunction/index.js`) and a Next.js app with an admin UI to trigger seeding via `app/api/seed-proxy`.

Recommended (secure) automated deploy using GitHub Actions

1. Create a Google service account with the following IAM roles for Firebase deploy:
   - "Firebase Admin" or combination of "Cloud Functions Admin" and "Firebase Hosting Admin"

2. Create a JSON key for that service account, then add it to GitHub Secrets as `FIREBASE_SERVICE_ACCOUNT` (base64-encoded or raw JSON).

3. Add `FIREBASE_PROJECT_ID` secret with your Firebase project id.

4. (Optional) add `SEED_FUNCTION_URL` if you want the Next app proxy to point directly to a known function URL.

The included GitHub Actions workflow `.github/workflows/firebase-deploy.yml` will deploy functions and hosting on push to `main`.

Manual deploy (local)

1. Install the Firebase CLI and log in:

```bash
npm install -g firebase-tools
firebase login
```

2. From the repo root, install functions deps and deploy the seeder function:

```bash
cd functions
npm install
cd ..
# set the seed secret in functions config (replace 'your-secret')
firebase functions:config:set seed.secret="your-secret"
# deploy functions
firebase deploy --only functions:seedDemoData --project your-project-id
```

3. After deploying, set `SEED_FUNCTION_URL` in your hosting environment or `.env.local` to the function URL (you can find it in the deploy output).

4. Use the admin page `/admin/seed` on your deployed site to run the seeder (enter the seed secret when prompted).

Local direct seeding (alternative)

If you prefer to seed locally using service account JSON, you can run the included script using the Firebase Admin SDK:

```bash
# point to service account JSON
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
node scripts/seed-firestore.js
```

Security notes

- Never commit service account JSON to the repo.
- Use a strong `seed.secret` and keep it in GitHub Secrets or `firebase functions:config` only.

If you want, I can:
- Draft the `firebase.json` change to set functions source if you prefer a different layout.
- Deploy the function via CI (I will need access to GitHub secrets or Firebase project access).

*** End of file ***