import { Router } from 'express';
import { products, carts } from '../data.js';

const router = Router();

router.get('/', (req, res) => {
    res.send(carts);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cart = carts.find(c => c.id === id);

    if (cart) {
        res.send(cart);
    } else {
        res.status(404).send({ error: 'Carrito no encontrado' });
    }
});

router.post('/', (req, res) => {
    const newCart = { id: carts.length + 1, products: [] }; // Crear un nuevo carrito
    carts.push(newCart);
    res.status(201).json({ status: 'success', cart: newCart });
});

router.post('/:cartId/products', (req, res) => {
    const cartId = parseInt(req.params.cartId);
    const { productId, quantity } = req.body;

    // Buscar el carrito
    const cart = carts.find(c => c.id === cartId);
    if (!cart) {
        return res.status(404).send({ error: 'Carrito no encontrado' });
    }

    // Buscar el producto
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).send({ error: 'Producto no encontrado' });
    }

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.products.find(p => p.id === productId);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.products.push({ ...product, quantity });
    }

    res.status(200).json(cart);
});

router.put('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const product = products.find(p => p.id === pid);

    if (product) {
        // Actualización de campos
        if (req.body.title) product.title = req.body.title;
        if (req.body.description) product.description = req.body.description;
        if (req.body.code) product.code = req.body.code;
        if (req.body.price) product.price = req.body.price;
        if (req.body.status !== undefined) product.status = req.body.status;
        if (req.body.stock) product.stock = req.body.stock;
        if (req.body.category) product.category = req.body.category;
        if (req.body.thumbnails) product.thumbnails = req.body.thumbnails;

        res.send({ status: 'Success', product });
    } else {
        res.status(404).send({ error: 'Producto no encontrado' });
    }
});

router.delete('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const productIndex = products.findIndex(p => p.id === pid);

    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        res.send({ status: 'Success', message: 'Producto eliminado correctamente' });
    } else {
        res.status(404).send({ error: 'Producto no encontrado' });
    }
});

export default router;