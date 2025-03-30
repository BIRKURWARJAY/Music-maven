import { asyncHandler } from "../utils/asyncHandler.js"
import { User, isPasswordCorrect } from "../models/user.model.js"


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
      res.status(200).json({
        message: "user created successfully"
      })
    }
  }


});



const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if([email, password].some((field) => field?.trim() === "")) {
    return console.error("All fields are required");
  }


  const existedUser = await User.findOne({ email });

  const isPasswordCorrect = await existedUser?.isPasswordCorrect(password);

  if (existedUser) {
    if (isPasswordCorrect) {
      console.log("User logged in successfully");
      res.status(200).json({
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


export { registerUser, loginUser };