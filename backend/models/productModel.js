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
        default:"Elevate your gaming experience with our exceptional PC games collection! From fast-paced shooters to challenging puzzles, our games offer endless hours of entertainment for gamers of all levels. With state-of-the-art graphics, intuitive controls, and thrilling gameplay, you'll be transported to a whole new world of excitement. Whether you're a fan of single-player campaigns or multiplayer battles, our PC games are designed to keep you on the edge of your seat. So why settle for anything less? Try our games today and unleash your inner gamer."
    },
    platform:{
        type:String,
        default:"Pc"
    },
    released:{
        type:String,
        default:"N/A"
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
            default: "TBA"
        },
        recommended:{
            type:String,
            default: "TBA"
        }
    }
})

module.exports = mongoose.model("Product", productSchema); 