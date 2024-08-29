import User from "../models/User.js";
import Post from "../models/Post.js"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
const jwt_secret = "ahdienirnowr";

export const getAllUser = async(req,res,next) => {

    let users;

    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }

    if(!users)
    {
        return res.status(404).json({error : "No Users Found"});
    }

    return res.status(200).json({users});
};

export const signUp = async(req,res,next) => {
    const {name,username,email,password} = req.body;

    

    let userExist;

    try {
        userExist = await User.findOne({email});
    } catch (err) {
        console.log(err);  
    }

    if(userExist)
    {
        return res.status(400).json({error : "User Already Exists"});
    }

    let usernameUsed;

    try {
        usernameUsed = await User.findOne({username});
    } catch (err) {
        console.log(err);  
    }

    if(usernameUsed)
    {
        return res.status(400).json({error : "Username not available"});
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        username,
        email,
        password : hashedPassword
    })

    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }

    return res.status(201).json({message: "Registered Successfully"});
};

export const login = async(req,res,next) => {
    const {email,password} = req.body;

    let userFound;

    try {
        userFound = await User.findOne({email});
    } catch (err) {
        console.log(err);
    }

    if(!userFound)
    {
        return res.status(402).json({error : "No User Found"});
    }

    const isPasswordSame = bcrypt.compareSync(password,userFound.password);

    if(!isPasswordSame)
    {
        return res.status(400).json({error : "Wrong Password"});
    }
    else
    {
        const token=jwt.sign({_id:userFound.id},jwt_secret)
        //console.log(token);
        const {_id,name,username,email,followers,following} = userFound
        return res.json({token , user :{_id,name,username,email,followers,following}});
    }
    
};

export const userPage = async(req,res,next) => {

    try {
        User.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {
            Post.find({ user: req.params.id })
                .populate("comments.user" , "_id name")
                .populate("user", "_id name")
                .then(post => {
                    res.json({user,post})
                })
        })
    } catch (err) {
        console.log(err);
    }
};

export const followUser=async(req,res,next) => {

    let user;
    
    // console.log("follow id", req.body.followId);
    // console.log("user id", req.body.user);

    try {
        user = await User.findByIdAndUpdate(req.body.followId,{
            $push : {followers : req.body.user}
        })
    } catch (err) {
        console.log(err);
        
    }

    try {
        user = await User.findByIdAndUpdate(req.body.user,{
            $push : {following : req.body.followId}
        })
    } catch (err) {
        console.log(err);
        
    }
    return res.status(200).json({user})
    /*User.findByIdAndUpdate(req.body.followId,{
        $push : {followers : req.user}
    },{
        new:true
    },(err,res) => {
        if(err)
        {
            return res.status(422).json({error:err})
        }
        else
        {
            User.findByIdAndUpdate(req.user,{
                $push : {following : req.body.followId}
            })
        }
    }).then(result => res.json(result))
        .catch(err => console.log(err))*/
};

export const unfollowUser=async(req,res,next) => {

    let user;
    
    console.log("follow id", req.body.followId);
    console.log("user id", req.body.user);

    try {
        user = await User.findByIdAndUpdate(req.body.followId,{
            $pull : {followers : req.body.user}
        })
    } catch (err) {
        console.log(err);
        
    }

    try {
        user = await User.findByIdAndUpdate(req.body.user,{
            $pull : {following : req.body.followId}
        })
    } catch (err) {
        console.log(err);
        
    }
    return res.status(200).json({user})
    /*User.findByIdAndUpdate(req.body.followId,{
        $push : {followers : req.user}
    },{
        new:true
    },(err,res) => {
        if(err)
        {
            return res.status(422).json({error:err})
        }
        else
        {
            User.findByIdAndUpdate(req.user,{
                $push : {following : req.body.followId}
            })
        }
    }).then(result => res.json(result))
        .catch(err => console.log(err))*/
};

export const changePic = async(req,res,next) => {
    let pic;

    try {
        pic = await User.findByIdAndUpdate(req.body.user,{
            $set : {photo : req.body.pic}
        }).then(result => {
            res.json(result)
        })
    } catch (err) {
        console.log(err);
    }

    
};