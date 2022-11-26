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
      case Role.Empleado:
        listRoles.unshift({
          ["id"]: element,
          ["nombre"]: "Empleado",
        });
        break;
        case Role.Cliente:
          listRoles.unshift({
            ["id"]: element,
            ["nombre"]: "Cliente",
          });
          break;
    }
  }
  console.log(listRoles);
  response.json(listRoles);
};
module.exports.getById = async (request, response, next) => {
  let id = request.params.id;
  let nombre = "";
  switch (Role[id]) {
    case Role.Administrador:
      nombre = "Administrador";
      break;
    case Role.Empleado:
      nombre = "Empleado";
      break;
    default:
      nombre = "Usuario";
      break;
  }
  let rol = { ["id"]: Role[id], ["nombre"]: nombre };
  console.log(rol);
  response.json(rol);
};