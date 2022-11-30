const {  PrismaClient, EstadoMesa } = require("@prisma/client");
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

module.exports.getByRestaurante = async (request, response, next) => {
  
  
  let id=parseInt(request.params.id);
  
  const mesa=await prisma.mesa.findMany({
      where:{ restauranteId:id,},
  });
  response.json(mesa);
}; 

 class Contador{
  static m11 = 100;
  static me22 = 200;
  static me33 = 300;
  constructor(id){
    this._mesa11 = Contador.m11++;
    this._mesa22 = Contador.me22++; 
    this._mesa33 = Contador.me33++; 
    this.idRest = id;
  }

    get  contadorMesas(){
    if(this.idRest == 2043)
    {
      return this._mesa11;
    }
    if(this.idRest == 1043)
    {
      return this._mesa22;
    }
    else{
      return this._mesa33;
    }

  }
}

module.exports.create = async (request, response, next) => {
  let mesa = request.body;
  let restauranteMesa = mesa.restauranteId;
  let codigo = "";
  let  contador = new Contador(restauranteMesa);
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
      restauranteId: mesa.restauranteId,
    },
  });
  response.json(newMesa);
};

module.exports.update = async (request, response, next) => {
  let mesa = request.body;
  let idMesa = parseInt(request.params.id);
  let restauranteMesa = mesa.restauranteId;
  let codigo = "";
  let  contador = new Contador(restauranteMesa);
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
  const newMesa = await prisma.mesa.update({
    where: {
      id: idMesa,
    },
    data: {
      codigoMesa: codigo,
      capacidad: parseInt(mesa.capacidad),
      estadoMesa: mesa.estadoMesa,
      restauranteId: mesa.restauranteId,
    },
  });
  response.json(newMesa);
};