import React from 'react'
import { CommentItem } from '../../interfaces/Comment'
import CommentCard from '../comment-card/CommentCard'

interface Props {
  comments: CommentItem[]
}



function CommentList({comments} : Props) {
  return (
    <div>
      {comments.map(comment => <CommentCard key={comment._id} comment={comment} />)}
    </div>
  )
}

export default CommentList
