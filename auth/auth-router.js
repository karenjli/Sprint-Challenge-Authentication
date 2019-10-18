const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("./authModel");

router.post("/register", (req, res) => {
  // implement registration
  let { username, password } = req.body;
  if (!username || !password) {
    res
      .status(404)
      .json({ message: "Username and password are required for registration" });
  } else {
    const hash = bcrypt.hashSync(password, 8);
    password = hash;

    db.add(newUser)
      .then(user => {
        res.send(user);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "Error registering new account on server" });
      });
  }
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
