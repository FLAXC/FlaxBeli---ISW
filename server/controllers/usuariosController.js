const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const usuario=await prisma.usuario.findMany({
    orderBy:{
        id:'asc'
    }
  });
  response.json(usuario);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {

    let id=parseInt(request.params.id);
    const usuario=await prisma.usuario.findUnique({
        where:{ id:id}, include:{restaurante:true}
    });
    response.json(usuario);
};

//Crear un usuario
module.exports.create = async (request, response, next) => {
    let usuario = request.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(usuario.password, salt);
    const newUsuario = await prisma.usuario.create({
      data: {
        email: usuario.email,
        nombre: usuario.nombre,
        password: hash,
        role: usuario.role,
        restauranteId: usuario.restauranteId
      },
    });
    response.json(newUsuario);
  };

  //Actualizar un usuario
module.exports.update = async (request, response, next) => {
    let usuario = request.body;
    let idUsuario = parseInt(request.params.id);
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(usuario.password, salt);
    //Obtener usuario viejo
    const usuarioViejo = await prisma.usuario.findUnique({
      where: { id: idUsuario },
    });

    const newUsuario = await prisma.usuario.update({
      where: {
        id: idUsuario,
      },
      data: {
        email: usuario.email,
        nombre: usuario.nombre,
        password: hash,
        role: usuario.role,
        restauranteId: usuario.restauranteId
      },
    });
    response.json(newUsuario);
  };