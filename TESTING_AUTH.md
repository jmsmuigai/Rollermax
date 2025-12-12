# Quick Testing Guide for Authentication Enhancements

## Pre-Deployment Checklist

✅ **Build Status**: Production build compiles successfully
✅ **TypeScript**: No type errors
✅ **File Changes**: LoginPopup.tsx enhanced with all requested features
✅ **Git Status**: Changes committed and pushed to main

## Live Testing (After Deployment)

Visit: https://rollermax-courier.web.app

### Test 1: Password Visibility Toggle
1. Open the login modal (click Login)
2. Enter a password in the password field
3. Click the eye icon on the right side of the password field
4. Verify: Password text becomes visible
5. Click again to hide

### Test 2: Sign Up Flow
1. Enter a new test email (e.g., test@example.com)
2. Enter a password
3. Click "Register"
4. Verify: "Registration successful" message appears
5. Verify: Account created in Firebase Auth
6. Verify: User profile in Firestore with provider="password"

### Test 3: Sign In Flow
1. Enter the email and password from Test 2
2. Click "Sign In"
3. Verify: User is authenticated
4. Verify: Session persists after page reload

### Test 4: Password Reset
1. Enter an email address
2. Click "Forgot password?" link
3. Verify: "Password reset email sent" message
4. Check email inbox for Firebase password reset email
5. Click link in email
6. Create new password
7. Sign in with new password

### Test 5: Google Sign-In
1. Click "Sign in with Google"
2. Authenticate with your Google account
3. Verify: User profile created/updated in Firestore with provider="google"
4. Verify: User is signed in

### Test 6: Sign Out
1. In the login modal, scroll down to bottom
2. Click "Sign out" button
3. Verify: "Signed out" message appears
4. Verify: User session cleared (can sign in again)

### Test 7: reCAPTCHA (if configured)
1. If NEXT_PUBLIC_RECAPTCHA_SITE_KEY is set:
   - Verify reCAPTCHA checkbox appears in modal
   - Try to register without checking it
   - Verify: Error "Please complete the captcha"
   - Check the box
   - Register successfully

### Test 8: Error Handling
1. Try sign up with weak password
2. Verify: Clear error message displayed in modal (not alert box)
3. Try sign in with wrong email
4. Verify: Clear error message displayed

### Test 9: Admin Page (if admin claim set)
1. Navigate to /admin
2. If user has admin=true custom claim:
   - Verify list of all registered users displays
   - See usernames, emails, providers, creation dates
3. If not admin: Should see "Not authorized" or empty state

## Performance Metrics

- First Load JS: 131 kB (main page)
- Admin Page First Load JS: 191 kB
- All static pages: 100% prerendered ✅
- No server-side rendering needed ✅

## Firebase Configuration to Verify

1. **Authentication Methods Enabled**:
   - Email/Password ✅
   - Google ✅

2. **Firestore Collections**:
   - `users` collection exists ✅
   - Documents have: uid, email, name, provider, createdAt, updatedAt

3. **Firebase Function**:
   - `listUsers` deployed ✅
   - Requires ID token with admin claim ✅

## Optional reCAPTCHA Setup

To enable reCAPTCHA v2:

1. Go to: https://www.google.com/recaptcha/admin
2. Create new site:
   - Name: "Rollermax Courier"
   - Type: reCAPTCHA v2 (Checkbox)
   - Domains: rollermax-courier.web.app, localhost
3. Copy Site Key and Secret Key
4. Update `.env.local`:
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_key_here
   RECAPTCHA_SECRET_KEY=your_secret_here
   ```
5. Commit and push to trigger redeployment

## Deployment Progress

- ✅ Local export successful
- ⏳ GitHub Actions deploying (watch https://github.com/jmsmuigai/Rollermax/actions)
- ⏳ Firebase Hosting updating
- ⏳ Cloud Functions updating

## Known Limitations

- reCAPTCHA is optional (gracefully skips if not configured)
- Password reset emails sent via Firebase (check spam folder if not received)
- Admin listing requires Firebase custom claim to be manually set
- No built-in rate limiting (can add Cloud Function middleware if needed)

## Troubleshooting

**"Please complete the captcha" appears but no checkbox visible**
- reCAPTCHA script may not have loaded
- Check browser console for errors
- Verify NEXT_PUBLIC_RECAPTCHA_SITE_KEY is correct

**Password reset email not received**
- Check spam/promotions folder
- Verify email address is correct
- Firebase might have rate-limiting if testing repeatedly

**Admin page shows "Not authorized"**
- User must have custom claim `admin: true` set in Firebase Auth
- Only project admins can set this in Firebase Console
- Contact project admin if you need access

**Google Sign-In not working**
- Clear browser cache and cookies
- Verify Google OAuth app configured in Firebase Console
- Check that localhost or domain is in approved list

---

**Site Live At**: https://rollermax-courier.web.app  
**Last Updated**: 2025-12-12  
**Auth Features**: Show Password ✅ | Reset ✅ | reCAPTCHA ✅ | Sign Out ✅
