const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const productoController=require("../controllers/productoController");
//Rutas de las mesas

router.get("/",productoController.get);

router.post("/",productoController.create);

router.get("/:id",productoController.getById);

router.put("/:id",productoController.update);

router.get("/producto/:id",productoController.getByIdRes);

module.exports=router;