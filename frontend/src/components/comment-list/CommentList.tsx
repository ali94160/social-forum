import React from 'react'
import { CommentItem } from '../../interfaces/Comment'
import { User } from '../../interfaces/User'
import CommentCard from '../comment-card/CommentCard'

interface Props {
  comments: CommentItem[];
  ownerId: string;
  moderators: User[];
}

function CommentList({ comments, ownerId, moderators }: Props) {
  return (
    <div>
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} ownerId={ownerId} moderators={moderators} />
      ))}
    </div>
  );
}

export default CommentList
