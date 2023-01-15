export type User = {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type UserCreate = { username: string; age: number; hobbies: string[] };

export function isUserCreate(u: Object): u is UserCreate {
  if ('username' in u && 'age' in u && 'hobbies' in u) {
    return true;
  }
  return false;
}

export interface Error {
  code: number | string;
}
