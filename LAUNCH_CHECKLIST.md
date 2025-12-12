# Rollermax Launch Checklist

## Pre-Launch (One-Time Setup)

- [ ] **Firebase Project Created**
  - Project ID: `rollermax-courier`
  - Region: `us-central1` (or your choice)
  
- [ ] **GitHub Secrets Added** (Settings → Secrets and variables → Actions)
  - [ ] `FIREBASE_SERVICE_ACCOUNT_KEY` = service account JSON
  - [ ] `FIREBASE_PROJECT_ID` = `rollermax-courier`
  - [ ] (Optional) `NEXT_PUBLIC_*` Firebase config vars

- [ ] **`.env.local` Created** (for local dev)
  - [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
  - [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
  - [ ] `NEXT_PUBLIC_FUNCTIONS_URL` (e.g., `https://us-central1-rollermax-courier.cloudfunctions.net`)

- [ ] **Firebase Auth Enabled**
  - [ ] Email/Password provider enabled
  - [ ] Google Sign-In configured with OAuth credentials
  - [ ] Firestore Database created (in Native mode)

- [ ] **First Admin User Created**
  - [ ] User registered and confirmed
  - [ ] Custom claim `{"admin": true}` set via Firebase Console or Admin SDK

## Launch to Production

### Local Testing
```bash
npm install              # Install deps + auto-format
npm run dev             # Test locally on http://localhost:3000
npm run export          # Build static export
npm run preview:export  # Preview production build
```

- [ ] **Test Registration Flow**
  - [ ] Sign up with email/password
  - [ ] Sign in with Google
  - [ ] Verify user stored in Firestore `users` collection

- [ ] **Test Admin Dashboard**
  - [ ] Visit `/admin` as admin user
  - [ ] Verify user list displays correctly
  - [ ] Try accessing as non-admin (should show "Access denied")

### Deployment

**Option A: Automated (Recommended)**
```bash
git add .
git commit -m "Launch: ready for production"
git push origin main
# GitHub Actions deploys automatically ✓
```

- [ ] **Check GitHub Actions**
  - [ ] Go to Actions tab
  - [ ] Wait for `Deploy to Firebase Hosting` workflow to complete
  - [ ] Confirm deployment status: **Success**

- [ ] **Verify Live Site**
  - [ ] Visit `https://rollermax-courier.web.app`
  - [ ] Test navigation, gallery, and login
  - [ ] Visit `/admin` and verify user list loads

**Option B: Manual Deployment**
```bash
firebase login
firebase deploy --only hosting,functions --project rollermax-courier
```

- [ ] **Verify Deployment**
  - [ ] Hosting: `https://rollermax-courier.web.app`
  - [ ] Functions: `https://us-central1-rollermax-courier.cloudfunctions.net/listUsers`

## Post-Launch

- [ ] **Set Up Custom Domain** (optional)
  - [ ] Firebase Hosting → Connect domain
  - [ ] Follow DNS configuration
  - [ ] Wait 24-48 hours for propagation

- [ ] **Enable Analytics** (optional)
  - [ ] Firebase Console → Reporting → Realtime
  - [ ] Monitor user signups and page views

- [ ] **Monitor Performance**
  - [ ] Firebase Hosting → Performance metrics
  - [ ] Check CloudFunctions logs for errors
  - [ ] Review Firebase Authentication activity

- [ ] **Share Site with Clients**
  - [ ] `https://rollermax-courier.web.app` (or custom domain)
  - [ ] Clients can register and log in
  - [ ] Direct admins to `/admin` for user management

## Maintenance

- [ ] **Weekly**: Check Firebase logs for errors
- [ ] **Monthly**: Review registered users and engagement
- [ ] **As needed**: Update images via `npm run setup`
- [ ] **Before changes**: Push to `main` and monitor GitHub Actions

## Troubleshooting Quick Fixes

| Issue | Fix |
|-------|-----|
| Build fails with Firebase error | Ensure `.env.local` has all `NEXT_PUBLIC_*` vars |
| Login popup doesn't work | Check Firebase auth providers are enabled |
| Admin page shows "Access denied" | Set `{"admin": true}` custom claim in Firebase Auth |
| Users not appearing in `/admin` | Verify Firestore security rules allow reads |
| GitHub Actions fails | Check `FIREBASE_SERVICE_ACCOUNT_KEY` is valid JSON |

---

**Status: READY TO LAUNCH** 🚀

All features implemented and tested. Site is production-ready!
