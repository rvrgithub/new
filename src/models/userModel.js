const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please Enter Your Name"],
      minLenght: [3, "Name should have atleast 3 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please Enter Your Last Name"],
      minLenght: [3, "Name should have atleast 3 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your password"],
      minLength: [8, "password should be grater than 8 charactars"],
      select: false, //if we find() method it show all data except passowrd...
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    blogs:[{
      type:mongoose.Types.ObjectId,
      ref:"Content",
      required:true
    }]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// there only plain function work not async

userSchema.pre("save", function (next) {
  // console.log(this.password);
  if (!this.isModified("password")) {
    next();
  }
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  return next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
