# Firebase Deployment Guide for Rollermax

This guide walks through deploying Rollermax to Firebase Hosting with automated CI/CD via GitHub Actions.

## Prerequisites

- GitHub repository initialized with this codebase
- Firebase account and project
- Node.js v20+ locally
- `firebase-tools` CLI installed: `npm install -g firebase-tools`

## Step 1: Set Up Firebase Project

### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **Create a project** → enter "rollermax-courier"
3. Choose your region (e.g., us-central1)
4. Enable Google Analytics (optional)
5. Create the project

### 1.2 Initialize Firebase Locally
```bash
npm install -g firebase-tools
firebase login  # Authenticate with your Google account
firebase init hosting
```

When prompted:
- **Select project**: Choose your newly created Firebase project
- **Public directory**: `out` (or use default `.public`)
- **Configure as single-page app**: `No` (we have static export)
- **Set up automatic builds**: Choose `Yes` if you want GitHub integration

### 1.3 Verify firebase.json
Ensure `firebase.json` has:
```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

## Step 2: Set Up GitHub Actions CI/CD

### 2.1 Generate Firebase Service Account Key
1. In [Firebase Console](https://console.firebase.google.com), go to **Project Settings** → **Service Accounts**
2. Click **Generate a New Private Key**
3. Save the JSON file securely (do NOT commit to repo)

### 2.2 Add Secrets to GitHub Repository
1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:
   - **FIREBASE_SERVICE_ACCOUNT_KEY**: Paste the entire JSON from Step 2.1
   - **FIREBASE_PROJECT_ID**: Found in Firebase console Project Settings
3. Click **New repository secret** for each

### 2.3 Verify GitHub Actions Workflow
The `.github/workflows/deploy.yml` file should contain:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run export
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_KEY }}'
          channelId: live
          projectId: ${{ secrets.FIREBASE_PROJECT_ID }}
```

## Step 3: Build and Deploy

### 3.1 Local Build & Preview
```bash
# Install dependencies
npm install

# Build static export to `out` folder
npm run export

# Preview the exported site
npm run preview:export
```

### 3.2 Deploy Manually (Optional)
```bash
firebase deploy --only hosting
```

### 3.3 Deploy via GitHub (Automated)
1. Push changes to the `main` branch:
   ```bash
   git add .
   git commit -m "chore: add Firebase deploy workflow"
   git push origin main
   ```
2. GitHub Actions workflow runs automatically
3. Check workflow status in **GitHub repo** → **Actions** tab
4. On success, your site is live at: `https://<PROJECT_ID>.web.app`

## Step 4: Image Optimization (Optional)

To optimize images before deployment:

```bash
# Place images in assets_to_import folder
mkdir -p assets_to_import
# Copy your images there

# Import and normalize filenames
npm run import-images

# Optimize to WebP and thumbnails
npm run optimize-images

# Commit the optimized images
git add public/images
git commit -m "chore: add optimized images"
git push origin main
```

## Step 5: Environment Variables (If Needed)

For Firebase integration features (login, analytics):

### 5.1 Add to `.env.local` (local development)
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=<your-api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id>
```

### 5.2 Add GitHub Secrets for CI/CD
Add each environment variable as a GitHub secret (prefixed `NEXT_PUBLIC_`), then update `.github/workflows/deploy.yml`:

```yaml
env:
  NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.NEXT_PUBLIC_FIREBASE_API_KEY }}
  # ... other env vars
```

## Step 6: Custom Domain (Optional)

1. Go to **Firebase Hosting** → Click your site → **Connect domain**
2. Enter your custom domain (e.g., `rollermax.co.ke`)
3. Follow DNS configuration steps provided by Firebase
4. Wait up to 48 hours for DNS to propagate

## Troubleshooting

### Build fails with "next export not found"
✓ Fixed: Use `output: 'export'` in `next.config.js` and `npm run export`

### GitHub Actions workflow fails
- Check **Actions** tab for error logs
- Verify all secrets are added correctly
- Ensure `FIREBASE_SERVICE_ACCOUNT_KEY` is valid JSON

### Firebase deployment slow
- Compress images with `npm run optimize-images`
- Check bundle size: `npm run build` and inspect `.next`
- Consider enabling caching headers in `firebase.json`

### Images not loading after deploy
1. Verify images are in `public/images` folder
2. Run `npm run import-images` to normalize filenames
3. Rebuild and redeploy: `npm run export && firebase deploy`

## Monitoring & Analytics

Monitor your deployment performance:
1. **Firebase Console** → **Hosting** → Performance metrics
2. **Google Analytics** (if enabled) → Real-time visitor stats
3. **GitHub Actions** → Deployment history and logs

## Summary of npm Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server on `localhost:3000` |
| `npm run build` | Production build (used by `export`) |
| `npm run export` | Static export to `out` folder for hosting |
| `npm run import-images` | Import and normalize images from `assets_to_import` |
| `npm run optimize-images` | Generate WebP + thumbnails (requires `sharp`) |
| `npm run preview:export` | Preview exported site locally |
| `npm run lint` | Check TypeScript/ESLint |

## Next Steps

- Add real Firebase features (Auth, Firestore, Storage)
- Implement admin dashboard for shipment tracking
- Set up email notifications (SendGrid/Firebase Cloud Functions)
- Add A/B testing with Firebase Remote Config
- Monitor performance with Firebase Performance Monitoring

---

**Questions?** Check the Firebase docs: https://firebase.google.com/docs/hosting
