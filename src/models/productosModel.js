// Importar la conexio a base de datos con prisma
//para el ejemplo simularemos una bd 

const datos = [
    {"id":1 ,"nombre" : "lapto de segunda", "precio": 1200000 },
    {"id":2 ,"nombre" : "Maouse", "precio": 45000 }
];

const listar = async ( )=> {
    //consulta a bd con await 
    return datos; 
};

module.exports= {
    listar
};

