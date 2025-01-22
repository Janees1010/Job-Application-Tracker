const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  addUser,
  findUserByEmail,
  findUserById,
} = require("../services/userService");
require("dotenv").config();

const generateToken = async (userId) => {
  try {
    const token = await jwt.sign({ _id: userId }, process.env.SECRET_KEY, {
      expiresIn:"15hr",                 
    });
    return token;
  } catch (error) {
    throw new Error(`Error while generating token : ${error.message}`);
  }
};

const encryptPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Error while encrypting password : ${error.message}`);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json("missing credentials");
    const user = await findUserByEmail(email);                                     
    if (!user) return res.status(400).json("email is incorect");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = await generateToken(user._id);
    return res
      .status(200)
      .json({
        user: { _id: user._id, username: user.username, email, token },
        message: "successfully signed in",
      });
  } catch (error) {
    return res.status(500).json(error.message);   
  }
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    if (!username.length || !email || !password)
      return res.status(400).json("missing credentials");
    const user = await findUserByEmail(email);
    if (user) return res.status(400).json("email already exist");
    const hashedPassword = await encryptPassword(password);
    const response = await addUser({
      username,
      email,
      password: hashedPassword,
    });
    
    const token = await generateToken(response._id);
   
    
    return res
      .status(200)
      .json({
        user: { _id: response._id, username, email, token },
        message: "successfully created an account",
      });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  signin,
  signup,
};
