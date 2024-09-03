// carts.js
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

export default router;