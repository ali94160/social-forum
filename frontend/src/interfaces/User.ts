export interface RegisterUser {
  email: string;
  username: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
}