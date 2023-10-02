import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch,useSelector } from 'react-redux'
import { useLikepostMutation } from '../Features/api/postApiSlice';

const ActionBar = ({post}) => {
    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.auth)

    const hasUserLiked = post?.likes.some(like => like.user._id.toString() === userInfo._id);

    const likeLength = post?.likes.length 

    const [optimisticLikeCount,setOptimisticLikeCount] = useState(likeLength)
    const [optimisikLiked,setOptimisticLiked] = useState(hasUserLiked)

    const [like] =  useLikepostMutation();
   
    

    const likeText = optimisticLikeCount > 0 ? optimisticLikeCount === 1 ? '1 Like' : `${optimisticLikeCount} likes` : "";

    const handleLikeButton = () => {
      if (!userInfo) {
          return console.log("login first");
      }

      handleLike();

  };

      const handleLike = () =>{
        setOptimisticLiked(!optimisikLiked)
        setOptimisticLikeCount(optimisikLiked ? optimisticLikeCount - 1 : optimisticLikeCount + 1)

        dispatch(like(post._id))
        .unWrap()
        .then((payload) => {
          console.log("success")
        }).catch((error) => {
          setOptimisticLiked(hasUserLiked),
          setOptimisticLikeCount(likeCount)
        })

      }


  return (
    <div className="action-bar p-2 flex items-center">
    <button onClick={handleLikeButton}>
        {optimisikLiked ? <AiFillHeart className="text-red-500" /> :
            <AiOutlineHeart  className="text-gray-500" />}
        
    </button>
    <span className="text-sm text-gray-700">{likeText}</span>
</div>
  )
}

export default ActionBar