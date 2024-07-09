const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Originalpassword, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json("Wrong username or password");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.status(401).json("Wrong username or password");
    }

    // jwt
    // const accesstoken = jwt.sign({
    //   id: user._id, isAdmin: user.isAdmin
    // }, process.env.JWT_SEC, { expiresIn: "3d" });

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;