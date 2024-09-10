import { useUser } from '@/firebase/UserProvider';
import { useFirebase } from '@/firebase/FirebaseProvider';
import { set, ref, getDatabase, update } from 'firebase/database';
import { nanoid } from 'nanoid';
import { Progress, Todo } from '@/firebase/Todo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { add_todo, get_todo } from '@/gateway/todo_gateway';

export const useTodoCreate = () => {
  const { user } = useUser();
  const { db } = useFirebase();

  const createTodo = (text: string) => {
    const id = nanoid();
    const title = text;
    const userId = user?.uid;
    const timestamp = Date.now();
    const status: Progress = 'processing';

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

export const useTodoList = () => {
  return useQuery({
    queryKey: ['getTodoList'],
    queryFn: get_todo,
  });
};

export const useNewTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: add_todo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTodoList'] });
    },
  });
};
