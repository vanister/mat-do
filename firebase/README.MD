# Mat Do Firebase backend

## Setup

Run `npm run restore` to restore the project dependencies.

### Firebase

Add a `.firebaserc` file to the project root (`./firebase`) and add your project id there.
```
{
  "projects": {
    "default": "project-idfrom-firebase-console"
  }
}
```

Add a `firestore.rules` file. You can get it from the firebase console.

The default is to use the emulator so you will need to install that by running:
- `npx firebase init`
- The emulated services are:
  - Cloud Firestore
  - Authentication
  - Cloud Functions

// TODO - set up eslint...again.

### Running/Debugging

- Run the project from the root (`/firebase`) level folder.
  - `npm run start` will start the emulators for the project.
  - `npm run start-debug` will start the emulator with the debugger port set to `9229`.
    - Attach the debugger with the `Attach to functions` VS Code launch settings.

### Testing

Use the [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) extension to run/debug the tests in VS Code.