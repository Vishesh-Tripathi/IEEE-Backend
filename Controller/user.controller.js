import { user } from "../Models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadCloudinary from "../utils/cloudinary.js";
const generateToken = async(userId)=>{
    try {
        const User = await user.findById(userId);
        const accessToken = User.generateAccessToken();
        const refreshToken =User.generateRefreshToken();
        // saving in DB
        User.refreshToken = refreshToken;
        await User.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
      } catch (error) {
        throw new ApiError(500, "Something went wrong in genertaing Token");
      }

}

const registerUser = asyncHandler(async(req,res)=>{
    const {fullName,email,password} = req.body;
    // console.log(fullName)
    if(!fullName || !email || !password){
       
        throw new ApiError(409,"All fields are required")
    }

    const checkExistingUser = await user.findOne({email});
    if(checkExistingUser){
        throw new ApiError(409,"User already exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    if(avatarLocalPath){
        const avatar = await uploadCloudinary(avatarLocalPath);
        if(!avatar){
            throw new ApiError(500,"Avatr upload failed")
        }
    }

    const User = await user.create({
        fullName,
        password,
        email,
    })

    const checkUser = await user.findById(User._id).select("-password");
    console.log(User._id)
    if(!checkUser){
        throw new ApiError(500,"Error in creating user")
    }
    return res.status(201).json( new ApiResponse(201,"User created successfully",checkUser))
});
const Login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    console.log(email)
    if(!email || !password){
        throw new ApiError(409,"All fields are required")
    }
    const userToLogin = await user.findOne({email});
    if(!userToLogin){
        throw new ApiError(404,"User not found")
    }
    const checkPassword = async(password)=>{
        return await bcrypt.compare(password, userToLogin.password)
    }
    if(!checkPassword){
        throw new ApiError(401,"Invalid credentials")
    }
    //generate access token
    const {accessToken,refreshToken} = await generateToken(userToLogin._id);
    // localStorage.setItem('accessToken', accessToken);

    // removing unwanted infor from res
  const loggedUser = await user.findById(userToLogin._id).select(
    " -password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options) // aap.js me cookieParser as a middleWare pass kiya h isliye req.cookie aur res.cookie kr pa rhe h
    .json(
      new ApiResponse(
        200,
        {
          user: loggedUser,
          accessToken,
          refreshToken,
        },
        "user logged in successfully"
      )
    );
})

export {
    registerUser,
    Login,
   
  };