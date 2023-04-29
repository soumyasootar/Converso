const { default: mongoose, Mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

//Method defined in userModel Schema to Check the encrypted password match
userModel.methods.matchPass= async function(enteredpassword){
  return await bcrypt.compare(enteredpassword,this.password)
}

// this will run before saving data into the MongoDB 
userModel.pre("save", async function (next) {
  //check if the data is been modified or not 
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userModel);

module.exports = User;
