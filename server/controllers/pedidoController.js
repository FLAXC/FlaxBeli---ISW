const {  PrismaClient, Prisma } = require("@prisma/client");
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
      fechaOrden: new Date(Date.now()),
      estado: infoPedido.estado,
      subtotal: infoPedido.subtotal,
      mesaId: infoPedido.mesaId,
      usuarioId: infoPedido.usuarioId,
      impuesto: infoPedido.impuesto,
      total: infoPedido.total,
      productos: { 
        createMany: {
          data: infoPedido.productos,
        },
      },
    },
  });
  const actualizaEstado = await prisma.Mesa.update({
    where: { id:newPedido.mesaId},
    data: {
      estadoMesa:"Desocupada"
    },
  });
  res.json(newPedido);
};

module.exports.createPedidoCliente = async (req, res, next) => {
  
  let infoPedido=req.body; 
   
  const newPedido = await prisma.pedido.create({
    data: {
      fechaOrden: new Date(Date.now()),
      estado: infoPedido.estado,
      subtotal: infoPedido.subtotal,
      mesaId: infoPedido.mesaId,
      usuarioId: infoPedido.usuarioId,
      impuesto: infoPedido.impuesto,
      total: infoPedido.total,
      productos: { 
        createMany: {
          data: infoPedido.productos,
        },
      },
    },
  });
  res.json(newPedido);
};

module.exports.getVentaProductoMes = async (request, response, next) => {
  let mes = parseInt(request.params.mes); 
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT v.nombre, SUM(ov.cantidad) as suma FROM pedido o, pedidoonproduto ov, producto v WHERE o.id=ov.pedidoId and ov.productoId=v.id AND MONTH(o.fechaOrden) = ${mes} GROUP BY ov.productoId`
  )
  //SELECT v.nombre, SUM(ov.cantidad) as suma FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id AND MONTH(o.fechaOrden) = 10 GROUP BY ov.videojuegoId
  response.json(result);
};
module.exports.getVentaProductoTop = async (request, response, next) => {
  let mes = parseInt(request.params.mes); 
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM pedido o, pedidoonproduto ov, producto v WHERE o.id=ov.pedidoId and ov.productoId=v.id AND MONTH(o.fechaOrden) = ${mes}   GROUP BY ov.productoId ORDER BY total DESC`
  )
  //SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id GROUP BY ov.videojuegoId ORDER BY total DESC;
  response.json(result);
};