const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const usuariosController=require("../controllers/usuariosController");
//Rutas de las mesas

router.get("/",usuariosController.get);

router.post("/",usuariosController.create);

router.put("/:id",usuariosController.update);

router.get("/:id",usuariosController.getById);


module.exports=router;