//Express para agregar las rutas
const express = require("express");
const router = express.Router();


//Usuario controller para los métodos definidos
const userController = require("../controllers/userController");

router.post("/login", userController.login);

router.post("/registrar", userController.register);

module.exports = router;