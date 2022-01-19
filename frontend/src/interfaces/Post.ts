import { User } from './User';

export interface PostObj {
  post: {
    _id: string;
    title: string;
    content: string;
    categoryId: string;
    commentLength: number;
    createdDate: string;
    ownerId?: {
      _id: string;
      username: string;
    };
  };
  isInMyPostPage?: boolean;
}

export interface PostItem {
  _id: string;
  title: string;
  content: string;
  categoryId: string;
  commentLength: number;
  createdDate: string;
  ownerId: User;
  moderatorsIds: [User];
  comments?: [string] // change when comments interface has been added 
}

export interface UpdatePost {
  _id: string;
  title: string;
  content: string;
  categoryId: string;
}

