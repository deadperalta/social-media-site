import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";

/*export const getAllPost = async(req,res,next) => {
    Post.find()
    .populate("user", "_id name")
    .then(posts => res.json(posts))
    .catch(err => console.log(err));
}*/

export const getAllPost = async(req,res,next) => {
    let posts;

    try {
        posts = (await Post.find().populate("user", "_id username photo").populate("comments.user", "_id username").sort("-createdAt"));
    } catch (err) {
        console.log(err);
    }

    if(!posts)
    {
        return res.status(404).json({message : "No Posts Found"});
    }

    return res.json(posts);
};

export const addPost = async(req,res,next) => {
    const {title,body,user} = req.body;

    
    //console.log(user);
    let userFound;

    try {
        userFound = await User.findById(user);
    } catch (err) {
        console.log(err);
    }

    if(!userFound)
    {
        return res.status(422).json({message : "No User Found"});
    }

    const post = new Post({
        title,
        body,
        user,
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await post.save({session});
        userFound.posts.push(post);
        await userFound.save({session});
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
    }

    return res.status(200).json({post});
};

export const getMyPost = async(req,res,next) => {

    Post.find({ user: req.body.user })
    .populate("comments.user" , "_id name")
    .populate("user", "_id name photo")
    .sort("createdAt")
    .then(myposts => {
        res.json(myposts)})
    
};

export const updatePost = async(req,res,next) => {
    const caption = req.body.text;

    console.log(caption);
    const postId = req.params.id;

    let post;

    try {
        post = await Post.findByIdAndUpdate(postId,{
            title:caption
        });
    } catch (err) {
        return console.log(err);
    }

    if(!post)
    {
        return res.status(400).json({message : "No Such Post"});
    }

    return res.status(200).json({post});
};

export const getByUserID = async(req,res,next) => {
    const postID = req.params.id;

    let userPosts;

    try {
        userPosts = await User.findById(postID).populate("posts.user" , "_id name username").populate("user", "_id photo name username")
    } catch (err) {
        console.log(err);
    }

    if(!userPosts)
    {
        return res.status(404).json({message : "No Posts"});
    }

    return res.status(200).json({posts : userPosts});
};

export const deletePost = async(req,res,next) => {
    const postId = req.params.id;
    console.log(postId);
    
    let post;

    try {
        post = await Post.findByIdAndRemove(postId).populate("user");
        await post.user.posts.pull(post);
        await post.user.save();
    } catch (err) {
        console.log(err);
    }

    if(!post)
    {
        return res.status(400).json({message : "Unable to Delete"});
    }

    return res.status(200).json({message : "Deleted Succesfully"});
};
export const likePost=async(req,res,next) => {
    
    try {
        console.log("Post Id",req.body.postId);
    console.log("user Id",req.body.user);
        await Post.findByIdAndUpdate(req.body.postId,{
            $push: {likes :req.body.user},
            $pull : {dislikes : req.body.user}
        },{
            new:true
        }).populate("user", "_id name photo")
        .then(result => {
            res.json(result)
        })

    } catch (err) {
        console.log(err)
        return res.status(422).json({error:err})
    }
    
};
export const unlikePost=async(req,res,next) => {
    try {
        console.log("Post Id",req.body.postId);
    console.log("user Id",req.body.user);
        await Post.findByIdAndUpdate(req.body.postId,{
            $pull: {likes :req.body.user},
            $push: {dislikes : req.body.user},
        },{
            new:true
        }).populate("user", "_id name photo")
        .then(result => {
            res.json(result)
        })

    } catch (err) {
        console.log(err)
        return res.status(422).json({error:err})
    }
    
};

export const removeDislike=async(req,res,next) => {
    try {
        console.log("Post Id",req.body.postId);
    console.log("user Id",req.body.user);
        await Post.findByIdAndUpdate(req.body.postId,{
            $pull: {dislikes :req.body.user},
        },{
            new:true
        }).populate("user", "_id name photo")
        .then(result => {
            res.json(result)
        })

    } catch (err) {
        console.log(err)
        return res.status(422).json({error:err})
    }
    
};

export const removelike=async(req,res,next) => {
    try {
        await Post.findByIdAndUpdate(req.body.postId,{
            $pull: {likes :req.body.user},
        },{
            new:true
        }).populate("user", "_id name photo")
        .then(result => {
            res.json(result)
        })

    } catch (err) {
        console.log(err)
        return res.status(422).json({error:err})
    }
    
};


export const commentOnPost = async(req,res,next) => {
    const comment = {
        comment : req.body.text,
        user: req.body.user
    }
    try {
        await Post.findByIdAndUpdate(req.body.postId,{
            $push : {comments : comment}
        },{
            new : true
        }).populate("comments.user" , "_id username photo")
        .populate("user", "_id username photo")
        .then(result => res.json(result))
    } catch (err) {
        console.log(err);
        return res.status(422).json({error:err})
    }
};

export const getFollowingPost = async(req,res,next) =>
{
    //console.log(req.body.user);
    
    Post.find({ user: { $in: req.body.user.following } })
        .populate("user", "_id username")
        .populate("comments.user", "_id username")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => { console.log(err) })
};