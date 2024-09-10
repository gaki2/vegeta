import { useTodoList } from '@/app/(apps)/todo/_components/todo_input/useTodoCreate';
import React, { useEffect, useState } from 'react';
import { Progress, Todo } from '@/firebase/Todo';
import { TodoInput } from '@/app/(apps)/todo/_components/todo_input/TodoInput';
import { ProcessingTodoList } from '@/app/(apps)/todo/main_area/ProcessingTodoList';

type TodoItems = {
  [key in Progress]: Todo[];
};

export const TodoMainArea = () => {
  const { data, status } = useTodoList();
  const [todoItems, setTodoItems] = useState<TodoItems>({
    IDLE: [],
    PROCESSING: [],
    FINISHED: [],
  });
  const [nowDroppableId, setNowDroppableId] = useState<Progress>();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (status === 'success' && data) {
      setTodoItems((prev) => ({
        ...prev,
        PROCESSING: Object.values(data.todos),
      }));
    }
  }, [data, status]);

  if (!data) {
    return <></>;
  }

  return (
    <div className={'m-2 flex w-full flex-col gap-3 rounded-2xl bg-gray-200 p-4'}>
      <div className={'w-full rounded-2xl bg-white'}>
        <TodoInput />
      </div>
      <ProcessingTodoList todoList={todoItems.PROCESSING} />
    </div>
  );
};
