import React from 'react'
import UserProfile from './UserProfile'
import ImageContainer from './ImageContainer'
import CommentsSection from './CommentsSection'
import ActionBar from './ActionBar'
import AddComment from './AddComment'

const PostCointiner = ({post}) => {
  return (
    <div>
    <UserProfile author={post.author}/>
    <ImageContainer image={post.image}/>
    <ActionBar post={post}/>
    <CommentsSection comments={post.comments}/>
    <AddComment post={post}/>

    </div>
  )
}

export default PostCointiner