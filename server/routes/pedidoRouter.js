const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const pedidoController=require("../controllers/pedidoController");
//Rutas de las mesas

router.get("/", pedidoController.get);

router.post("/", pedidoController.create); 

router.post("/pedidoCliente", pedidoController.createPedidoCliente); 

router.get("/vProductoTop/:mes",pedidoController.getVentaProductoTop);

router.get("/:id",pedidoController.getById);

router.get("/vProducto/:mes", pedidoController.getVentaProductoMes);



module.exports=router;