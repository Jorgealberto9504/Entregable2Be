import express from "express"; //En esta linea importamos express a nuestro proyecto
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js"

const app = express()

app.use (express.json())
app.use('/static', express.static('public')) //Esta linea nos permite trabajar con nuestros archivos estaticos que tenemos guardados en la carpeta public, lo unico de que debemos de hacer si queremos usarlos es poner el nombre del archivo despues del directorio raiz para visualizarlos en nuestro navegador, de igual forma podemos cambiarle la ruta para que tengamos un pooco mas de control sobre esto, esta se le cambia en el inicio de la linea, le agregamos el path que querramos



app.use('/api/products', productsRouter)  //Con esta linea estamos utilizando los endpoints creados en el archivos users.js y le estamos dando una ruta la cual es /api/users, la cual fue creada hasta este punto y en los endpoints que estan fuera solo les pusimos la raiz, de igual forma podemos agregarles rutas en los endpoints externos las cuales deberan de agregarse despues de este para llegar al endpoint requerido

app.use('/api/carts', cartsRouter)

app.get('/', (req,res)=>{
    res.send('Servidor en funcionamiento')
})

const server = app.listen(8080, ()=>{  //Esta funcion de aca nos permite levantar nuestro servidor
    console.log('Server On');
})