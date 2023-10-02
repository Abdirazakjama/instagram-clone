import cloudinary from "../config/cloadnary.js";
import Comment from "../models/Comment.js";
import Like from "../models/Likes.js";
import Post from "../models/post.js";
import postsRoute from "../routes/post.js";

export const createPost = async(req,res)=>{
    try {
        let result;
        
        if(req.file){
            let encodeImage = `data:image/jpg;base64,${req.file.buffer.toString('base64')}`

            result = await cloudinary.uploader.upload(encodeImage,{
                resource_Type:'image',
                Transformation:[
                    {with:500,height:500,crop:"limit"}
                ],
                encoding: 'base64',
                folder:"posts"
            });
        }

        const post = new Post({
            content:req.body.content,
            image:result?.url || null,
            author:req.user._id
        })

        await post.save()

        return res.status(201).send(post)
    } catch (error) {
        console.log("",error)
        res.status(401).send("")
    }
}
export const updatePost = async(req,res)=>{
    try {

        let udatedfield = {
            content: req.body.content
        }
        
        let result;

        const isExists = await Post.findById(req.params.id)

        if(!isExists) return res.status(400).send("post not found")
        
        if(req.file){
            let encodeImage = `data:image/jpg;base64,${req.file.buffer.toString('base64')}`

            result = await cloudinary.uploader.upload(encodeImage,{
                resource_Type:'image',
                Transformation:[
                    {with:500,height:500,crop:"limit"}
                ],
                encoding: 'base64'
            });

            udatedfield.image = result.url
        }

       const post = await Post.findByIdAndUpdate(req.params.id,udatedfield,{new:true})

       

        return res.status(201).send(post)
    } catch (error) {
        console.log("",error)
        res.status(401).send("")
    }
}

export const getAllPosts = async(req,res) => {
    try {
        const posts = await Post.find().populate({
            path:"likes",
            model:"Like",
            populate:{
                path:"user",
                model:"User",
                select:"username"
            }
        }).populate({
            path:"author",
            model:"User"
        }).populate({
            path:"comments",
            model:"Comment",
            select:"content",
            populate: {
                path: "user",
                model: "User",
                select: "username"
            }
        }).sort({createdAt: -1})
        res.status(200).send(posts)
    } catch (error) {
        console.log("error getting posts",error)
        return res.status(400).send(error.message)
    }
} 

export const LikePost = async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id)

        if(!post)  return res.status(400).send("post not found")

        const isExsistingLIke = await Like.findOne({post:post._id, user: req.user._id});

        if(isExsistingLIke){
            await Like.findByIdAndRemove(isExsistingLIke._id)
            post.likes.pull(isExsistingLIke._id)
            await post.save()

            return res.status(200).send("post unliked successfuly")
        }

        const like = new Like({
            post:post._id,
            user:req.user._id
        })

        await like.save();

        post.likes.push(like._id)

        await post.save();

        return res.status(200).send("post liked successfuly")


        
    } catch (error) {
        console.log("error getting posts",error)
        return res.status(400).send(error.message)
    }
}
export const getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate({
                path: 'comments',
                model: 'Comment',
                select:"content",
            })
            .populate({
                path: 'likes',
                model: 'Like',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            });

        if (!post) return next(new Error('Post not found'));
        // res.clearCookie('token');
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

export const commentOnPost = async(req,res) =>{

    const post = await Post.findById(req.params.id)

        if(!post)  return res.status(400).send("post not found")

    try {

        const comment = new Comment({
            content: req.body.content,
            user: req.user._id,
            post: post._id
        });

        await comment.save()

        // relationship

        post.comments.push(comment._id);

        await post.save();

        res.status(200).send("comment created")



    }  catch (error) {
        console.log("error on comment posts",error)
        return res.status(400).send(error.message)
    }
}

export const deletePost = async (req, res) => {

    try {

        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(400).send("Post Not Found");

        return res.status(200).send("Post deleted successfully");

    } catch (error) {
        console.log("error on deleting post", error);
        return res.status(400).send(error.message);
    }


};

