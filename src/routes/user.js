const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/register", (req, res) => {
    userController.registerUser(req, res);
})

router.post("/authenticate", (req, res) => {
    userController.authenticateUser(req, res);
});

module.exports = router;