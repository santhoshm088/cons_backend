import express from 'express';
import Product from '../models/product.js';
import expressAsyncHandler from 'express-async-handler';





// const product = require("../controller/product");
// import product from "../controller/product";

const productRouter = express.Router();
// Add Product
// app.post("/add", product.addProduct);

productRouter.post("/add", Product.addProduct = (req, res) => {
    console.log("req: ", req.body.userId);
    const addProduct = new Product({
      
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      stock: req.body.stock,
      description: req.body.description,
      availibility: req.body.availibility
    });
    
    addProduct
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(402).send(err);
      });
  } );


// Get All Products
productRouter.get("/get/", Product.getAllProducts = async (req, res) => {
    console.log("77")
    const findAllProducts = await Product.find({
      userID: req.params.userId,
    }).sort({ _id: -1 });

    console.log(findAllProducts) // -1 for descending;
    res.json(findAllProducts);
  }
  
  );

// // Delete Selected Product Item
productRouter.get("/delete/:id", Product.deleteSelectedProduct = async (req, res) => {
    const deleteProduct = await Product.deleteOne(
      { _id: req.params.id }
    );
   
  
   
    res.json({ deleteProduct });
  });

// // Update Selected Product
 productRouter.post("/update", Product.updateSelectedProduct = async (req, res) => {
    try {
      const updatedResult = await Product.findByIdAndUpdate(
        { _id: req.body.productID },
        {
          name: req.body.name,
          manufacturer: req.body.manufacturer,
          stock: req.body.stock,
          description: req.body.description,
          availibility: req.body.availibility,
        },
        { new: true }
      );
      console.log(updatedResult);
      res.json(updatedResult);
    } catch (error) {
      console.log(error);
      res.status(402).send("Error");
    }
  }
  );



  const data = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Doe' }
  ];
  
  // Define route to handle GET request
  productRouter.get('/data', (req, res) => {
    // Send the data as JSON
    res.json(data);
  });



// // Search Product
// app.get("/search", product.searchProduct);

// // http://localhost:4000/api/product/search?searchTerm=fa

// // module.exports = app;

export default productRouter;
