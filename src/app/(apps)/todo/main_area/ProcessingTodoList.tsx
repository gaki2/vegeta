import { Todo } from '@/firebase/Todo';
import { ProcessingTodoCard } from '@/app/(apps)/todo/main_area/ProcessingTodoCard';
import { ScrollShadow } from '@nextui-org/react';

type Props = {
  todoList: Todo[];
};

export const ProcessingTodoList = ({ todoList }: Props) => {
  return (
    <>
      <div className={''}>
        <p
          className={'noto-sans text-3xl'}
          aria-label={'등고자비'}>
          君子報仇 十年不晩
        </p>
      </div>
      <ScrollShadow
        className={
          'scroll-none grid w-full grid-cols-4 gap-2 overflow-scroll rounded-2xl bg-white p-2'
        }>
        {todoList.map((todo) => (
          <ProcessingTodoCard
            todo={todo}
            key={todo.id}
          />
        ))}
      </ScrollShadow>
    </>
  );
};
