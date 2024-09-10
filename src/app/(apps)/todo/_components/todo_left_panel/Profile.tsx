import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { NewProfileModal } from '@/app/(apps)/todo/_components/todo_left_panel/NewProfileModal';
import { useBoolean } from 'usehooks-ts';

export const Profile = () => {
  const { value: isNewProfileModalOpen, setValue: setNewProfileModalOpen } = useBoolean(false);
  return (
    <div className={'flex h-fit w-full items-center justify-center pt-1'}>
      <Avatar
        name={'gak'}
        color={'success'}
      />
      <span className={'noto-sans ml-2 text-medium font-normal'}>{'병각'}</span>
      <Dropdown>
        <DropdownTrigger
          role={'button'}
          as={'button'}>
          <svg
            aria-hidden='true'
            focusable='false'
            role='img'
            className='octicon octicon-arrow-switch ml-auto cursor-pointer text-gray-700'
            viewBox='0 0 16 16'
            width='16'
            height='16'
            fill='currentColor'>
            <path d='M5.22 14.78a.75.75 0 0 0 1.06-1.06L4.56 12h8.69a.75.75 0 0 0 0-1.5H4.56l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3a.75.75 0 0 0 0 1.06l3 3Zm5.56-6.5a.75.75 0 1 1-1.06-1.06l1.72-1.72H2.75a.75.75 0 0 1 0-1.5h8.69L9.72 2.28a.75.75 0 0 1 1.06-1.06l3 3a.75.75 0 0 1 0 1.06l-3 3Z'></path>
          </svg>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onClick={() => setNewProfileModalOpen(true)}>새 프로필 추가</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <NewProfileModal
        isOpen={isNewProfileModalOpen}
        onOpenChange={setNewProfileModalOpen}
      />
    </div>
  );
};
