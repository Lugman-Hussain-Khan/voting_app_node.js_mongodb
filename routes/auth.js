const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Sign-Up Route Handler
router.post('/signup', async (req, res) => {
  
  const { name, email, password } = req.body;
  
  //Check all fields are filled
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  };
  //Check new email
  const reSignUp = await User.findOne({ email });
  if (reSignUp)
    return res.status(400).json({ error: "Email already exists!" });
  
  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.json({ message: `New user created with Id ${user._id}` });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//Sign-In Route Handler
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  //Check all fields are filled
  if (!email || !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  };

  //Check Email registered
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });
  
  //Check Password
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) return res.status(400).json({ error: "Invalid Email or Password" });
  
  //Create Auth Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  //Send Response
  res.json({
    message: `User Id: ${user._id} Signed-In`,
    auth_token: `JWT : ${token}`
  });

})
  

module.exports = router;