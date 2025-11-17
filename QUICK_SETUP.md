# Quick GitHub Pages Setup Guide

## Step 1: Access GitHub Pages Settings

**Use this EXACT URL:**
```
https://github.com/jmsmuigai/Rollermax/settings/pages
```

Or follow these steps:
1. Go to: https://github.com/jmsmuigai/Rollermax
2. Click the **"Settings"** tab (top menu bar, far right)
3. In the left sidebar, scroll down and click **"Pages"** (under "Code and automation" section)

## Step 2: Enable GitHub Actions (Required First!)

**Before setting up Pages, you MUST enable Actions:**

**Go to this URL:**
```
https://github.com/jmsmuigai/Rollermax/settings/actions
```

**Then:**
1. Under **"Actions permissions"**, select:
   - ✅ **"Allow all actions and reusable workflows"**
2. Scroll down to **"Workflow permissions"**:
   - ✅ Select **"Read and write permissions"**
   - ✅ Check **"Allow GitHub Actions to create and approve pull requests"**
3. Click **"Save"** at the bottom

## Step 3: Now Go to Pages Settings

**After enabling Actions, go to:**
```
https://github.com/jmsmuigai/Rollermax/settings/pages
```

You should now see options for "Build and deployment". If you still don't see it:
- Make sure you're the repository owner
- Wait a few seconds for the page to load
- Refresh the page

## Step 4: Configure Pages Source

Once you're on the Pages settings page:
1. Under **"Build and deployment"**, you'll see **"Source"**
2. Click the dropdown next to "Source"
3. Select **"GitHub Actions"** from the dropdown
4. If "GitHub Actions" is not visible, make sure Step 2 is completed first!

## Step 5: Trigger Deployment

**Go to Actions:**
```
https://github.com/jmsmuigai/Rollermax/actions
```

**Then:**
1. Click on **"Deploy to GitHub Pages"** workflow (left sidebar)
2. Click the **"Run workflow"** button (top right)
3. Select **"main"** branch
4. Click **"Run workflow"** green button
5. Wait 2-3 minutes for it to complete

## Step 6: Check Your Live Site

After the workflow completes successfully (green checkmark ✅):
1. Go back to: https://github.com/jmsmuigai/Rollermax/settings/pages
2. You'll see your site URL at the top: **https://jmsmuigai.github.io/Rollermax/**
3. Click the link to view your live website!

---

## Troubleshooting

### If you can't see "Pages" in Settings:
- Make sure you're logged in as the repository owner (jmsmuigai)
- Check that the repository is not private (Settings → General → scroll to "Danger Zone")
- Try using a different browser

### If "GitHub Actions" option is missing:
- Complete Step 2 first (enable Actions)
- Refresh the Pages settings page
- Try a hard refresh (Ctrl+F5 or Cmd+Shift+R)

### If the workflow fails:
1. Go to Actions tab
2. Click on the failed workflow
3. Click on the failed job (red X)
4. Read the error message at the bottom

---

## Direct Links Summary

✅ **Enable Actions**: https://github.com/jmsmuigai/Rollermax/settings/actions
✅ **Pages Settings**: https://github.com/jmsmuigai/Rollermax/settings/pages
✅ **View Actions**: https://github.com/jmsmuigai/Rollermax/actions
✅ **Your Live Site**: https://jmsmuigai.github.io/Rollermax/ (after setup)

