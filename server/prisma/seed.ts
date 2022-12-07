import { Categoria, Estado, EstadoComanda, EstadoMesa, PrismaClient } from '@prisma/client';
// import { facturas } from './seeds/facturas';
import { restaurantes } from './seeds/restaurantes';
// import { usuarios } from './seeds/usuarios';
const prisma = new PrismaClient();

async function mail() {
    //Restaurante
    await prisma.restaurante.createMany({
        data: restaurantes
    });

    // await prisma.usuario.createMany({
    //     data: usuarios
    // });

    // await prisma.factura.createMany({
    //     data: facturas
    // });

    await prisma.mesa.create({
        data: {
            codigoMesa: 'FB1-100',
            capacidad: 4, 
            estadoMesa: EstadoMesa.Desocupada,
            restaurante: {
                connect:  {id:2043 } 
            }
        }
    });
    await prisma.mesa.create({
        data: {
            codigoMesa: 'FB2-100',
            capacidad: 2,
            estadoMesa: EstadoMesa.Ocupada,
            restaurante: {
                connect:  {id:1043} 
            }
        }
    });

    await prisma.mesa.create({
        data: {
            codigoMesa: 'FB3-100',
            capacidad: 5,
            estadoMesa: EstadoMesa.Reservada,
            restaurante: {
                connect:  {id:4043} 
            }
        }
    });

    await prisma.mesa.create({
        data: {
            codigoMesa: 'FB2-200',
            capacidad: 2,
            estadoMesa: EstadoMesa.Inactiva,
            restaurante: {
                connect:  {id:1043} 
            }
        }
    });

    await prisma.mesa.create({
        data: {
            codigoMesa: 'FB1-200',
            capacidad: 4,
            estadoMesa: EstadoMesa.PorPagar,
            restaurante: {
                connect:  {id:2043} 
            }
        }
    });

    await prisma.mesa.create({
        data: {
            codigoMesa: 'FB1-300',
            capacidad: 2,
            estadoMesa: EstadoMesa.Desocupada,
            restaurante: {
                connect:  {id:2043} 
            }
        }
    });

    await prisma.mesa.create({
        data: {
            codigoMesa: 'FB3-200',
            capacidad: 6,
            estadoMesa: EstadoMesa.Ocupada,
            restaurante: {
                connect:  {id:4043} 
            }
        }
    });

    await prisma.mesa.create({
        data: {
            codigoMesa: 'FB2-300',
            capacidad: 2,
            estadoMesa: EstadoMesa.Inactiva,
            restaurante: {
                connect:  {id:1043} 
            }
        }
    });

    await prisma.mesa.create({
        data: {
            codigoMesa: 'FB2-400',
            capacidad: 2,
            estadoMesa: EstadoMesa.Reservada,
            restaurante: {
                connect:  {id:1043} 
            }
        }
    });

    //Productos
    // await prisma.producto.create({
    //     data: {
    //         nombre: 'Hamburguesa',
    //         descripcion: 'Hamburguesa con papas',
    //         ingredientes: 'Pan, tomate, torta de carne, lechuga, queso',
    //         precio:2900,
    //         estado: Estado.Habilitado,
    //         categoria: Categoria.ComidasRapidas,
    //         restaurantes:{
    //             connect : [{id:2043}, {id:4043}]
    //         }
    //     }
    // });

    // await prisma.producto.create({
    //     data: {
    //         nombre: 'Pizza',
    //         descripcion: 'Pizza Tradicional',
    //         ingredientes: 'Pasta de pizza, tomate, queso, peperoni, hongos, salsa para pizza',
    //         precio:2900,
    //         estado: Estado.Habilitado,
    //         categoria: Categoria.ComidasRapidas,
    //         restaurantes:{
    //             connect : [{id:4043}]
    //         }
    //     }
    // });

    // //
    // await prisma.pedido.create(
    //     {
    //         data: {
    //             estado: EstadoComanda.Registrada,
    //             notas: 'Sin queso',
    //             usuarioId: 1,
    //             facturaId: 1,
    //             mesaId:2,
    //             productos: {
    //                 createMany:{
    //                     data:[
    //                         {cantidad:2, productoId:1},
    //                         {cantidad:1, productoId:2}
    //                     ]
    //                 }
    //             },
    //             subtotal: 5500,
    //         }
    //     }
    // );

    // await prisma.pedido.create(
    //     {
    //         data: {
    //             estado: EstadoComanda.Pendientes,
    //             notas: 'Sin tomate',
    //             usuarioId: 1,
    //             facturaId: 1,
    //             mesaId:3,
    //             productos: {
    //                 createMany:{
    //                     data:[
    //                         {cantidad:2, productoId:1},
    //                         {cantidad:1, productoId:2}
    //                     ]
    //                 }
    //             },
    //             subtotal: 5500,
    //         }
    //     }
    // );

    // await prisma.pedido.create(
    //     {
    //         data: {
    //             estado: EstadoComanda.Registrada,
    //             notas: 'sin lechuga',
    //             usuarioId: 1,
    //             facturaId: 1,
    //             mesaId:3,
    //             productos: {
    //                 createMany:{
    //                     data:[
    //                         {cantidad:2, productoId:1},
    //                         {cantidad:1, productoId:2}
    //                     ]
    //                 }
    //             },
    //             subtotal: 5500,
    //         }
    //     }
    // );
}
mail()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async e => {
    console.error(e);
    await prisma.$disconnect();
});

function Date_Format(): string | Date | undefined {
    throw new Error('Function not implemented.');
}
function Date_Time(): any {
    throw new Error('Function not implemented.');
}

