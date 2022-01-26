import { Category } from "./Category";
import { CommentItem } from "./Comment";
import { User } from "./User";

export interface PostItem {
  _id: string;
  title: string;
  content: string;
  categoryId: Category | string;
  commentLength: number;
  createdDate: string;
  ownerId: User;
  moderatorsIds: [User];
  comments?: CommentItem[]; // change when comments interface has been added
}

export interface UpdatePost {
  _id: string;
  title: string;
  content: string;
  categoryId: string;
}

