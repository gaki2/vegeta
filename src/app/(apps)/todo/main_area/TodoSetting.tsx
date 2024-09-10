import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { ArchiveIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';

export const TodoSetting = () => {
  return (
    <Dropdown placement={'bottom'}>
      <DropdownTrigger>
        <Button
          className={'ml-auto rounded-full'}
          isIconOnly
          disableRipple
          variant={'light'}>
          <DotsHorizontalIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          key={'see later'}
          startContent={<ArchiveIcon />}>
          나중에 할일로 만들기
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
