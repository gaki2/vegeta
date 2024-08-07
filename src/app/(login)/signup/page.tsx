'use client';

import { Button, Input } from '@nextui-org/react';
import { AvatarIcon, EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signupWithEmailAndPassword } from '@/firebase/signup';
import { updateProfile } from '@/firebase/updateProfile';

export default function SignUpPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [isSame, setIsSame] = useState(true);

  const isComplete = Boolean(email && password && password2 && isSame && nickname);
  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: async ({
      email,
      password,
      nickname,
    }: {
      email: string;
      password: string;
      nickname: string;
    }) => {
      const user = await signupWithEmailAndPassword(email, password);
      await updateProfile(user, {
        displayName: nickname,
      });
      return true;
    },
  });

  return (
    <main className={'flex w-1/2 flex-col bg-background p-12'}>
      <h1 className={'title-lg mt-[10%]'}>계정 생성하기</h1>
      <div className={'mt-12 flex flex-col gap-6'}>
        <div className={'flex flex-col gap-4'}>
          <h1 className={'title-md'}>이메일 주소 입력</h1>
          <Input
            variant={'flat'}
            aria-label={'이메일을 입력 인풋'}
            classNames={{
              input: 'placeholder:font-light',
              inputWrapper: 'pl-[6px] w-[450px]',
            }}
            startContent={
              <div className={'flex-center flex h-[32px] w-[32px] rounded-lg bg-white'}>
                <EnvelopeClosedIcon className={'shrink-0 text-primary'} />
              </div>
            }
            type={'email'}
            size={'lg'}
            placeholder={'사용하실 이메일을 입력해주세요.'}
            onValueChange={setEmail}
          />
        </div>
        <div className={'flex flex-col gap-4'}>
          <h1 className={'title-md'}>비밀번호 입력</h1>
          <Input
            variant={'flat'}
            aria-label={'비밀번호 입력인풋'}
            type={'password'}
            classNames={{
              input: 'placeholder:font-light',
              inputWrapper: 'pl-[6px] pr-[6px] w-[450px]',
            }}
            startContent={
              <div className={'flex-center flex h-[32px] w-[32px] rounded-lg bg-white'}>
                <LockClosedIcon className={'shrink-0 text-primary'} />
              </div>
            }
            isInvalid={!isSame}
            onFocus={() => {
              setIsSame(true);
            }}
            size={'lg'}
            placeholder={'사용하실 비밀번호를 입력해주세요'}
            onValueChange={setPassword}
          />
          <Input
            variant={'flat'}
            aria-label={'비밀번호 확인 입력인풋'}
            classNames={{
              input: 'placeholder:font-light',
              inputWrapper: 'pl-[6px] pr-[6px] w-[450px]',
            }}
            startContent={
              <div className={'flex-center flex h-[32px] w-[32px] rounded-lg bg-white'}>
                <LockClosedIcon className={'shrink-0 text-primary'} />
              </div>
            }
            type={'password'}
            size={'lg'}
            placeholder={'비밀번호를 한번 더 입력해주세요'}
            onValueChange={setPassword2}
            isInvalid={!isSame}
            errorMessage={'두 비밀번호가 달라요.'}
            onBlur={() => {
              if (password && password2 && password !== password2) {
                setIsSame(false);
              }
            }}
            onFocus={() => {
              setIsSame(true);
            }}
          />
        </div>
        <div className={'flex flex-col gap-4'}>
          <div className={'flex flex-row items-center'}>
            <h1 className={'title-md'}>닉네임 입력</h1>
          </div>
          <Input
            variant={'flat'}
            aria-label={'닉네임 입력인풋'}
            classNames={{
              input: 'placeholder:font-light',
              inputWrapper: 'pl-[6px] pr-[6px] w-[450px]',
            }}
            startContent={
              <div className={'flex-center flex h-[32px] w-[32px] rounded-lg bg-white'}>
                <AvatarIcon className={'shrink-0 text-primary'} />
              </div>
            }
            size={'lg'}
            placeholder={'닉네임을 입력해주세요.'}
            onValueChange={setNickname}
          />
        </div>
        <Button
          color={'primary'}
          isDisabled={!isComplete}
          isLoading={isPending}
          onClick={() => {
            mutate({
              email,
              password,
              nickname,
            });
          }}
          className={'w-[450px]'}>
          가입하기
        </Button>
      </div>
    </main>
  );
}
