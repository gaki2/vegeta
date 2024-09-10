import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { Profile } from '@/app/(apps)/todo/_components/todo_left_panel/Profile';
import { ChangeEventHandler, useState } from 'react';
import { Color, PALLET } from '@/app/(apps)/todo/_components/todo_left_panel/Color';
import { TrashIcon, UploadIcon } from '@radix-ui/react-icons';
import { useUploadImage } from '@/firebase/useUploadImage';
import { useBoolean } from 'usehooks-ts';

type ModalProps = {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

export const NewProfileModal = ({ isOpen, onOpenChange }: ModalProps) => {
  const [isColorToolsOpen, setIsColorToolsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [profileColor, setProfileColor] = useState<string>(
    PALLET[Math.floor(Math.random() * PALLET.length)]
  );
  const { mutate: uploadImage } = useUploadImage('user_profile_img');
  const { value: isUploading, setValue: setIsUploading } = useBoolean(false);
  const [profileImgUrl, setProfileImgUrl] = useState<string>('');

  const onClickColor = (color: string) => {
    setIsColorToolsOpen(false);
    setProfileColor(color);
  };

  const onUploadImg: ChangeEventHandler<HTMLInputElement> = async (e) => {
    /**
     * @TODO 예외 상황일때 toast message 띄우기
     */
    const file = e.target.files![0];
    // 파일이 없다면 return
    if (!file) {
      return;
    }

    // image 타입 파일이 아니라면 return (tauri 에서 accept = "image/*" 로 설정했지만 작동하지 않음)
    if (!file.type.includes('image')) {
      return;
    }

    setIsUploading(true);
    setIsColorToolsOpen(false);
    // file 을 캔버스에 그린다음 url 로 바꾸기
    uploadImage(file, {
      onSuccess: (url) => {
        setProfileImgUrl(url);
      },
      onSettled: () => {
        setIsUploading(false);
      },
    });
  };

  const onDeleteImg = () => {
    setProfileImgUrl('');
    setIsColorToolsOpen(false);
  };

  return (
    <div>
      <Modal
        size={'xl'}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>프로필 추가하기</ModalHeader>
              <ModalBody>
                <div className={'flex flex-row items-center gap-3'}>
                  <Popover
                    isOpen={isColorToolsOpen}
                    onOpenChange={setIsColorToolsOpen}
                    placement={'bottom'}
                    showArrow={true}>
                    <PopoverTrigger>
                      <Avatar
                        classNames={{
                          base: isUploading ? 'animate-pulse' : '',
                          name: isUploading ? 'hidden' : '',
                          icon: isUploading ? 'hidden' : '',
                        }}
                        src={profileImgUrl}
                        size={'lg'}
                        className={'shrink-0 cursor-pointer text-white'}
                        style={{ backgroundColor: profileColor ?? 'gray' }}
                        name={name}
                      />
                    </PopoverTrigger>
                    <PopoverContent className={'flex flex-row gap-1.5 p-4'}>
                      {PALLET.map((color) => (
                        <Color
                          key={color}
                          color={color}
                          onColorChange={onClickColor}
                        />
                      ))}
                      <label
                        htmlFor='file-upload'
                        className='ml-1 flex h-5 w-5 cursor-pointer items-center rounded-full'>
                        <UploadIcon />
                      </label>
                      <input
                        type='file'
                        id='file-upload'
                        hidden={true}
                        accept='image/*'
                        onChange={onUploadImg}
                      />
                      {profileImgUrl && (
                        <button onClick={onDeleteImg}>
                          <TrashIcon className={'h-4 w-4 text-red-500'} />
                        </button>
                      )}
                    </PopoverContent>
                  </Popover>
                  <Input
                    value={name}
                    onValueChange={setName}
                    variant={'flat'}
                    maxLength={20}
                    label='이름'
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='light'
                  onPress={onClose}>
                  돌아가기
                </Button>
                <Button
                  color='primary'
                  onPress={onClose}>
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
