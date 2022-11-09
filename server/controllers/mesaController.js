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
class Contador{
  static mesa1 = 100;
  static m2 = 100;
  static m3 = 100;
  constructor(id){
    this._mesaRest1 = Contador.mesa1++;
    this._mesa2 = Contador.m2++; 
    this._mesa3 = Contador.m3++; 
    this.idRest = id;
  }
  get contadorMesas(){
    if(this.idRest == 2013)
    {
      return this._mesaRest1;
    }
    if(this.idRest == 1043)
    {
      return this._mesa2;
    }
    else{
      return this._mesa3;
    }

  }
}
module.exports.create = async (request, response, next) => {
  let mesa = request.body;
  let restauranteMesa = mesa.restauranteId;
  let codigo = "";
  let contador = new Contador(restauranteMesa);
  console.log(contador);
  if (restauranteMesa == 2043) {
    codigo = "FB1-"+ contador.contadorMesas;
  }
  if(restauranteMesa == 1043){
    codigo = "FB2-"+ contador.contadorMesas;
  }
  if(restauranteMesa == 4043 ){
    codigo = "FB3-"+contador.contadorMesas;
  }
  const newMesa = await prisma.mesa.create({
    data: {
      codigoMesa:codigo,
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