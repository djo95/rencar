const User = require("../Models/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var generator = require("generate-password");

/* Sign UP user */

exports.SignUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const found = await User.findOne({ email });
    console.log(found);

    if (found) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Email already exists" }] });
    }

    const newUser = new User({ ...req.body, role: "client" });

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    newUser.password = hashedPassword;

    const payload = { id: newUser._id };
    console.log(process.env.JWT_KEY);
    var token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" });
    console.log(token);
    await newUser.save();

    res.status(200).send({ msg: "User added", newUser, token });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "Could not SignUp" }] });
  }
};

/* Sign in user */

exports.SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const found = await User.findOne({ email });

    if (!found) {
      return res.status(400).send({ errors: [{ msg: "Email invalid" }] });
    }

    const matched = bcrypt.compareSync(password, found.password);

    if (!matched) {
      return res.status(400).send({ errors: [{ msg: "Wrong password" }] });
    }

    const payload = { id: found._id };
    var token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" });

    res.status(200).send({ msg: "Sign IN", found, token });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "Could not signIn" }] });
  }
};

/* Delete user */

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(200).send({ Msg: "User deleted" });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "Could not delete contact" }] });
  }
};

/* Update user */

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndUpdate(id, { $set: req.body });

    res.status(200).send({ Msg: "User updated" });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "Could not update user" }] });
  }
};

/* Read one user */

exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const oneUser = await User.findById(id);

    res.status(200).send({ Msg: "Users", oneUser });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "Could not read user" }] });
  }
};

/* Read all users*/

exports.readUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).send({ Msg: "All users List", users });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "Could not read users list" }] });
  }
};

exports.addNewUser = async (req, res) => {
  try {
    const { email } = req.body;

    const found = await User.findOne({ email });
    if (found) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Email already exists" }] });
    }

    const password = generator.generate({
      length: 10,
      numbers: true,
    });

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      role: "client",
    });

    await newUser.save();
    res.status(200).send({ msg: "User added", newUser });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "Could not read users list" }] });
  }
};
