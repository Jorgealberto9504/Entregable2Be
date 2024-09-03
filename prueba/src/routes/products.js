/* import { Router } from "express";

const router = Router()


router.get('/', (req,res)=>{
    res.send(products)
})

router.get('/:id', (req,res)=>{
    const id = req.params.id
    res.send(products[id])
})

router.post('/', (req,res)=>{
    const product = req.body
    products.push(product)
    res.send({status: 'Success'})
})

export default router */

import { Router } from "express";

const router = Router();

// Array inicial de productos
let products = [
    {
        id: 1,
        title: 'Paracetamol',
        description: 'Analgésico y antipirético',
        code: 'PARA123',
        price: 5.99,
        status: true,
        stock: 100,
        category: 'Medicina',
        thumbnails: ['path/to/image1.jpg']
    },
    {
        id: 2,
        title: 'Ibuprofeno',
        description: 'Antiinflamatorio no esteroideo',
        code: 'IBUP456',
        price: 8.99,
        status: true,
        stock: 50,
        category: 'Medicina',
        thumbnails: ['path/to/image2.jpg']
    },
    // Puedes añadir más productos aquí si lo deseas
];

// Ruta para obtener todos los productos
router.get('/', (req, res) => {
    res.send(products);
});

// Ruta para obtener un producto por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ error: 'Producto no encontrado' });
    }
});

// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios excepto thumbnails' });
    }

    // Generar un nuevo ID único
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = {
        id: newId, // Asignamos el ID generado
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };

    products.push(newProduct);
    res.status(201).send({ status: 'Success', product: newProduct });
});

export default router;