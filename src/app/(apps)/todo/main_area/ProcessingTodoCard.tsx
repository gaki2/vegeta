import { Todo } from '@/firebase/Todo';
import { Button } from '@nextui-org/react';
import { CheckCircledIcon, DotsHorizontalIcon, StarIcon } from '@radix-ui/react-icons';
import { getRelativeDate } from '@/utils/date';
import { TodoSetting } from '@/app/(apps)/todo/main_area/TodoSetting';
import { useState } from 'react';

type Props = {
  todo: Todo;
};

export const ProcessingTodoCard = ({ todo }: Props) => {
  const [show, setShow] = useState(false);

  const onPointerEnter = () => {
    setShow(true);
  };

  const onPointerLeave = () => {
    setShow(false);
  };

  return (
    <div
      className={'relative flex h-[180px] w-full flex-col overflow-hidden rounded-xl bg-amber-200'}>
      <div className={'flex items-center'}>
        <Button
          isIconOnly
          disableRipple
          color={'default'}
          className={'rounded-full text-yellow-700'}
          variant={'light'}>
          <StarIcon />
        </Button>
        <span className={'text-sm text-gray-800'}>{getRelativeDate(todo.created_at)}</span>
        <TodoSetting />
      </div>
      <div
        className={'flex h-full flex-col'}
        onPointerEnter={onPointerEnter}>
        <p className={'pen-script px-3 text-2xl'}>{todo.title}</p>
        <div className={'flex h-full'}>
          <Button
            className={'ml-auto mt-auto'}
            size={'lg'}
            isIconOnly
            variant={'light'}
            color={'success'}>
            <CheckCircledIcon className={'h-[20px] w-[20px]'} />
          </Button>
        </div>
      </div>
    </div>
  );
};
