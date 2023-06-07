const express = require("express");
const {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  userProfileCtrl,
  updateProfileCtrl,
  deleteUsersCtrl,
  fetchUserDetailsCtrl,
} = require("../../controllers/users/userCltr");

const authMiddleware = require("../../middlewares/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);

userRoutes.get("/", authMiddleware, fetchUsersCtrl);
userRoutes.get("/profile", authMiddleware, userProfileCtrl);
userRoutes.put("/update", authMiddleware, updateProfileCtrl);
userRoutes.delete("/:id", deleteUsersCtrl);
userRoutes.get("/:id", fetchUserDetailsCtrl);

module.exports = userRoutes;
