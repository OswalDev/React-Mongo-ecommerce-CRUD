import express from 'express';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).catch(error=> console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.get('/api/config/paypal', (req,res) =>{
    res.send(config.PAYPAL_CLIENT_ID);
});


//this was working as static data, now i'll implement it from DB
// app.get("/api/products/:id", (req, res) => {

//     const productId = req.params.id;
//     const product = data.products.find(x => x._id === productId);
//     //validation
//     if (product)
//         res.send(product);
//     else
//         res.status(404).send({ msg: "Product not found." })
// });

// app.get("/api/products", (req, res) => {

//     res.send(data.products);
// });

app.listen(5000, ()=> {console.log("Server started at https://localhost:5000")})