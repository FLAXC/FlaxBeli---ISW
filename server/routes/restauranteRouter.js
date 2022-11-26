//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const restauranteController = require("../controllers/restauranteController");

//Definición de rutas para generos
router.get("/", restauranteController.get);

router.get("/:id", restauranteController.getById);

router.get("/restaurante/:id",restauranteController.getByIdRestaurante);

module.exports = router;