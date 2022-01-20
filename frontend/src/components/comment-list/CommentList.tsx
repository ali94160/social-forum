import React from 'react'
import { useComment } from '../../context/CommentContext'
import { CommentItem } from '../../interfaces/Comment'
import { User } from '../../interfaces/User'
import CommentCard from '../comment-card/CommentCard'

interface Props {
  ownerId: string;
  moderators: User[];
}

function CommentList({ ownerId, moderators }: Props) {
  const {comments} = useComment()


  return (
    <div>
      {comments.map((comment: CommentItem) => (
        <CommentCard key={comment._id} comment={comment} ownerId={ownerId} moderators={moderators} />
      ))}
    </div>
  );
}

export default CommentList
