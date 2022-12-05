const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const usuariosController=require("../controllers/usuariosController");
//Rutas de las mesas

router.get("/",usuariosController.get);

router.post("/",usuariosController.create);

router.get("/:id",usuariosController.getById);

router.put("/:id",usuariosController.update);

module.exports=router;