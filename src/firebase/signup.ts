import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import nookies from 'nookies';

export const signupWithEmailAndPassword = async (email: string, password: string) => {
  const auth = getAuth();

  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const token = await user.getIdToken();
  nookies.set(null, 'auth_token', token);

  return user;
};
