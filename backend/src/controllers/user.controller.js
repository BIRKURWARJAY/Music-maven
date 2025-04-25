import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"


const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
  secure: true,
  sameSite: "none"
}

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const createdUser = null;
  
  if ([username, email, password].some((field) => field?.trim() === "")) {
    return console.error("All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  });
  
  
  if (existedUser) {
    console.error("User already exists");
    res.status(409).json({
      message: "User already exists"
    });
  } else {
    const createdUser = await User.create({
      username,
      email,
      password
    });
    if (!createdUser) {
      console.error("Error creating user")
      res.status(500).json({
        message: "Error Creating user"
      });
    } else {
      console.log("User created successfully");
      res
      .status(200)
      .cookie("user", createdUser._id, cookieOptions)  
      .json({
        message: "user created successfully",
        success: true
      })      
    }
  }


});



const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;


  const existedUser = await User.findOne({ email });
  

  if (existedUser) {
    if (await existedUser.isPasswordCorrect(password)) {
      console.log("User logged in successfully");
      res
      .status(200)
      .cookie("user", existedUser._id, cookieOptions)
      .json({
        message: "User logged in successfully", 
        success: true
      })
    } else {
      console.error("Invalid password");
      res.status(401).json({
        message: "Invalid password"
      })
    }
  } else {
    console.error("User does not exist");
    res.status(404).json({
      message: "User does not exist" 
    })
  }

})


const logoutUser = asyncHandler(async (req, res) => {
  res
  .status(200)
  .clearCookie("user")
  .json({
    message: "User logged out successfully",
    success: true
  })
    .then(
      console.log("user Logged Out Successfully")      
  )
})


const updateUser = asyncHandler(async (req, res) => {

})

export { registerUser, loginUser, logoutUser, updateUser };