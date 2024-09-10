export type Progress = 'IDLE' | 'PROCESSING' | 'FINISHED';

export type Todo = {
  id: string;
  title: string;
  description: string | null;
  created_at: number;
  finished_at: number | null;
  status: Progress;
  is_deleted: boolean;
};
