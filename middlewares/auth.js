import { expressjwt } from "express-jwt";

export const isAuthenticated = expressjwt ({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});

export const isAuthorized = (role) => {
    return async (req, res, next) => {
      const user = await UserModel.findById(req.auth.id);
      if (role?.includes (user.role)) {
        next();
      }else{
        res.status(403).json("You are unauthorized!")
      }
    }
  };