import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User, } from "../models/userSchema.js";
import ErrorHandeler from "../middlewares/error.js";
import jwt from "jsonwebtoken";

// AUTHRNTICATION
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandeler("user is not authenticated!", 400));
  }
  const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});

//Authorization
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `User with this role(${req.user.role}) not allowed to access this resource`
        )
      );
    }
    next();
  };
};
