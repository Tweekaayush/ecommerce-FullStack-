const Order = require("../models/orderModel")
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Creating new order

exports.newOrder = catchAsyncErrors(async(req, res, next)=>{
    const {
        billingInfo,
        orderItems, 
        paymentInfo, 
        itemsPrice, 
        taxPrice,  
        totalPrice
    } = req.body

    const order = await Order.create({
        billingInfo,
        orderItems, 
        paymentInfo, 
        itemsPrice, 
        taxPrice,
        totalPrice,
        paidAt:Date.now(),
        user: req.user._id,
    });

    res.status(200).json({
        success:true,
        message: "order created"
    })
})

// get single order

exports.getSingleOrder = catchAsyncErrors(async(req, res, next) =>{
    const order = await Order.findById(req.params.id).populate("user","name email");
    
    res.status(200).json({
        success:true,
        order
    })
});

// get user's orders

exports.myOrders = catchAsyncErrors(async(req, res, next)=>{
    
    const orders = await Order.find({user: req.user._id});

    res.status(200).json({
        success:true,
        orders
    })
})

// get all orders for admin 

exports.getAllOrders = catchAsyncErrors(async(req, res, next)=>{
    
    const orders = await Order.find();

    let totalSales = 0;

    orders.forEach(order=>{
        totalSales += order.totalPrice
    })

    res.status(200).json({
        success:true,
        totalSales,
        orders
    })
})

//delete Order Admin

exports.deleteOrder = catchAsyncErrors(async(req, res, next)=>{
    
    const order = await Order.findById(req.params.id);

    if(!order) return next(new ErrorHandler("Product does not exist", 404));

    await order.deleteOne();

    res.status(200).json({
        success:true,
        message:"Order deleted"
    })
})