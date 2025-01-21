const Order=require('../models/Order');

//place a new order

const createOrder=async(req,res)=>{
    try{
        const{products,totalAmount,shippingAddress,paymentStatus}=req.body;

        //create a new order with provided details

        const order=new Order({
            user:req.user._id,//The Logged in user
            products,  
            totalAmount,
            shippingAddress,
            paymentStatus,
            status:'pending',//Intial status

        });
        //save the order to db
        await order.save();
        res.status(201).json({message:'Order placed successfully',order});
    }catch(err){
        res.status(400).json({error:err.message});
    }
}
//get user oreder
const getUserOrders=async(req,res)=>{
    try{
        const orders=await Order.find({user:req.user._id});
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }
        res.status(200).json(orders);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports={createOrder,getUserOrders,getOrderById};