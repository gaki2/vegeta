import { type Todo } from '@/firebase/Todo';
import { invoke } from '@tauri-apps/api/tauri';

export const greet = () => {
  invoke<string>('greet', { name: 'BG' }).then((res) => {
    console.log(res);
  });
};

export const add_todo = async ({ todo, profileId }: { todo: Todo; profileId: string }) => {
  await invoke<string>('add_todo', { todo_json: JSON.stringify(todo), profile_id: profileId });

  return true;
};

export const update_todo = async (todo: Todo) => {
  await invoke<string>('update_todo', { todo_json: JSON.stringify(todo) });
  return true;
};

type GetTodoReturn = {
  todos: {
    [key in string]: Todo;
  };
};

export const get_todo = async () => {
  const todoList: string = await invoke('get_all_todo');
  return JSON.parse(todoList) as GetTodoReturn;
};
