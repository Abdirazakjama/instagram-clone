
import { apiSlice } from "./baseApiASlice";

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        getPosts:builder.query({
            query:() =>({
                url:"/posts/get-post"
            }),
            providesTags:['Post']
        }),
        getPostInfo:builder.query({
            query: (postId) => ({
                url: `/posts/get-post/${postId}`
            })
        }),
        likepost: builder.mutation({
            query: (postid) => ({
                url:`/posts/like-post/${postid}`,
                method:'POST'
            }),
            invalidatesTags:["Post"]
        })
        })
})



export const {useGetPostsQuery, useGetPostInfoQuery,useLikepostMutation} = postApiSlice;