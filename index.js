const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();
const users = require("./users/userRoute");
// const jwt = require("./middleware/auth");
// const errorHandler = require("./middleware/jwtError");
//
// server.use(jwt);
// server.use(errorHandler);
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use("/api", users);
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
