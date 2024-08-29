import express from 'express';
import mongoose from 'mongoose';

import router from './backend/router/User-routes.js';
import postRouter from './backend/router/post_routes.js';
// import router  from './backend/router/user-routes';
// import router from './backend/router/user-routes';
// import postRouter from './backend/router/post_routes';
import jwt from 'jsonwebtoken';
const jwt_secret = "ahdienirnowr";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const app=express();

const cors=require('cors');
app.use(cors());

app.use(express.json());

app.use("/api/user",router);
app.use("/api/post",postRouter);

mongoose.connect("mongodb+srv://awesomepotaloo:uZ0NWYWVem9upalu@cluster0.emofwcc.mongodb.net/?retryWrites=true&w=majority")
.then(() => app.listen(5000)).then(console.log("Connected")).catch((err) => console.log(err));

//uZ0NWYWVem9upalu 