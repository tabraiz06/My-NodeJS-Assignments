const express = require("express");
const User = require("../Models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Router = express.Router();
const secratekey = process.env.SECRATE_KEY || DEF;

Router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({
        mgs: "Email all ready Register",
      });
    } else {
      console.log(secratekey);
      const securePassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: securePassword,
      });
      const data = { user: newUser.id };
      const Auth_Token = jwt.sign(data, secratekey);
      res.status(200).json({
        mgs: "Registration succesfull ",
        Auth_Token,
      });
    }
  } catch (error) {
    res.status(400).json({
      mgs: "Registration failed",
    });
  }
});

Router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      res.status(400).json({
        mgs: "invalid login",
      });
    } else {
      const comparePassword = await bcrypt.compare(
        password,
        userExist.password
      );
      if (!comparePassword) {
        res.status(400).json({
          mgs: "invalid password",
        });
      } else {
        const data = { user: userExist.id };
        const AuthToken = jwt.sign(data, secratekey);
        res.status(200).json({
          mgs: "Login successfull",
          AuthToken,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      mgs: "Login failed",
    });
  }
});

Router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = Router;
