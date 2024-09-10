import { invoke } from '@tauri-apps/api/tauri';
import { type Profile } from '@/firebase/Profile';

export const add_profile = async (profile: Profile) => {
  await invoke('add_profile', { profile_json: JSON.stringify(profile) });
  return true;
};

export const update_profile = async (profile: Profile) => {
  await invoke('update_profile', { profile_json: JSON.stringify(profile) });
  return true;
};

export const get_all_profile = async () => {
  return JSON.parse(await invoke<string>('get_all_profile'));
};
