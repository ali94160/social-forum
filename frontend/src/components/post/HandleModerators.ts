import { User } from '../../interfaces/User';
import { PostItem } from '../../interfaces/Post';

export const formatModStr = (post: PostItem | null) => {
  let str = '';
    if (!post?.moderatorsIds?.length) {
      str += 'none';
    } else {
      post?.moderatorsIds?.map((m: User, i: number) => {
        if (i === 0) {
          str += m.username;
          return;
        }
        if (post?.moderatorsIds.length > 1 && i === post?.moderatorsIds.length - 1) {
          str += ' and ';
          str += m.username;
        } else if(post?.moderatorsIds.length > 2) {
          str += ', ';
          str += m.username;
        }
      });
    }
  return str;
}

