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
    developer:{
        type:String,
        default:"N/A"
    },
    released:{
        type:Date,
        default:"N/A"
    },
    price:{
        type:Number,
        required:[true, "Please Enter product price"],
        maxLength:[6,"Price cannot exceed 6 characters"]
    }, 
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },
        },
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
    minimum:{
            type: String,
            default: '{"OS": "Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1, Windows Vista 64 Bit Service Pack 2* (*NVIDIA video card recommended if running Vista OS)","Processor": "Intel Core 2 Quad CPU Q6600 @ 2.40GHz (4 CPUs) / AMD Phenom 9850 Quad-Core Processor (4 CPUs) @ 2.5GHz","Memory": "4 GB RAM","Graphics": "NVIDIA 9800 GT 1GB / AMD HD 4870 1GB (DX 10, 10.1, 11)","Storage": "72 GB available space","Sound Card": "100% DirectX 10 compatible"}'
        },
    recommended:{
        type: String,
        default: '{"OS": "Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1","Processor": "Intel Core i5 3470 @ 3.2GHz (4 CPUs) / AMD X8 FX-8350 @ 4GHz (8 CPUs)","Memory": "8 GB RAM","Graphics": "NVIDIA GTX 660 2GB / AMD HD 7870 2GB","Storage": "72 GB available space","Sound Card": "100% DirectX 10 compatible"}'
    }
})

module.exports = mongoose.model("Product", productSchema); 