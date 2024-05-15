import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/UserRouter.js';
import productRoute from './routes/product.js';

import path from 'path';
import core from 'cors';
dotenv.config();

// mongoose
//   .connect("mongodb://127.0.0.1:27017/cons")
//   .then(() => {
//     console.log('Connected to db');
//   })
//   .catch((err) => {
//     console.log("jkj")
//     console.log(err);
//   });



mongoose
  .connect("mongodb+srv://santhoshdhana88:dhivash88@cluster0.vkal3sl.mongodb.net/")
  .then(() => {
    console.log('Connected to db');
  })
  .catch((err) => {
    console.log("jkj")
    console.log(err);
  });

const app = express();

app.use(core());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
// app.use('/stages', stageRouter);
app.use("/api/product", productRoute);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../front_end/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../front_end/build/index.html'));
});





const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
