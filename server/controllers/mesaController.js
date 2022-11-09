const {  PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const mesas = await prisma.mesa.findMany({
    include: {
      restaurante : true,
    },
    orderBy: {
      id: "asc",
    },
  });
  response.json(mesas);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const mesa = await prisma.mesa.findUnique({
    where: {
      id: id,
    },
    include: {
      restaurante : true,
    },
  });
  response.json(mesa);
};

module.exports.create = async (request, response, next) => {
  let mesa = request.body;
  const newMesa = await prisma.mesa.create({
    data: {
      codigoMesa: mesa.codigoMesa,
      capacidad: parseInt(mesa.capacidad),
      estadoMesa: mesa.estadoMesa,

      restauranteId:mesa.restauranteId,
    },
  });
  response.json(newMesa);
};

module.exports.update = async (request, response, next) => {
  let mesa = request.body;
  let idMesa = parseInt(request.params.id);
  const mesaVieja = await prisma.mesa.findUnique({
    where: { id: idMesa },
  });

  const newMesa = await prisma.mesa.update({
    where: {
      id: idMesa,
    },
    data: {
      codigoMesa: mesa.codigoMesa,
      capacidad: parseInt(mesa.capacidad),
      estodoMesa: mesa.estodoMesa,

      restauranteId: mesa.restauranteId
    },
  });
  response.json(newMesa);
};