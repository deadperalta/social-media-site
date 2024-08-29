import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../models/User.js'
const jwt_secret = "ahdienirnowr";

export const loginRequire = (req,res,next) => {
    const {authorization} = req.headers

    if(!authorization)
    {
        return res.status(401).json({message : "You must have logged in 1"});
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,jwt_secret,(err,payload) => {
        if(err)
        {
            return res.status(401).json({message : "You must have logged in 2"});
        }

        const id=payload;

        User.findById(id).then(userData => {

           //console.log(userData._id.valueOf()); 
            //console.log(userData);
            req.body.user=userData
            //console.log(userData);
            next()
        })
    })
}