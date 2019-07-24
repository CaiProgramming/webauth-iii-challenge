const express = require("express");
const router = express.Router();
const Users = require("./usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
router.get("/", async (req, res) => {
  res.send("ITS A LIVVE ELFEIOFSKIDF");
});
router.get("/user/", checkToken, async (req, res) => {
  await Users.findAll()
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
});
router.get("/user/:id", async (req, res) => {
  await Users.find(req.params.id)
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
});
router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  console.log(password);
  await Users.findBy({ username })
    .then(user => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => {
      return res.status(500).json("DUNNO MAN");
    });
});
router.post("/register", async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  let user = {
    username: req.body.username,
    password: hash,
    department: req.body.department
  };
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
module.exports = router;

function checkToken(req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.decoded = decoded;
        console.log(decoded);
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied"
    });
  }
}
