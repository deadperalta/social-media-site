import express from 'express';
import { getAllUser, signUp, login, userPage, followUser,unfollowUser, changePic} from '../controller/userController.js';
import {requireLogin} from '../middleware/requireLogin.js';
const router=express.Router();

router.get('/',getAllUser);
router.post('/signup',signUp);
router.post('/login',login);
router.get('/:id',userPage);
router.put('/follow',requireLogin, followUser);
router.put('/unfollow', requireLogin,unfollowUser);
router.put('/changeprofilepic',requireLogin,changePic);
export default router;