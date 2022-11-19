const {  PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const predidos = await prisma.pedido.findMany({
    orderBy: {
      fechaOrden: "asc",
    },
  });
  response.json(predidos);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const pedido = await prisma.pedido.findUnique({
    where: {
      id: id,
    },
    include: {
      productos : {
        select: {
          producto: true,
          cantidad: true,
        }
      },
      usuario: true,
      mesa: true,
    }, 
  });
  response.json(pedido);
};


//Método para crear ordenes
module.exports.create = async (req, res, next) => {
  
  let infoPedido=req.body; 
   
  const newPedido = await prisma.pedido.create({
    data: {
      fechaOrden: infoPedido.fechaPedido,
      //Actualizar cuando este autenticacion
      usuario:{ 
        connect:{id:1}
      },
      productos: { 
        createMany: {
          //{ productoId:1, cantidad:1}
          data: infoPedido.productos,
        },
      },
    },
  });
  res.json(newPedido);
};