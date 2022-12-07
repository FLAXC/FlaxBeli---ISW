const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const restaurantes = await prisma.restaurante.findMany({
    orderBy: {
      nombre: "asc",
    },
  });
  response.json(restaurantes);
};
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const restaurante = await prisma.restaurante.findUnique({
    where: {
      id: id,
    }
  });
  response.json(restaurante);
};

module.exports.getByIdRestaurante = async (request, response, next) => {

  let id=parseInt(request.params.id);
  const restaurante=await prisma.restaurante.findUnique({
      where:{ id:id},
       include: {
          productos: {where:{estado : 'Habilitado'}}, 
       }
  });
  response.json(restaurante);
};
