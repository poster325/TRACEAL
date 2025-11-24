# Firebase Setup Guide for TRACEAL

This guide will help you set up Firebase Realtime Database for cross-device synchronization between your PC and iPhone.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `TRACEAL` (or any name you prefer)
4. Disable Google Analytics (optional, not needed for this project)
5. Click "Create project"

## Step 2: Set up Realtime Database

1. In your Firebase project, click "Realtime Database" in the left sidebar
2. Click "Create Database"
3. Choose location: **United States** (or closest to you)
4. Start in **Test mode** (for development)
5. Click "Enable"

## Step 3: Configure Security Rules

1. In Realtime Database, click the "Rules" tab
2. Replace the rules with:

```json
{
  "rules": {
    "demo": {
      ".read": true,
      ".write": true
    }
  }
}
```

3. Click "Publish"

## Step 4: Get Your Firebase Configuration

1. In Firebase Console, click the gear icon (⚙️) next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the Web icon (`</>`) to add a web app
5. Enter app nickname: `TRACEAL Console`
6. Click "Register app"
7. Copy the `firebaseConfig` object

## Step 5: Update firebase-config.js

1. Open `firebase-config.js` in your code editor
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};
```

3. Save the file

## Step 6: Deploy and Test

1. Commit and push your changes:
```bash
git add .
git commit -m "Configure Firebase credentials"
git push origin main
```

2. Wait for GitHub Pages to deploy (1-2 minutes)

3. Test cross-device sync:
   - Open https://poster325.github.io/TRACEAL/ on your PC
   - Login as **demo** (demo/demo)
   - Open the same URL on your iPhone
   - Login as **trigger** (tri/tri)
   - Click "Observer Log" button on iPhone
   - Watch your PC auto-refresh with the new tamper event! 🎉

## Troubleshooting

- **"Permission denied" error**: Check your Realtime Database rules (Step 3)
- **No sync happening**: Open browser console (F12) and check for Firebase connection errors
- **Slow sync**: Firebase free tier has some latency, but should be under 1-2 seconds

## Security Note

⚠️ The current rules allow public read/write to the `demo` path. For production use, you should implement proper authentication and security rules. For a demo/presentation, test mode is fine.

