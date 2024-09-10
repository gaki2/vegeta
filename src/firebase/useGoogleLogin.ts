import { useFirebase } from '@/firebase/FirebaseProvider';
import { signInWithCredential, signInWithRedirect } from '@firebase/auth';
import { open } from '@tauri-apps/api/shell';
import { listen } from '@tauri-apps/api/event';
import callbackTemplate from '@/firebase/callback.template';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { invoke } from '@tauri-apps/api';

export const useGoogleLogin = () => {
  const { auth, googleProvider } = useFirebase();

  const login = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };

  return { login };
};

const client_id = '11573774412-4am9bbqub77t52mtcjuk8t8gg51i0rvi.apps.googleusercontent.com';

const openBrowserToConsent = (port: string) => {
  // Replace CLIEN_ID_FROM_FIREBASE
  // Must allow localhost as redirect_uri for CLIENT_ID on GCP: https://console.cloud.google.com/apis/credentials
  return open(
    'https://accounts.google.com/o/oauth2/auth?' +
      'response_type=token&' +
      `client_id=${client_id}&` +
      `redirect_uri=http%3A//localhost:${port}&` +
      'scope=email%20profile%20openid&' +
      'prompt=consent'
  );
};

export const openGoogleLogin = (port: string) => {
  return new Promise((resolve, reject) => {
    openBrowserToConsent(port).then(resolve).catch(reject);
  });
};

export const googleSignIn = (payload: string) => {
  const url = new URL(payload);
  // Get `access_token` from redirect_uri param
  const access_token = new URLSearchParams(url.hash.substring(1)).get('access_token');

  if (!access_token) return;

  const auth = getAuth();

  const credential = GoogleAuthProvider.credential(null, access_token);

  signInWithCredential(auth, credential).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  });
};

export const login = () => {
  // Wait for callback from tauri oauth plugin
  listen('oauth://url', (data) => {
    console.log(data);
    googleSignIn(data.payload as string);
  });

  // Start tauri oauth plugin. When receive first request
  // When it starts, will return the server port
  // it will kill the server
  invoke('plugin:oauth|start', {
    config: {
      // Optional config, but use here to more friendly callback page
      response: callbackTemplate,
    },
  }).then((port: string) => {
    console.log(port);
    openGoogleLogin('3000');
  });
};
