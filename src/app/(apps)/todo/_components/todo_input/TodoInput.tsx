import { Button } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { Editor } from '@/app/(apps)/todo/_components/todo_input/Editor';
import { GearIcon } from '@radix-ui/react-icons';
import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { useTodoCreate } from '@/app/(apps)/todo/_components/todo_input/useTodoCreate';

const placeHolderText = `할일을 등록해주세요`;

export const TodoInput = () => {
  const [content, setContent] = useState('');
  const { createTodo } = useTodoCreate();
  const onClickSubmit = () => {
    const lines = content.split('\n');
    // console.log(lines);
    createTodo('포모도로하기');
  };

  return (
    <div className={'w-full flex-col rounded-lg bg-yellow-100'}>
      <Editor
        onChange={setContent}
        onCmdEnter={(lines) => {
          console.log(lines);
        }}
        placeholder={placeHolderText}
      />
      <div className={'flex border-t-1 border-yellow-300 py-2'}>
        <Button
          className={'ml-1 bg-yellow-300'}
          onClick={onClickSubmit}
          color={'default'}>
          추가하기
        </Button>
        <Button
          // size={'sm'}
          className={'ml-auto mr-1'}
          variant={'light'}
          isIconOnly>
          <GearIcon />
        </Button>
      </div>
    </div>
  );
};
