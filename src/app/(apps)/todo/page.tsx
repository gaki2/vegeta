'use client';

import { useEffect, useState } from 'react';
import { TodoLeftPanel } from '@/app/(apps)/todo/_components/TodoLeftPanel';
import { TodoContent } from '@/app/(apps)/todo/_components/todo_content/TodoContent';
import { Spinner } from '@nextui-org/react';

export default function TodoPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 로컬스토리지 값으로 UI 를 만들때 발생하는 LayoutShift 를 막기 위해서 추가함.
    setIsLoading(false);
  }, []);

  return (
    <div className='flex h-full w-full flex-row'>
      {isLoading && <Spinner className={'ml-auto mr-auto'} />}
      {!isLoading && (
        <>
          <TodoLeftPanel />
          <TodoContent />
        </>
      )}
    </div>
  );
}
