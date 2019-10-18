const router = require("express").Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const db = require("./authModel");
const authenticate = require("./authenticate-middleware");

router.post("/register", (req, res) => {
  // implement registration
  let newUser = req.body;

  if (!newUser.username || !newUser.password) {
    res
      .status(404)
      .json({ message: "Username and password are required for registration" });
  } else {
    const hash = bcrypt.hashSync(newUser.password, 8);
    newUser.password = hash;
    console.log(newUser);
    db.add(newUser)
      .then(user => {
        res.status(201).json(user);
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
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(404)
      .json({ message: "Username and password are required for login" });
  } else {
    db.findBy({ username })
      .first()
      .then(user => {
        req.session.username = username;

        if (username && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: "Login Successful" });
        } else {
          res.status(500).json({ errorMessage: "Error logging in to server" });
        }
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "Unexpected error logging in" });
      });
  }
});

// router.get("/users", authenticate, (req, res) => {
//   db.findAll()
//     .then(user => {
//       res.send(user);
//     })
//     .catch(error => {
//       res.status(500).json({ errorMessage: "Error getting credentials" });
//     });
// });

module.exports = router;
