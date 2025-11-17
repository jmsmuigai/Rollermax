# Complete Guide: Configuring GitHub Pages for Rollermax Website

Follow these steps to get your website live on GitHub Pages.

## Method 1: Using GitHub Actions (Recommended) ✅

This is the easiest and most automatic method. Your workflow is already set up!

### Step 1: Enable GitHub Pages

1. Go to your repository: **https://github.com/jmsmuigai/Rollermax**
2. Click on **Settings** (in the top menu bar of the repository)
3. Scroll down in the left sidebar and click on **Pages** (under "Code and automation")
4. Under **Build and deployment**, you'll see:
   - **Source**: Select **"GitHub Actions"** from the dropdown
   - Don't select "Deploy from a branch" - use GitHub Actions instead!
5. Click **Save** (if there's a save button)

### Step 2: Enable GitHub Actions (if not already enabled)

1. Still in **Settings**, click on **Actions** → **General** (in the left sidebar)
2. Under **"Actions permissions"**, select:
   - ✅ **"Allow all actions and reusable workflows"**
3. Scroll down and under **"Workflow permissions"**, select:
   - ✅ **"Read and write permissions"**
   - ✅ **"Allow GitHub Actions to create and approve pull requests"**
4. Click **Save**

### Step 3: Trigger the Deployment

Since we've already pushed code, you need to trigger the workflow:

**Option A: Re-run the failed workflow**
1. Go to the **Actions** tab in your repository
2. Click on the most recent workflow run (the one that failed)
3. Click **"Re-run all jobs"** button at the top right
4. Wait for it to complete (usually takes 2-3 minutes)

**Option B: Make a small change to trigger it**
1. Go to any file in your repository
2. Make a small edit (like adding a space)
3. Commit the change
4. This will automatically trigger the deployment

### Step 4: Check Your Live Website

Once the workflow completes successfully (green checkmark ✅):

1. Go back to **Settings** → **Pages**
2. You'll see your live website URL at the top:
   - **Your site is live at: https://jmsmuigai.github.io/Rollermax/**
3. Click the link or wait a few minutes for it to propagate

---

## Method 2: Deploy from Branch (Alternative)

If GitHub Actions doesn't work, you can use this method:

### Step 1: Build Locally

1. Open terminal in your project folder
2. Run these commands:

```bash
cd "/Users/james/Library/CloudStorage/GoogleDrive-jmsmuigai@gmail.com/My Drive/Rollermax"
npm install
npm run build
```

This creates an `out` folder with all the static files.

### Step 2: Create gh-pages Branch

```bash
# Create and switch to gh-pages branch
git checkout --orphan gh-pages

# Remove all files
git rm -rf .

# Copy the built files
cp -r out/* .

# Add and commit
git add .
git commit -m "Deploy to GitHub Pages"

# Push to GitHub
git push origin gh-pages --force
```

### Step 3: Enable Pages from Branch

1. Go to **Settings** → **Pages**
2. Under **Source**, select **"Deploy from a branch"**
3. Select:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
4. Click **Save**

Your site will be live at: **https://jmsmuigai.github.io/Rollermax/**

---

## Troubleshooting

### If the workflow keeps failing:

1. **Check the Actions log**:
   - Go to **Actions** tab
   - Click on the failed workflow
   - Click on the failed job
   - Read the error message

2. **Common issues**:
   - **"Pages build failed"**: Make sure `npm run build` works locally first
   - **"Permission denied"**: Check that Actions permissions are enabled
   - **"Path not found"**: Ensure the `out` folder exists after build

### To test locally first:

```bash
npm install
npm run build
npm run start
# or use a local server:
npx serve out
```

### If you see a 404 after deployment:

- Wait 5-10 minutes for GitHub to process
- Clear your browser cache
- Check that the URL is exactly: `https://jmsmuigai.github.io/Rollermax/`

---

## Quick Checklist

- [ ] Go to Settings → Pages
- [ ] Select "GitHub Actions" as source
- [ ] Go to Settings → Actions → General
- [ ] Enable "Allow all actions and reusable workflows"
- [ ] Enable "Read and write permissions" for workflows
- [ ] Go to Actions tab
- [ ] Re-run the workflow or make a new commit
- [ ] Wait for green checkmark ✅
- [ ] Visit https://jmsmuigai.github.io/Rollermax/

---

## Your Website URL

Once configured, your website will be live at:
**https://jmsmuigai.github.io/Rollermax/**

---

## Need Help?

If you're still having issues:
1. Share a screenshot of the error from the Actions tab
2. Check that all files are committed and pushed to GitHub
3. Verify that `npm run build` works on your local machine

