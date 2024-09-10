import { useState } from 'react';
import { Editor } from '@/app/(apps)/todo/_components/todo_input/Editor';
import { useNewTodo, useTodoCreate } from '@/app/(apps)/todo/_components/todo_input/useTodoCreate';
import { parseTodo } from './parser';
import { Todo } from '@/firebase/Todo';
import { nanoid } from 'nanoid';

const placeHolderText = `dkssud`;

const todoMaker = (title: string): Todo => {
  return {
    id: nanoid(),
    title,
    description: null,
    created_at: Date.now(),
    finished_at: null,
    status: 'PROCESSING',
    is_deleted: false,
  };
};

export const TodoInput = () => {
  const [content, setContent] = useState('');
  const { mutate } = useNewTodo();
  const onSubmit = (lines: string[]) => {
    const todos = lines
      .filter((line) => line.startsWith('# '))
      .map((line) => line.replace(/^#\s*/, ''));
    if (todos.length < 1) {
      return;
    }

    todos.forEach((todo) => {
      mutate({ todo: todoMaker(todo), profileId: 'apple' });
    });
  };

  return (
    <div className={'w-full flex-col p-2'}>
      <Editor
        className={'h-[200px] text-2xl [&_.cm-content]:font-sans'}
        onChange={setContent}
        onCmdEnter={(lines) => {
          onSubmit(lines);
        }}
        placeholder={placeHolderText}
      />
    </div>
  );
};
