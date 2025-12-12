# Firebase Setup & GitHub Secrets Configuration

Your Firebase project has been created successfully. Here's how to finalize the setup for automated deployment.

## 📋 Firebase Project Info

```
Project ID: rollermax-courier
Project Number: 118658155068
```

## 🔐 Step 1: Generate Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project `rollermax-courier`
3. Click ⚙️ **Project Settings** (top left corner)
4. Go to the **Service Accounts** tab
5. Click **Generate a New Private Key** button
6. A JSON file will download — **keep this secure and do not commit it to Git**

The JSON file will look like:
```json
{
  "type": "service_account",
  "project_id": "rollermax-courier",
  "private_key_id": "...",
  "private_key": "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----",
  "client_email": "firebase-adminsdk-xxx@rollermax-courier.iam.gserviceaccount.com",
  ...
}
```

## 🔑 Step 2: Add GitHub Secret

1. Go to your GitHub repository: https://github.com/jmsmuigai/Rollermax
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `FIREBASE_SERVICE_ACCOUNT_KEY`
5. Value: Paste the **entire JSON content** from Step 1
6. Click **Add secret**

## ✅ Step 3: Verify Setup

1. Push a test commit to trigger the workflow:
   ```bash
   git add .
   git commit -m "chore: update Firebase workflow with project ID"
   git push origin main
   ```

2. Go to your GitHub repo → **Actions** tab
3. Watch the "Deploy to Firebase Hosting" workflow run
4. On success, your site will be live at: **https://rollermax-courier.web.app**

## 🚀 Deploy Status Indicators

| Icon | Meaning |
|------|---------|
| ✅ | Deployment successful — live on Firebase |
| ❌ | Build or deploy failed — check logs |
| ⏳ | Deployment in progress |

## 📊 Monitor Your Live Site

1. **Firebase Console** → Your project → **Hosting**
   - View deployment history
   - Check performance metrics
   - Manage custom domains

2. **Google Analytics** (if enabled)
   - Real-time visitor stats
   - Traffic sources, user behavior

## 🌐 Custom Domain Setup (Optional)

To use your own domain (e.g., `rollermax.co.ke`):

1. Firebase Console → **Hosting** → **Connect domain**
2. Enter your domain and follow DNS steps
3. Allow 24-48 hours for DNS propagation

## 🐛 Troubleshooting

### Secret not recognized?
- Verify the secret name is exactly: `FIREBASE_SERVICE_ACCOUNT_KEY`
- Check the JSON is valid (use https://jsonlint.com if unsure)
- Regenerate the key if issues persist

### Deployment still fails?
1. Check workflow logs: GitHub repo → **Actions** → Last run → Click job
2. Look for "Error: ..." messages
3. Common issues:
   - Invalid service account JSON
   - Missing or typo'd secret name
   - Node/build version mismatch

### Site shows old content?
- Firebase caches aggressively
- Clear browser cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)
- Or wait 5 minutes for cache invalidation

## 📞 Next Steps

After successful deployment:
- ✅ Set up email notifications (Firebase Cloud Functions)
- ✅ Add real tracking with Firestore database
- ✅ Implement user authentication with Firebase Auth
- ✅ Add Google Analytics events

---

**Deployment workflow is live and ready!** Any push to `main` will automatically build and deploy to Firebase. 🎉
