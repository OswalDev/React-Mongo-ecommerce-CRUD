import mongoose, { mongo } from 'mongoose';
const ShippingSchema = {
    address:{ type: String, required: true},
    city:{type: String, required:true},
    state:{type: String, required:true},
    municipality:{type:String, required: true}
};

const paymentSchema = {
    paymentMethod:{type:String, required:true}
};

const orderItemsSchema = new mongoose.Schema({
    name:{type:String, required:true},
    qty:{type:String, required:true},
    image:{type:String, required:true},
    price:{type:String, required:true},
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:true
    },
});

const orderSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref: 'User', required: true},
    orderItems: [orderItemsSchema],
    Shipping: ShippingSchema,
    payment: paymentSchema,
    itemPrice: { type: Number},
    taxPrice: {type:Number},
    ShippingPrice: {type:Number},
    totalPrice: { type:Number},
    isPaid: { type:Boolean, default:false},
    paidAt: {type:Date},
    isDelivered: {type:Boolean, default:false},
    deliveredAt: { type:Date},
},{
    timestamps:true
});

const orderModel = mongoose.model('Order', orderSchema);
export default orderModel;