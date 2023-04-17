# Local Testing App (DO NOT PUBLISH OR REFERENCE)

Use this app to get a test token from the firebase emulator.

- Create a `.env` file with the following values in the `testapp` root project folder.
  - Set your firebase config values
    - `FIREBASE_API_KEY="AIza..." `
    - `FIREBASE_AUTH_DOMAIN="<your-project-id>.firebaseapp.com" `
    - `FIREBASE_PROJECT_ID="<your-project-id>" `
    - `FIREBASE_STORAGE_BUCKET="<your-project-id>.appspot.com" `
    - `FIREBASE_MESSAGING_SENDER_ID="<your-sender-id>" `
    - `FIREBASE_APP_ID="<your-app-id>"`
  - Create a user in the auth emulator and set the username and password in the following env:
    - `FIREBASE_TEST_UN='some@user.com' `
    - `FIREBASE_TEST_PW='some-stronge-pw-:-)'`
- Run: `npm start` from this app to get a token with the values set in the `.env` file.