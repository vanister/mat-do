import { Auth, signInWithEmailAndPassword } from 'firebase/auth';
import { log } from './util';

export async function getTestToken(
  auth: Auth,
  username: string = process.env.FIREBASE_TEST_UN,
  password: string = process.env.FIREBASE_TEST_PW
): Promise<string> {
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
