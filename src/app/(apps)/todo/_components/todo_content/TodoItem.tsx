import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { useFirebase } from '@/firebase/FirebaseProvider';
import { useUser } from '@/firebase/UserProvider';
import { Todo } from '@/firebase/Todo';

type Props = {
  item: Todo;
};

export const TodoItem = ({ item }: Props) => {
  return (
    <div>
      <p>{item.title}</p>
    </div>
  );
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
