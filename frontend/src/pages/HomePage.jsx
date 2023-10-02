import React from 'react'
import { useGetPostsQuery } from '../Features/api/postApiSlice'
import { Link } from 'react-router-dom';
import Sidebar from '../component/layout/Sidebar';
import MainContent from '../component/layout/MainContent';
import RightSidebar from '../component/layout/RightSidebar';

const HomePage = () => {
   

  
  return (
    <div className='h-screen bg-gray-50 flex flex-col'>
            <div className="flex flex-grow">

                <div className="flex flex-col bg-gray-50 p-4">
                    <Sidebar />
                </div>

                <div className="flex flex-col flex-grow-3 max-w-3xl bg-white  mx-auto">
                    <MainContent />
                </div>

                <div className="flex flex-col bg-gray-50 p-4">
                    <RightSidebar />
                </div>
            </div>
        </div>
  )
}

export default HomePage