# Deployment Guide - Rollermax Website

## GitHub Pages Deployment

Your website is now ready to be deployed to GitHub Pages! Follow these steps:

### Step 1: Enable GitHub Pages

1. Go to your GitHub repository: https://github.com/jmsmuigai/Rollermax
2. Click on **Settings** in the repository menu
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **GitHub Actions** (recommended) - This will automatically deploy using the workflow file

### Step 2: Enable GitHub Actions (if needed)

1. In the same Settings page, click on **Actions** → **General**
2. Under **Actions permissions**, select "Allow all actions and reusable workflows"
3. Save the changes

### Step 3: Trigger Deployment

The GitHub Actions workflow will automatically run when you push to the `main` branch. Since we've already pushed, you can:

1. Go to the **Actions** tab in your repository
2. You should see the workflow running or completed
3. Once complete, go back to **Settings** → **Pages**
4. Your site will be available at: `https://jmsmuigai.github.io/Rollermax/`

### Alternative: Manual Deployment

If you prefer to deploy manually:

1. Install dependencies:
```bash
npm install
```

2. Build the site:
```bash
npm run build
```

3. The static files will be in the `out` folder

4. Push the `out` folder to a `gh-pages` branch:
```bash
git subtree push --prefix out origin gh-pages
```

5. In GitHub Settings → Pages, select `gh-pages` branch and `/ (root)` folder

## Live Website URL

Once deployed, your website will be available at:
**https://jmsmuigai.github.io/Rollermax/**

## Custom Domain (Optional)

If you want to use a custom domain:

1. In GitHub Settings → Pages, add your custom domain
2. Update DNS records as instructed by GitHub
3. The site will be available at your custom domain

## Local Development

To run the website locally:

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## Features Deployed

✅ Modern, responsive design
✅ AI-powered tracking page
✅ Contact form
✅ Services showcase
✅ About us with Vision & Mission
✅ Islamic/Somali theme elements
✅ Beautiful animations and interactions
✅ Mobile-friendly navigation

## Support

For any issues with deployment, check:
- GitHub Actions logs in the Actions tab
- GitHub Pages build logs in Settings → Pages
- Next.js documentation: https://nextjs.org/docs

