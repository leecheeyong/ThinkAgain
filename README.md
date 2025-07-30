<img src="/public/logo.png" width="150">

# ThinkAgain

Challenge your perspective and grow your mind. This is an app that helps you reflect on your beliefs, receive thoughtful AI-powered challenges, and track your cognitive growth over time, it's made possible with the [HackClub AI](https://ai.hackclub.com)

## Features
- **AI-Powered Challenges:** Submit your thoughts, beliefs, or opinions and get respectful, playful, or philosophical challenges from AI.
- **Streak Tracking:** Build daily reflection habits and see your progress.
- **Personal History:** Review your journey and explore past challenges.
- **Dark/Light Theme:** Beautiful, responsive design for all devices.

<details>
  <summary>
<h2>Screenshots</h2>
  </summary>
 <img width="1358" height="631" alt="image" src="https://github.com/user-attachments/assets/58c6580f-cc9c-45bb-b5d3-85b4128fb0f4" />
<img width="1359" height="631" alt="image" src="https://github.com/user-attachments/assets/fd6a21de-628c-4e7f-9d62-2c525a4938bc" />
<img width="1365" height="629" alt="image" src="https://github.com/user-attachments/assets/6acd9fe1-5a25-4b26-af24-1d0726d8fa3e" />
</details>

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
