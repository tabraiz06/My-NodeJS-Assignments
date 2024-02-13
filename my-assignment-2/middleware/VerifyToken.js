const jwt = require("jsonwebtoken");
const secratekey = process.env.SECRATE_KEY || DEF;

const VerifyToken = (req, res, next) => {
  try {
    const Token = req.header("Token");
    if (!Token) {
      res.status(400).json({
        mgs: " Please provide a Token",
      });
    } else {
      const data = jwt.verify(Token, secratekey);
      req.user = data.user;
      next();
    }
  } catch (error) {
    res.status(400).json({
      mgs: "Please provide a valid Token",
    });
  }
};
module.exports = VerifyToken;
