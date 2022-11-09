const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const mesaController=require("../controllers/mesaController");
//Rutas de las mesas

router.get("/",mesaController.get);

router.post("/",mesaController.create);

router.get("/:id",mesaController.getById);

router.put("/:id",mesaController.update);

module.exports=router;