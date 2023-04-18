import { Auth, signInWithEmailAndPassword } from 'firebase/auth';

export async function getTestToken(
  auth: Auth,
  logger?: (...msg: any[]) => void
): Promise<string> {
  const log = logger ?? console.log;
  const username = process.env.FIREBASE_TEST_UN;
  const password = process.env.FIREBASE_TEST_PW;

  log(
    `logging in with: '${username}'`,
    `and password: '${password.substring(0, 3)}****'`
  );

  const creds = await signInWithEmailAndPassword(auth, username, password);
  const { user } = creds;
  const token = await user.getIdToken();

  log('token retrieved');

  return token;
}
