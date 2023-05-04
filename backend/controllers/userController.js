const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const {getResetPasswordToken} = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto")
const cloudinary = require("cloudinary")

//Register a User

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
  
    const { name, email, password } = req.body;
  
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
  
    sendToken(user, 201, res);
  });

// Login User

exports.loginUser = catchAsyncErrors( async(req, res, next)=>{
    const {email, password} = req.body;

    // checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password", 400))
    }

    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);
  
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    sendToken(user, 200, res);

});

//Logout User

exports.logout = catchAsyncErrors(async(req, res, next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:"Logged Out"
    });
});

// forgot Password

exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({
        validateBeforeSave:false
    })

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    const message = `Your password reset token is:- \n\n ${resetPasswordUrl} \n\n If you have not requested this Email then, please ignore it`
    try{
        await sendEmail({
            email: user.email,
            subject: "Gaming Ecommerce Password Recovery",
            message
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })
    }catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(err.message, 500));
    }
});

//reset password

exports.resetPassword = catchAsyncErrors(async(req, res, next)=>{
    //creating hash token
   const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

   const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt: Date.now()},
   });

   if(!user){
    return next(new ErrorHandler("Reset Password Token is invalid or has expired", 400));
   }

   if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler("Password doesn't match", 400));
   }

   user.password = req.body.password;
   user.resetPasswordToken = undefined;
   user.resetPasswordExpire = undefined;

   await user.save();
   sendToken(user, 200, res);

});


// get user details

exports.getUserDetails = catchAsyncErrors(async(req, res, next)=>{

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })

})

// Update password

exports.updatePassword = catchAsyncErrors(async(req, res, next)=>{

    const user = await User.findById(req.user.id).select("password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("password doesnot match",400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);

})

// update profile

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
  
    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
  
      const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });

// Get all users
exports.getAllUsers = catchAsyncErrors(async(req, res, next)=>{

    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
})

// Get all users
exports.getSingleUser = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`user does not exist with id: ${req.params.id}`));
    }

    res.status(200).json({
        success:true,
        user
    })
})


//Update user-Admin
exports.updateUserRole = catchAsyncErrors(async(req, res, next)=>{

    const userData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    };

    const user = await User.findByIdAndUpdate(req.params.id, userData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    if(!user){
        return next(new ErrorHandler(`User with id: ${req.prams.id} does not exist`));
    }

    res.status(200).json({
        success:true,
        user
    });

})

// Delete user-Admin
exports.deleteUser = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findByIdAndUpdate(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User with id: ${req.params.id} does not exist`));
    }

    await user.deleteOne();

    res.status(200).json({
        success:true,
        user
    });

})

