// userController.js
const User = require('./../models/user');

const createUser = async (req, res) => {
  console.log(req);
  const { name } = req.body;

  try {
    // Validar que se proporciona el nombre
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const userData = { name };
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      res.status(201).json({ user: savedUser });
    } catch (error) {
      throw error;
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createUser,
};
