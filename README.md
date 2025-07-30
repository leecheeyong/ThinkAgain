<img src="/public/logo.png" width="150">

# ThinkAgain

Challenge your perspective and grow your mind. ThinkAgain is a web app that helps you reflect on your beliefs, receive thoughtful AI-powered challenges, and track your cognitive growth over time.

## Features
- **AI-Powered Challenges:** Submit your thoughts, beliefs, or opinions and get respectful, playful, or philosophical challenges from AI.
- **Streak Tracking:** Build daily reflection habits and see your progress.
- **Personal History:** Review your journey and explore past challenges.
- **Dark/Light Theme:** Beautiful, responsive design for all devices.

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/leecheeyong/ThinkAgain.git
   cd ThinkAgain
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure Firebase:**
   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Enable **Authentication** (Email/Password).
   - Set up **Cloud Firestore** in test mode (or with secured rules).
   - Edit the `src/firebase.js` file, replace with your Firebase credentials

## License

ThinkAgain is available as open source under the terms of the [MIT License](https://github.com/leecheeyong/ThinkAgain/blob/main/LICENSE).
