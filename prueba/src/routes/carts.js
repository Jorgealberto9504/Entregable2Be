import {Router} from 'express'

const router = Router()

const carts = []

router.get('/', (req,res)=>{
    res.send(carts)   //Este codigo nos envia la respuesta del get que seria en este caso el array de usuarios creado fuera de la peticion
})

router.post('/', (req,res)=>{
    const cart = req.body //esta linea nos extrae los datos que el cliente envia los cuales llegan al parametro req desde el body, posteriormente estos los guardamos en la variable user la cual estaremos mandandole en la linea siguiente al array users que tenemos creado fuera de esta function
    carts.push(cart)
    res.send({status: 'success'}) //con esta linea estamos mandando un mensaje de que todo esta corriendo bien si se completa lo anterior
})

export default router  //Esta linea nos exporta nuestra funcion router