import React from 'react'

const UserProfile = ({author}) => {
  return (
    <div>
        <div className='flex items-center py-2'>
            <img src={author.url ?? "https://images.unsplash.com/photo-1695653422287-81cfeeb96ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=400&q=60"} alt="Author" className="rounded-full w-10 h-10 object-cover" />
            <span className="ml-4 text-sm font-semibold text-gray-800">{author.username}</span>
        </div>
    </div>
  )
}

export default UserProfile