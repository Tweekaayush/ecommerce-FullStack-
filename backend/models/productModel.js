const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter Product name"],
        trim:true
    },
    background_image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:[true, "Please enter product Descriptions"]
    },
    price:{
        type:Number,
        required:[true, "Please Enter product price"],
        maxLength:[5,"Price cannot exceed 5 characters"]
    }, 
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            id:{
                type:Number,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    genre:{
        type:String,
        required:[true, "Please enter product category"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {  user:{
            type: mongoose.Schema.ObjectId,
            ref:"User",
            required:true
            },  
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    tags:[{
        id:{
            type:Number,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        image_background:{
            type:String,
            required:true
        }

    }],
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now
    },
    system_requirements:{
        minimum:{
            type:String,
            required:true
        },
        recommended:{
            type:String,
            required:true
        }
    }
})

module.exports = mongoose.model("Product", productSchema); 