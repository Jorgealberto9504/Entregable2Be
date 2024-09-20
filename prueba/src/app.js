import express from "express";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js"
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'

const app = express()

app.use (express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use(express.static(__dirname + '/public'))

app.use('/api/products', productsRouter) 
app.use('/api/carts', cartsRouter)

app.get('/', (req,res)=>{
    res.render('index')
})

const httpServer = app.listen(8080, ()=>{  
    console.log('Server On');
})

const socketServer = new Server(httpServer)