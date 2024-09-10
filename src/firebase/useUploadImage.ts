import { useFirebase } from '@/firebase/FirebaseProvider';
import { uploadBytes, ref, getDownloadURL } from '@firebase/storage';
import { useMutation } from '@tanstack/react-query';
import { nanoid } from 'nanoid';

type UploadImageCategory = 'user_profile_img';

export const useUploadImage = (type: UploadImageCategory) => {
  const { storage } = useFirebase();
  const uploadImage = async (file: File) => {
    // 파일 이름이 같은 경우 덮어쓰기 방지를 위해 nanoid 를 붙여준다.
    const storageRef = ref(storage, `${type}/${file.name} + ${nanoid(4)}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  return useMutation({ mutationFn: uploadImage });
};
