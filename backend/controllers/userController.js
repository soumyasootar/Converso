const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const generateToken = require("../configs/generateToken");

module.exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please Enter Name");
  }
  if (!email) {
    res.status(400);
    throw new Error("Please Enter Email");
  }
  if (!password) {
    res.status(400);
    throw new Error("Please Enter Password");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("This User Exists Try Logging in");
  }

  const newUser = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      pic: newUser.pic,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed To Create User");
  }
});

module.exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please Enter Email");
  }
  if (!password) {
    res.status(400);
    throw new Error("Please Enter Password");
  }

  const userExists = await User.findOne({ email });
  console.log("userExists: ", userExists);

  if (!userExists) {
    res.status(400);
    throw new Error("This User Doesnt Exist Try Registering User");
  } else if (userExists && (await userExists.matchPass(password))) {
    res.status(201).json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      pic: userExists.pic,
      token: generateToken(userExists._id),
    });
  } else {
    res.status(400);
    throw new Error("This user exists, but password does not Match");
  }
});

/* This code is creating a `keyword` object that will be used to search for users in the database based
on a search query. */
module.exports.allUsers= asyncHandler(async(req,res)=>{
  const keyword = req.query.search ? {
    $or :[
      {name:{$regex:req.query.search,$options:"i"}},
      {email:{$regex:req.query.search,$options:"i"}}
    ]
  } :{}

  /* `const user =await User.find(keyword).find({_id:{:req.user._id}})` is a code that searches for
  users in the database based on a search query and excludes the currently logged-in user. */
  const users =await User.find(keyword).find({_id:{$ne:req.user._id}})
  res.send(users)
})

// module.exports = {registerUser , authUser};
