import { updateProfile as _updateProfile, User } from 'firebase/auth';

export const updateProfile = async (
  user: User,
  profile: { displayName?: string | null; photoURL?: string | null }
) => {
  return await _updateProfile(user, {
    displayName: profile.displayName,
    photoURL: profile.photoURL,
  });
};
