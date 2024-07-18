import { Button } from '@nextui-org/react';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

type MenuProps = {
  className: string;
  title: ReactNode;
  description?: ReactNode;
  endContent: ReactNode;
};

export const Menu = ({ className, title, description, endContent }: MenuProps) => {
  return (
    <div
      role={'button'}
      className={clsx(
        'flex h-16 w-full cursor-pointer items-center rounded-xl bg-transparent p-4 text-medium text-black',
        className
      )}>
      <div className={'flex flex-col justify-center gap-1'}>
        <p>{title}</p>
        {description && <p>{description}</p>}
      </div>
      {endContent}
    </div>
  );
};
