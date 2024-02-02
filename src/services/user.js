// services/userService.js
const User = require('../models/user');

const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
};
