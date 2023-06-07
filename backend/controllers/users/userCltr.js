// const expressAsyncHandler = require("express-async-handler");
// const User = require("../../models/user");
// const generateToken = require("../../middlewares/generateToken");

// //Register
// const registerUser = expressAsyncHandler(async (req, res) => {
//   const { email, firstname, lastname, password } = req?.body;

//   const userExists = await User.findOne({ email });

//   if (userExists) throw new Error("User Already Exists");
//   try {
//     //check if user exists

//     const user = await User.create({ email, firstname, lastname, password });
//     res.status(200).json(user);
//   } catch (error) {
//     res.json(error);
//   }
// });

// //fetch all users

// const fetchUsersCltrl = expressAsyncHandler(async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.json(users);
//   } catch (error) {
//     res.json(error);
//   }
// });

// //login User
// const loginUserCtrl = expressAsyncHandler(async (req, res) => {
//   const { email, password } = req?.body;

//   //find user in db
//   const userFound = await User.findOne({ email });

//   //check if user password match
//   if (userFound && (await userFound?.isPasswordMatch(password))) {
//     res.json({
//       _id: userFound?._id,
//       firstName: userFound?.firstname,
//       lastName: userFound?.lastname,
//       email: userFound?.email,
//       isAdmin: userFound?.isAdmin,
//       token: generateToken(userFound?._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid Login Credentials");
//   }
// });

// module.exports = { registerUser, fetchUsersCltrl, loginUserCtrl };

const expressAsyncHandler = require("express-async-handler");
const User = require("../../models/user");

const generateToken = require("../../middlewares/generateToken");

const validateMongodbId = require("../../utils/validateMongodbID.js");

//-------------------------------------
//Register
//-------------------------------------

const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  //Check if user Exist
  const userExists = await User.findOne({ email: req?.body?.email });

  if (userExists) throw new Error("User already exists");
  try {
    //Register user
    const user = await User.create({
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

// //-------------------------------
// //Login user
// //-------------------------------

const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if user exists
  const userFound = await User.findOne({ email });
  //Check if password is match
  if (userFound && (await userFound?.isPasswordMatch(password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstname,
      lastName: userFound?.lastname,
      email: userFound?.email,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Login Credentials");
  }
});

//------------------------------
//Users
//-------------------------------
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  console.log("User ");
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
//Delete user
//------------------------------
const deleteUsersCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user id is valid
  validateMongodbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
});

//----------------
//user details
//----------------
const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user id is valid
  validateMongodbId(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
//Update password
//------------------------------

const updateUserPasswordCtrl = expressAsyncHandler(async (req, res) => {
  //destructure the login user
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  //Find the user by _id
  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.json(user);
  }
});

//------------------------------
//User profile
//------------------------------

const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;

  try {
    const myProfile = await User.findById(_id).populate(["expenses", "income"]);

    res.json(myProfile);
  } catch (error) {
    res.json(error);
  }
});

//Update User PRofile
const updateProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  validateMongodbId(_id);
  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      email: req?.body?.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
});

module.exports = {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  deleteUsersCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateProfileCtrl,
  updateUserPasswordCtrl,
};
