import express from 'express';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

//Getting back list of products for the users
router.get("/", async(req,res)=>{
    const products = await Product.find({});
    res.send(products);
}) ;

router.get("/:id", async(req,res)=>{
    const product = await Product.findOne({_id: req.params.id});
    if(product){
       res.send(product); 
    }else{
        res.status(404).send({message:"Product not found"});
    }
});

router.post("/",isAuth, isAdmin, async(req,res)=>{
    const product= new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews 
    });
    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({message: 'New product created', data: newProduct});
    }
        return res.status(500).send({message:'Error in creating product'});
})

router.put("/:id",isAuth, isAdmin, async(req,res)=>{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product){        
            product.name= req.body.name;
            product.price= req.body.price;
            product.image= req.body.image;
            product.category= req.body.category;
            product.countInStock= req.body.countInStock;
            product.description= req.body.description;
                        
            const updatedProduct = await product.save();
            if(updatedProduct){
                return res.status(200).send({message: 'Product updated', data: updatedProduct});
            }                
        }     
        return res.status(500).send({message:'Error in updating product'});

});

router.delete("/:id",isAuth, isAdmin, async(req,res) =>{
    const deletedProduct = await Product.findById(req.params.id);
    if(deletedProduct){
        await deletedProduct.remove();
        res.send({message: "Product deleted"});
    }else{
        res.send("Error in deleting product");
    }
});

router.get("/", async(req,res)=>{
    const category = req.query.category ? { category : req.query.category} : {};
    const searchKeyword = req.query.searchKeyword ? {
        name: {
            $regex: req.query.searchKeyword,
            $options: 'i',
        },
    }
    : {};
    const sortOrder = req.query.sortOrder ? req.query.sortOrder === 'lowest' ?
    { price: 1}
     : {price: -1}
     : {_id: -1};
     const products = await Product.find({...category, ...searchKeyword}).sort(
         sortOrder
     );
     res.send(products);
});

router.post("/:id/reviews", isAuth, async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        const review= {
            name: req.body.name,
            rating: Number(req.body.rating),
            comment: req.body.comment,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((a,c) => c.rating+ a, 0) / product.reviews.length;
        const updatedProduct = await product.save();
        res.status(201).send({
            data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
            message: "Review saved succesfully.",
        });
    } else {
        res.status(404).send({message: "Product not found"})
    }
});

export default router; 