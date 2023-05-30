const Order = require("../models/orderModel")
const Product = require("../models/productModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Creating new order

exports.newOrder = catchAsyncErrors(async(req, res, next)=>{

    
    let recomList = new Map()

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

    for (let index = 0; index < orderItems.length; index++) {
        if(recomList.has(orderItems[index].genre)){
            recomList.set(orderItems[index].genre, recomList.get(orderItems[index].genre) + 1)
        }
        else{
            recomList.set(orderItems[index].genre, 1)
        }
    }

    const user = await User.findById(req.user.id)
    let newRecom = user.recommendations


    if(newRecom.length === 0){
        recomList.forEach (function(value, key) {
            newRecom.push({
                genre: key,
                frequency: value
            })
        })
    }
    else{
        newRecom.forEach((recom)=>{
            if(recomList.has(recom.genre)){
                recom.frequency += recomList.get(recom.genre)
                recomList.set(recom.genre, -1)
            }
        })
        recomList.forEach (function(value, key) {
            if(value !== -1){
                newRecom.push({
                    genre: key,
                    frequency: value
                })
            }
        })
    }

    const userData={
        recommendations: newRecom
    }; 

    await User.findByIdAndUpdate(req.user.id, userData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
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

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400));
    }
  
    order.orderStatus = req.body.orderStatus;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });