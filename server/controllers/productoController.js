const {  PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const producto = await prisma.producto.findMany({
    orderBy: {
      id: "asc",
    },
  });
  response.json(producto);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const producto = await prisma.producto.findUnique({
    where: {
      id: id,
    },
    include: {
      restaurantes : true,
    }
  });
  response.json(producto);
}; 

module.exports.create = async (request, response, next) => {
  let producto = request.body;
  const newProducto = await prisma.producto.create({
    data: {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      ingredientes: producto.ingredientes,
      precio:producto.precio,
      estado:producto.estado,
      categoria:producto.categoria,
      restaurantes:{
        connect: producto.restaurantes,
      },
    },
  });
  response.json(newProducto);
};

module.exports.update = async (request, response, next) => {
  let producto = request.body;
  let idProducto = parseInt(request.params.id);
  const productoViejo = await prisma.producto.findUnique({
    where: { id: idProducto },
  });

  const newProducto = await prisma.producto.update({
    where: {
      id: idProducto,
    },
    data: {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      ingredientes: producto.ingredientes,
      precio:producto.precio,
      estado:producto.estado,
      categoria:producto.categoria,
      restaurantes:{
        disconnect:productoViejo.restaurantes,
        connect: producto.restaurantes,
      },
    },
  });
  response.json(newProducto);
};