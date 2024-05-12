import express from 'express';
import User from '../models/UserModel.js';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
  '/logincount',
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    const arr = new Array();
    users.forEach((ele) => {
      const date =
        ele._id.getTimestamp().getHours() +
        ':' +
        ele._id.getTimestamp().getMinutes() +
        ':' +
        ele._id.getTimestamp().getSeconds();
      const user = {
        
        name: ele.name,
        email: ele.email,
        password: ele.password,
        rollno: ele.rollno,
        loginTime: date,
      };
      arr.push(user);
    });
    if (users) {
      res.send(arr);
      return;
    }
    res.status(404).send({ message: 'Users not found!' });
  })
);

userRouter.put(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const users = await User.findOne({
      email: req.body.email,
      
    });
   
    if (users) {
      
      res.send({
       
        name: users.name,
        email: users.email,
        password: users.password,
        
        token: generateToken(users),
      });
      return;
    }
  
    const user = new User({
      
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      
    });
    
    const data = await user.save();
    
    res.send({
     
      name: data.name,
      email: data.email,
      password: data.password,
     
      token: generateToken(data),
    });
    
    return;
  })
);

export default userRouter;
