const User = require("../models/userModel");
// const bcrypt = require("bcryptjs")
// for get the token ... by jsonwebtoken..
var jwt = require("jsonwebtoken");
require("dotenv").config();
const gererateToken = (user) => {
  // console.log(process.env.JWT_SECRET_KEY);
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);

  // return jwt.sign({user},"hellokjdfh"); //solt//
};
//........................ registration part .........................//
exports.registerUser = async (req, res) => {
  // console.log("res", res);
  try {
    // check email is alreay exist or not?....
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      // if is present
      return res.status(404).send({ message: "Email is already Exist" });
    }
    // create new user ...
    const { firstName, lastName, email, password } = req.body;
    // console.log("name",res.body)
    user = await User.create({
      firstName,
      lastName,
      email,
      password,
      avatar: {
        public_id: "This is a sample id",
        url: "profilePicUrl",
      },
      blogs:[]
    });

    const token = gererateToken(user);
    return res.status(201).send({ user, token });
  } catch (err) {
    res.status(404).send({ messag: err.message });
  }
};

// .....................login section..........................//
exports.loginUser = async (req, res) => {
  console.log("res", res);
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    // check if mail exists
    if (!user) {
      return res.status(404).send("Wrong Email or Password");
    }
    //    if exist and check password
    const match = user.checkPassword(req.body.password);
    if (!match) {
      return res.status(404).send({ message: "Wrong Email or Password" });
    }
    // if it match
    const token = gererateToken(user);
    return res.status(201).send({ user, token });
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};

// get all userData ... for admin
exports.getAllUser = async(req,res)=>{
  try {
    const user = await User.find().lean().exec();
    res.status(201).send({
      success: true,
      user,
    });
    // console.log("user", user);
  } catch (err) {
    await res.status(404).send({ message: "Route is working fine" });
  }
}
