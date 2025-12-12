# Rollermax Courier Platform – Quick Setup & Launch Guide

Welcome to Rollermax! This guide walks you through setting up and deploying the fully built, production-ready courier platform.

## Table of Contents
1. [Features Overview](#features-overview)
2. [Prerequisites](#prerequisites)
3. [Environment Variables Setup](#environment-variables-setup)
4. [Local Development](#local-development)
5. [Deployment to Firebase](#deployment-to-firebase)
6. [Admin Dashboard & User Management](#admin-dashboard--user-management)
7. [Troubleshooting](#troubleshooting)

---

## Features Overview

✅ **Modern, Responsive UI**: Mobile-first design with Tailwind CSS & Framer Motion animations  
✅ **Firebase Authentication**: Email/password and Google Sign-In support  
✅ **User Registration**: New clients can sign up and manage profiles  
✅ **Admin Dashboard**: `/admin` page to view all registered users (requires Firebase admin claim)  
✅ **Secure Cloud Functions**: Server-side user list endpoint protected by Firebase ID tokens  
✅ **SVG Logo**: Polished, scalable brand logo (Rollermax Courier)  
✅ **Gallery**: Curated operations gallery (Banner, Motorcycle, Logo, Camel, Lorry)  
✅ **Auto-Polish**: Prettier runs on `npm install` to format code  
✅ **Static Export**: Next.js static build for fast Firebase Hosting deployment  
✅ **CI/CD Pipeline**: GitHub Actions automatically deploys hosting + functions on push to `main`

---

## Prerequisites

- Node.js v20+ and npm
- Firebase account & CLI (`npm install -g firebase-tools`)
- GitHub account with repository access
- (Optional) Custom domain for Rollermax site

---

## Environment Variables Setup

### Step 1: Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your **rollermax-courier** project
3. Click **Project Settings** → **Service Accounts** → **Generate New Private Key** (save JSON)
4. Copy your **Web SDK config** (from **Project Settings** → **Your Apps** → **Web Config**)

### Step 2: Set Up `.env.local` (Local Development)

Create `.env.local` in the repo root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=<your-api-key-from-web-config>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=rollermax-courier.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=rollermax-courier
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=rollermax-courier.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-sender-id-from-web-config>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id-from-web-config>
NEXT_PUBLIC_FUNCTIONS_URL=https://us-central1-rollermax-courier.cloudfunctions.net
```

### Step 3: Add GitHub Secrets (for CI/CD)

1. Go to **GitHub Repo** → **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:
   - **FIREBASE_SERVICE_ACCOUNT_KEY**: Paste the entire service account JSON from Step 1
   - **FIREBASE_PROJECT_ID**: `rollermax-courier`
   - (Optional) Any `NEXT_PUBLIC_*` values if deploying with different configs

The workflow will automatically deploy hosting + functions when you push to `main`.

---

## Local Development

### 1. Install Dependencies
```bash
npm install
# This runs `postinstall` which auto-formats code with Prettier
```

### 2. Run Dev Server
```bash
npm run dev
# Visit http://localhost:3000
```

### 3. Test Authentication Flow
- Click **"Login"** button in navbar → **Register** or **Sign in with Google**
- After signing in, visit `/admin` to see the admin dashboard
  - *Note: First user must have admin claim set in Firebase Auth custom claims*

### 4. Build & Preview Static Export
```bash
npm run export
npm run preview:export
# Visit http://localhost:3000 to preview production build
```

---

## Deployment to Firebase

### Option A: Automated via GitHub (Recommended)

All secrets are already configured in `.github/workflows/deploy.yml`.

1. **Push to main**:
   ```bash
   git add .
   git commit -m "chore: launch"
   git push origin main
   ```

2. **Watch GitHub Actions**:
   - Go to **GitHub Repo** → **Actions** tab
   - Wait for `Deploy to Firebase Hosting` workflow to complete
   - Site is live at `https://rollermax-courier.web.app` ✅

### Option B: Manual Deployment

1. **Authenticate with Firebase**:
   ```bash
   firebase login
   ```

2. **Deploy Hosting + Functions**:
   ```bash
   npm run export
   firebase deploy --only hosting,functions --project rollermax-courier
   ```

3. **Check Deployment**:
   - Firebase Hosting: `https://rollermax-courier.web.app`
   - Functions available at: `https://us-central1-rollermax-courier.cloudfunctions.net/listUsers`

---

## Admin Dashboard & User Management

### Viewing Registered Users

1. **Local or deployed site**: Click **"Login"** → Sign up / Sign in
2. **Visit `/admin`**:
   - If you have admin privileges, you'll see a table of all registered users
   - Admin access is determined by Firebase ID token `admin` claim

### Setting Admin Claim (for first admin user)

Use Firebase Admin SDK or console to set custom claim:

```bash
# Via Firebase Console:
# 1. Go to Authentication → Users
# 2. Select a user → Custom Claims
# 3. Set: {"admin": true}
```

Or via Firebase CLI:
```bash
firebase functions:shell
// In shell:
admin.auth().setCustomUserClaims('uid-of-user', { admin: true })
```

### Cloud Function: `listUsers`

**Endpoint**: `POST https://us-central1-rollermax-courier.cloudfunctions.net/listUsers`

**Headers**:
```
Authorization: Bearer <firebase-id-token>
```

**Response** (if admin):
```json
{
  "ok": true,
  "users": [
    {
      "uid": "user-123",
      "email": "client@example.com",
      "name": "John Doe",
      "provider": "google",
      "createdAt": "2025-12-12T17:30:00Z"
    }
  ],
  "count": 1
}
```

**Error Responses**:
- `401`: Missing or invalid token
- `403`: User does not have admin claim

---

## npm Scripts Summary

| Script | Purpose |
|--------|---------|
| `npm run dev` | Local dev server (hot reload) |
| `npm run build` | Next.js production build |
| `npm run export` | Static export to `out/` folder |
| `npm run start` | Start Next.js server (for `output: 'server'` mode) |
| `npm run format` | Run Prettier on all files |
| `npm run setup` | Import + optimize images (run after adding to `assets_to_import`) |
| `npm run import-images` | Copy images from `assets_to_import` → `public/images` |
| `npm run optimize-images` | Generate WebP + thumbnails with Sharp |
| `npm run preview:export` | Preview static export locally |

---

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with navbar
│   ├── page.tsx             # Home page
│   ├── admin/page.tsx       # Admin dashboard
│   ├── contact/page.tsx     # Contact form
│   ├── gallery/page.tsx     # Gallery page
│   └── track/page.tsx       # Tracking page
├── components/
│   ├── Navbar.tsx           # Navigation + login button
│   ├── Hero.tsx             # Hero section with tracking
│   ├── Gallery.tsx          # Operations gallery (5 images)
│   ├── Services.tsx         # Service cards
│   ├── LoginPopup.tsx       # Firebase auth modal
│   ├── AdminUsers.tsx       # User list (calls Cloud Function)
│   └── ...
├── lib/
│   └── firebase.ts          # Firebase client SDK init
├── functions/
│   ├── index.js             # Cloud Function: listUsers
│   └── package.json
├── public/
│   ├── logo.svg             # Brand logo
│   ├── images/              # Optimized images (5 files)
│   └── ...
├── scripts/
│   ├── import-images.js     # Image import automation
│   └── optimize-images.js   # WebP + thumbnail generation
├── .github/workflows/
│   └── deploy.yml           # GitHub Actions CI/CD
├── firebase.json            # Firebase hosting config
├── next.config.js           # Next.js config (output: 'export')
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript config
└── ...
```

---

## Customization Tips

### Adding New Pages
1. Create file in `app/[page]/page.tsx`
2. Add route to Navbar if needed
3. Use shared components (Hero, Services, Gallery, Footer)

### Updating Gallery Images
1. Place images in `assets_to_import/`
2. Run `npm run setup` (imports + optimizes)
3. Images auto-load from `public/images/manifest.json`

### Styling & Colors
- Tailwind config: `tailwind.config.js`
- Custom colors: `roller-blue`, `roller-red`, `roller-dark`
- Fonts & animations managed via Tailwind + Framer Motion

### Adding More Admin Features
1. Create new Cloud Functions in `functions/`
2. Call via Firebase client from components
3. Protect with `admin` claim check

---

## Troubleshooting

### Build fails: "Firebase: Error (auth/invalid-api-key)"
✓ **Fixed**: Firebase init now gracefully handles missing credentials  
- This warning is normal during `npm run export` without env vars  
- Set `NEXT_PUBLIC_FIREBASE_*` vars for full functionality

### Authentication not working
- Verify all `NEXT_PUBLIC_FIREBASE_*` environment variables
- Check Firebase project has **Authentication** enabled
- Ensure Google Sign-In provider is configured in Firebase Console

### Admin page shows "Access denied"
- User doesn't have `admin` claim in Firebase Auth
- Use Firebase Console or Admin SDK to set `{"admin": true}` custom claim
- Refresh page after updating claim

### Images not showing in Gallery
- Images must be in `public/images/`
- Update `public/images/manifest.json` with filenames
- Current gallery shows: Banner, Motorcycle, Rollermax logo, Camel, Lorry

### GitHub Actions deployment fails
- Check workflow logs: **Actions** tab → failed run
- Verify secrets: `FIREBASE_SERVICE_ACCOUNT_KEY` must be valid JSON
- Ensure `FIREBASE_PROJECT_ID` matches your project

---

## Next Steps

1. **Add custom domain**: Firebase Hosting → Connect domain
2. **Enable more auth methods**: Firebase Console → Authentication → Sign-in methods
3. **Add shipment tracking backend**: Create Cloud Firestore collection `shipments` with routes
4. **Email notifications**: Use SendGrid or Firebase Cloud Messaging
5. **Analytics**: Enable Google Analytics in Firebase

---

## Support

- **Firebase Docs**: https://firebase.google.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: Check repository for known issues

---

**Rollermax Courier Platform – Fully Built & Ready to Launch!** 🚀
