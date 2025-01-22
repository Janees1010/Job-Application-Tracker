const User = require("../model/userModel");

const addUser = async (user) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    throw new Error(`Error adding new user : ${error.message}`);
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error(`Error finding  user by email : ${error.message}`); 
  }
};

const findUserById = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (error) {
    throw new Error(`Error finding  user by id : ${error.message}`);
  }
};

module.exports = {
  findUserByEmail,
  findUserById,
  addUser,
};
