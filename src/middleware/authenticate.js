require("dotenv").config();
const jwt = require("jsonwebtoken");
// verification of token......
const verifyToken = (token) => {
  // console.log("token", token);
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      // if get any err then it rejected....
      if (err) return reject(err);

      return resolve(decoded);
    });
  });
};

const authenticate = async (req, res, next) => {
  // if token is not present.....
  if (!req.headers.authorization)
    return res
      .status(400)
      .send({ message: "Authorization token are not found or is incorrect" });
  if (!req.headers.authorization.startsWith("Bearer "))
    return res
      .status(400)
      .send({ message: "Authorization token not found or incorrect" });
  // if there is token
  const token = req.headers.authorization.trim().split(" ")[1];

  let decoded;
  try {
    decoded = await verifyToken(token);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Authorization token not found or incorrect" });
  }

  // console.log("decoded", decoded);
  // ading  users  id.......
  req.userID = decoded.user._id;

  return next();
};

module.exports = authenticate;
