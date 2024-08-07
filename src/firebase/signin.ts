import { signInWithEmailAndPassword as _signin, getAuth } from 'firebase/auth';
import nookies from 'nookies';

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  const auth = getAuth();
  const { user } = await _signin(auth, email, password);
  const token = await user.getIdToken();
  nookies.set(null, 'auth_token', token);

  return user;
};
