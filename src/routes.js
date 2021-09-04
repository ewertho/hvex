const express = require("express");
const route = express.Router();

const UserController = require("./controller/UserController");

route.post("/create", UserController.insert);
route.post("/read", UserController.read);
route.post("/update", UserController.update);
route.post("/delete", UserController.destroy);

module.exports = route;
