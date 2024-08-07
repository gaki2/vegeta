'use client';

import { Button, Divider, Input } from '@nextui-org/react';
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  EyeOpenIcon,
  EyeNoneIcon,
  ArrowRightIcon,
} from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { signInWithEmailAndPassword } from '@/firebase/signin';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { replace } = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isLoginActive = password.length > 0 && email.length > 0;

  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return signInWithEmailAndPassword(email, password);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      replace('/');
    }
  }, [isSuccess]);

  return (
    <main className={'flex w-1/2 flex-col bg-background p-12'}>
      <h1 className={'title-lg mt-[20%]'}>로그인 하기</h1>
      <div className={'mt-8 flex w-full gap-4'}>
        <div className={'flex w-[450px] flex-col gap-4'}>
          <Input
            variant={'flat'}
            aria-label={'이메일을 입력해주세요.'}
            classNames={{
              input: 'placeholder:font-light',
              inputWrapper: 'pl-[6px]',
            }}
            startContent={
              <div className={'flex-center flex h-[32px] w-[32px] rounded-lg bg-white'}>
                <EnvelopeClosedIcon className={'shrink-0 text-primary'} />
              </div>
            }
            type={'email'}
            size={'lg'}
            placeholder={'이메일을 입력해주세요'}
            onValueChange={setEmail}
          />
          <Input
            variant={'flat'}
            aria-label={'비밀번호를 입력해주세요.'}
            classNames={{
              input: 'placeholder:font-light',
              inputWrapper: 'pl-[6px] pr-[6px]',
            }}
            startContent={
              <div className={'flex-center flex h-[32px] w-[32px] rounded-lg bg-white'}>
                <LockClosedIcon className={'shrink-0 text-primary'} />
              </div>
            }
            endContent={
              <button
                onClick={() => setShowPassword(!showPassword)}
                className={
                  'flex-center flex h-[32px] w-[32px] shrink-0 rounded-full hover:bg-gray-200'
                }>
                {showPassword ? (
                  <EyeNoneIcon className={'text-primary'} />
                ) : (
                  <EyeOpenIcon className={'text-primary'} />
                )}
              </button>
            }
            type={showPassword ? 'text' : 'password'}
            size={'lg'}
            placeholder={'비밀번호를 입력해주세요'}
            onValueChange={setPassword}
          />
          {isError && (
            <p className={'text-xs font-semibold text-red-500'}>
              로그인을 하지 못했어요. 아이디와 비밀번호를 확인해주세요.
            </p>
          )}
          <Link
            href={'/login/find'}
            className={'ml-auto text-xs font-semibold text-blue-600'}>
            비밀번호를 잊으셨나요?
          </Link>
        </div>
        <Button
          aria-label={'로그인 버튼'}
          className={'h-[calc(96px_+_1rem)] w-[96px] shrink-0'}
          color={isLoginActive ? 'primary' : 'default'}
          isDisabled={!isLoginActive}
          isLoading={isPending}
          onClick={() =>
            mutate({
              email,
              password,
            })
          }
          isIconOnly>
          <ArrowRightIcon className={'h-8 w-8'} />
        </Button>
      </div>
      <Divider className={'mt-[64px] w-[560px]'} />
      <h2 className={'title mt-8'}>계정이 없으신가요?</h2>
      <Button
        as={'a'}
        href={'/signup'}
        color={'primary'}
        variant={'flat'}
        size={'lg'}
        className={'mt-4 h-[48px] w-[500px] rounded-md'}>
        계정 만들기
      </Button>
    </main>
  );
}
