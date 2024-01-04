const User = require("../model/userModel");
const { hashPassword, validatePassword } = require("../utils/password");


const users = async (req, res, next) => {
  try {
    const userList = await User.find().select('-password')
    res.json({userList})
  } catch (error) {
    next(error)
  }
}

const singleUser = async (req, res, next) => {
  try {
    const {email} = req.params;
    if(!email){
      res.status(400)
      throw new Error("email as params are required")
    }
    const user = await User.findOne({email}).select('-password')
    res.json({user})
  } catch (error) {
    next(error)
  }
}

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(409);
      throw new Error("email already exist");
    }
    const hashPass = await hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashPass,
    });
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide email and password");
    }
    const user = await User.findOne({ email });
    if (!user || !(await validatePassword(password, user.password))) {
      res.status(400);
      throw new Error("Invalid username or password");
    }
    res.json({
      login: true,
      message: "user logged in succesfully",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error("User not registred");
    }
    if (!oldPassword || !newPassword) {
      res.status(400);
      throw new Error("Please add old and new password");
    }
    if (!(await validatePassword(oldPassword, user.password))) {
      res.status(401);
      throw new Error("Password did not matched...");
    }
    user.password = await hashPassword(newPassword);
    await user.save();
    res.json({ message: "Password reset sucessfull" });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide email and password");
    }
    const user = await User.findOne({ email });
    if (!user || !(await validatePassword(password, user.password))) {
      res.status(400);
      throw new Error("Invalid username or password");
    }
    const deletedUser = await User.deleteOne({email})
    res.json({
      ...deletedUser,
      delete: true,
      message: "user deleted succesfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerUser,
  resetPassword,
  login,
  deleteUser,
  users,
  singleUser
};
