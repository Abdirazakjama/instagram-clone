import React from 'react'
import Stories from '../Stories'
import PostCointiner from '../../post/PostCointiner'
import { useGetPostsQuery } from '../../Features/api/postApiSlice'
import PostSkeleton from '../../post/PostSkeleton'



const MainContent = () => {

  const {data,isLoading} = useGetPostsQuery();
  return (
    //stories
   <div className="bg-gray-100 w-full p-4 overflow-y-auto">
     <Stories />,
    {isLoading ? <PostSkeleton />: (
      data.length > 0 && data.map(post => (
        <PostCointiner key={post._d} post={post}/>
      ))
    
    )}
   </div>
  )
}

export default MainContent