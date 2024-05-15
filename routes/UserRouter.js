import express from 'express';
import User from '../models/UserModel.js';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils.js';
import Product from '../models/product.js';

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
        loginTime: date,
      };
      arr.push(user);
      
    });
    if (users) {
      console.log(arr)
      res.json(arr);
      return;
    }
    res.status(404).send({ message: 'Users not found!' });
  })
);

// userRouter.put(
//   '/signin',
//   expressAsyncHandler(async (req, res) => {
//     const users = await User.findOne({
//       email: req.body.email,
//       password:req.body.password
      
//     });
   
//     if (users) {
      
//       res.send({
       
//         name: users.name,
//         email: users.email,
        
        
//         token: generateToken(users),
//       });
//       return;
//     }
  
//     const user = new User({
      
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
      
//     });
    
//     const data = await user.save();
    
//     res.send({
     
//       name: data.name,
//       email: data.email,
      
     
//       token: generateToken(data),
//     });
    
//     return;
//   })
// );



userRouter.put(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    try {
      
      const user = await User.findOne({ email: req.body.email });
      
      if (user && user.password === req.body.password) {
        res.status(200).json({
          name:user.name,
          email: user.email,
          token: generateToken(user),
        });
      } else {
        res.status(404).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);



userRouter.post('/signup', async (req, res) => {

   
  const users = await User.findOne({
    email: req.body.email,
    
  });

  const data =
  {
  name:req.body.name,
  email: req.body.email,
  password: req.body.password,
  }
  
 console.log(users);
 try{
  if(users)
      {
         
          res.json("exist")
      }
      else
      {
        res.json("kjjhj")
      
        await User.insertMany(data)
    }
 }
 
 catch(e)
 {
      console.log(e);
 }

});







userRouter.get(
  '/page',
 expressAsyncHandler (async (req, res) => {

    const data = req.query.value;
    console.log(data)
    
    const users = await Product.find({name:data});
    const arr = new Array();
    
    users.forEach((ele) => {
      
      const user = {
        
        name:ele.name,
        manufacturer:ele.manufacturer,
        stock:ele.stock,
        availibility:ele.availibility
      };
      arr.push(user);
      
    });
    
    if (users) {
      console.log(arr)
      
      res.json(arr);
      return;
    }
    res.status(404).send({ message: 'Users not found!' });
  })
);





export default userRouter;
