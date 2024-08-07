import { getAuth, signOut } from 'firebase/auth';
import nookies from 'nookies';

export const signout = async () => {
  const auth = getAuth();

  await signOut(auth);
  nookies.destroy(null, 'auth_token');
  return true;
};
