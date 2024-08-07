import { useUser } from '@/firebase/UserProvider';
import { useFirebase } from '@/firebase/FirebaseProvider';
import { set, ref, getDatabase, update } from 'firebase/database';
import { nanoid } from 'nanoid';
import { Status, Todo } from '@/firebase/Todo';

export const useTodoCreate = () => {
  const { user } = useUser();
  const { db } = useFirebase();

  const createTodo = (text: string) => {
    const id = nanoid();
    const title = text;
    const userId = user?.uid;
    const timestamp = Date.now();
    const status: Status = 'processing';

    if (!userId) {
      return Promise.reject('userId is none!');
    }

    const todo: Todo = {
      title,
      detail: null,
      createdAt: timestamp,
      finishedAt: null,
      status,
      isDeleted: false,
    };

    const promises = Object.entries(todo).map(([key, value]) =>
      set(ref(db, 'todos/' + userId + `/${key}` + `/${id}`), value)
    );
    return Promise.all(promises);
  };

  return {
    createTodo,
  };
};
