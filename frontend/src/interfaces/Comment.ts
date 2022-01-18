import { User } from "./User";

export interface CommentItem {
  _id: string;
  content: string;
  writerId: User;
  createdDate: Date;
  postId: string;
}