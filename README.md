
# 🚀 Mandarin Sprint Deployment Guide

If your code is not "syncing" or the GitHub Actions are failing, follow these steps to configure your repository:

## 1. Enable Workflow Permissions (CRITICAL)
GitHub defaults new repositories to "Read-only" for Actions. To fix this:
1.  Go to your GitHub Repository **Settings**.
2.  In the left sidebar, click **Actions** > **General**.
3.  Scroll down to **Workflow permissions**.
4.  Select **"Read and write permissions"**.
5.  Check **"Allow GitHub Actions to create and approve pull requests"**.
6.  Click **Save**.

## 2. Set up GitHub Pages
Once the `Deploy PWA` action runs for the first time:
1.  Go to **Settings** > **Pages**.
2.  Under **Build and deployment**, ensure "Source" is set to **"Deploy from a branch"**.
3.  Select the **`gh-pages`** branch and the **`/(root)`** folder.
4.  Click **Save**.

## 3. Syncing Locally
To push this code to your GitHub repository from your local machine:
```bash
git init
git add .
git commit -m "Initial commit: Mandarin Sprint"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## 4. Download Your APK
After the `Build Android APK` workflow finishes:
1.  Go to the **Actions** tab in GitHub.
2.  Click on the most recent "Build Android APK" run.
3.  Scroll down to **Artifacts** to find the `mandarin-sprint-release-apk` download link.
