import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useComment } from '../../context/CommentContext'
import { CommentItem } from '../../interfaces/Comment'
import { User } from '../../interfaces/User'
import CommentCard from '../comment-card/CommentCard'

interface Props {
  ownerId: string;
  moderators: User[];
}

function CommentList({ ownerId, moderators }: Props) {
  const { comments } = useComment();
  const { user } = useAuth();

  const isAdmin = () => user?.roles.includes("ADMIN");
  const isPostOwner = () => user?._id === ownerId;
  const isPostModerator = () => moderators.some(moderator => user?._id === moderator._id);
  const hasDeleteCommentAccess = isAdmin() || isPostOwner() || isPostModerator();

  return (
    <div>
      {comments.length > 0 &&
        comments.map((comment: CommentItem) => (
          <CommentCard
            key={comment._id}
            comment={comment}
            ownerId={ownerId}
            moderators={moderators}
            hasDeleteAccess={hasDeleteCommentAccess}
          />
        ))}
    </div>
  );
}

export default CommentList
