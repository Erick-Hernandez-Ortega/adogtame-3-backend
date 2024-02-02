const userService = require('../services/user');

const createUser = async (req, res) => {
    console.log(req);
  const { name } = req.body;

  try {
    // Validar que se proporciona el nombre
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const userData = { name };
    const newUser = await userService.createUser(userData);

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createUser,
};
