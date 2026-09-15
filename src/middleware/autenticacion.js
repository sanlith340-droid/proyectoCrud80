// importar libreria 
const jwtoken = require ("jsonwebtoken")

//funcion 

const autenticacionToken = (req , res , next )=>{
    //formato del token =Bearer <toke> 
    const token = req.header("authent").split("")[1]
    if(!token){
        return res.status(401).json({mensaje: "Acesso denegado , no provee un token."})
        //401 no envia las crendiavlaes 
        //403 enviaste las credenciales pero no son validas 
    }

    //verficar token 

    jwtoken.verify(token,process.env.JWT_SECRET, (error, usuario)=>{
        if(error){
            res.status(403).json({mensaje:"Token invaliudo"})
        }
        req.aprendiz = usuario 
    } )
    next()
}

module.exports = autenticacionToken