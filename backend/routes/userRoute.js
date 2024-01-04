const express = require("express");
const router = express.Router();
const { registerUser, resetPassword, login, deleteUser, users, singleUser } = require("../controller/userController");

router.get("/user/:email", singleUser)
router.get("/users", users);
router.post("/register", registerUser);
router.post("/login", login);
router.patch("/reset", resetPassword);
router.delete("/remove", deleteUser);

module.exports = router;
