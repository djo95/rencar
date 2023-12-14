const express = require("express");
const {
  signUpValidator,
  validation,
  signInValidator,
} = require("../Middlewares/Validator");
const {
  SignUp,
  SignIn,
  deleteUser,
  updateUser,
  getOneUser,
  readUsers,
  addNewUser,
} = require("../Controllers/ControllerUser");
const { isAuth } = require("../Middlewares/isAauth");

const userRouter = express.Router();

userRouter.post("/SignUp", signUpValidator, validation, SignUp);

userRouter.post("/SignIn", signInValidator, validation, SignIn);

userRouter.get("/getCurrentUser", isAuth, (req, res) => res.send(req.user));

userRouter.delete("/deleteUser/:id", deleteUser);

userRouter.put("/updateUser/:id", updateUser);

userRouter.get("/getOneUser/:id", getOneUser);

userRouter.get("/getUsers", readUsers);
userRouter.post("/addUser", addNewUser);

module.exports = userRouter;
