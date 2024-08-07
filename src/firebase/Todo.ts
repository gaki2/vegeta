export type Status = 'processing' | 'finished';

export type Todo = {
  title: string;
  detail: string | null;
  createdAt: number;
  finishedAt: number | null;
  status: Status;
  isDeleted: boolean;
};
