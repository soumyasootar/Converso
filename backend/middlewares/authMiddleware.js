const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      /* This code is decoding a JSON Web Token (JWT) using the `jsonwebtoken` library and verifying it
     using the `JWT_SECRET_KEY` environment variable. If the token is valid, it extracts the user ID
     from the token's payload and uses it to find the corresponding user in the database using
     `User.findById()`. The user object is then added to the `req` object as `req.user` and the
     middleware function calls `next()` to pass control to the next middleware function in the
     stack. */
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await User.findById(decoded.id).select("-password");
      /* `select("-password")` is a Mongoose method that is
      used to exclude the `password` field from the user
      object that is returned by the `User.findById()`
      method. This is done for security reasons, as the
      password should never be sent to the client in the
      response. */
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
