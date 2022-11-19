const { PrismaClient, Role } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  let listRoles = [];
  for (let element in Role) {
    switch (element) {
      case Role.Administrador:
        listRoles.unshift({
          ["id"]: element,
          ["nombre"]: "Administrador",
        });
        break;
      case Role.Cliente:
        listRoles.unshift({
          ["id"]: element,
          ["nombre"]: "Usuario",
        });
        break;
      default:
        listRoles.unshift({ ["id"]: Role.Administrador, ["nombre"]: "Usuario" });
        break;
    }
  }

  response.json(listRoles);
};
module.exports.getById = async (request, response, next) => {
  let id = request.params.id;
  let nombre = "";
  switch (Role[id]) {
    case Role.Administrador:
      nombre = "Administrador";
      break;
    case Role.Cliente:
      nombre = "Usuario";
      break;
    default:
      nombre = "Usuario";
      break;
  }
  let rol = { ["id"]: Role[id], ["nombre"]: nombre };
  response.json(rol);
};