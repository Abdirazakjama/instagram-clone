import express from "express";
import { authenticate } from "../middlewires/authenticate.js";
import upload from "../middlewires/multer.js";
import { LikePost, commentOnPost, createPost, deletePost, getAllPosts, getPostById, updatePost } from "../usercontrollers/postcontrollers.js";

const postsRoute = express.Router();

postsRoute.post('/create-post',authenticate,upload.single('image'),createPost)
postsRoute.post('/update-post/:id',authenticate,upload.single('image'),updatePost)
postsRoute.get('/get-post',getAllPosts)
postsRoute.get('/get-post/:id',authenticate, getPostById);
postsRoute.post('/like-post/:id',authenticate,LikePost)
postsRoute.post('/comment-post/:id',authenticate,commentOnPost)
postsRoute.delete('/delete-post/:id',authenticate,deletePost)

export default postsRoute