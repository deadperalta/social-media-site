import express from 'express';
import { getAllPost, addPost ,updatePost, getByUserID, deletePost, getMyPost, likePost, unlikePost, commentOnPost, getFollowingPost, removelike, removeDislike} from '../controller/postController.js';
const postRouter = express.Router();
import {requireLogin} from '../middleware/requireLogin.js';
import { loginRequire } from '../middleware/loginRequire.js';

postRouter.get('/', requireLogin, getAllPost);
postRouter.post('/addpost', requireLogin,addPost);
postRouter.get('/mypost', requireLogin,getMyPost);
postRouter.put('/update/:id',requireLogin,updatePost);
postRouter.get('/user/:id',getByUserID);
postRouter.delete('/:id',deletePost);
postRouter.put('/like',requireLogin,likePost);
postRouter.put('/unlike',requireLogin,unlikePost);
postRouter.put('/comment',requireLogin,commentOnPost);
postRouter.get('/followingPost',loginRequire,getFollowingPost);
postRouter.put('/removelike',requireLogin,removelike)
postRouter.put('/removedislike',requireLogin,removeDislike)
export default postRouter;
