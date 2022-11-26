const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Role } = require("@prisma/client");
const jwt = require("jsonwebtoken");
//--npm install bcrypt
const bcrypt = require("bcrypt");

//Crear nuevo usuario
module.exports.register = async (request, response, next) => {
  const userData = request.body;

  //Salt es una cadena aleatoria.
  //"salt round" factor de costo controla cuánto tiempo se necesita para calcular un solo hash de BCrypt
  // salt es un valor aleatorio y debe ser diferente para cada cálculo, por lo que el resultado casi nunca debe ser el mismo, incluso para contraseñas iguales
  let salt = bcrypt.genSaltSync(10);
  // Hash password
  let hash = bcrypt.hashSync(userData.password, salt);
  const user = await prisma.usuario.create({
    data: {
      email: userData.email,
      nombre: userData.nombre,
      role: Role[userData.role],
      password: hash,
      restauranteId: userData.restauranteId,
    },
  });
  response.status(200).json({
    status: true,
    message: "Usuario creado",
    data: user,
  });
};
module.exports.login = async (request, response, next) => {
  let userReq = request.body;
  //Buscar el usuario según el email dado
  const user = await prisma.usuario.findUnique({
    where: {
      email: userReq.email,
    },
  });
  //Sino lo encuentra según su email
  if (!user) {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
    });
  }
  //Verifica la contraseña
  const checkPassword = bcrypt.compare(userReq.password, user.password);
  if (checkPassword) {
    //Si el usuario es correcto: email y password
    //Crear el token
    const payload = {
      email: user.email,
      role: user.role,
    };
 
    //Crea el token con el payload, llave secreta
    // y el tiempo de expiración
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE, 
    });
    response.json({
      success: true,
      message: "Usuario registrado",
      data: {
        user,
        token,
      },
    });
  } else {
    response.status(401).send({
      success: false,
      message: "Password incorrecto",
    });
  }
};