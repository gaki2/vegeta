import { ReactNode, useState } from 'react';

type Props = {
  children: (count: number) => ReactNode;
};

export const Functional_Child = ({ children }: Props) => {
  const [count, setCount] = useState(0);

  return <div>{children(count)}</div>;
};

const Foo = () => {
  return <Functional_Child>{(count) => <p>{count}</p>}</Functional_Child>;
};
