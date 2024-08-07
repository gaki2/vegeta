import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useFirebase } from '@/firebase/FirebaseProvider';
import { useUser } from '@/firebase/UserProvider';

type Props = {
  id: string;
};

export const TodoItem = ({ id }: Props) => {
  const { title } = useTodoTitle({ id });

  return <div>{title}</div>;
};

export const useTodoTitle = ({ id }: { id: string }) => {
  const [title, setTitle] = useState('');
  const { db } = useFirebase();
  const { user } = useUser();
  useEffect(() => {
    if (db && user?.uid) {
      const titleRef = ref(db, 'todos/' + user?.uid + '/title' + `/${id}`);
      onValue(titleRef, (snapshot) => {
        const data = snapshot.val();
        setTitle(data);
      });
    }
  }, [db, user]);

  return {
    title,
  };
};
