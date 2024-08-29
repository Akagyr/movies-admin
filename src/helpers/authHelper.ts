import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../database/firebase';

export async function signIn({ email, password }: { email: string; password: string }) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { uid } = userCredential.user;
    sessionStorage.setItem('loginAccess', uid);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}