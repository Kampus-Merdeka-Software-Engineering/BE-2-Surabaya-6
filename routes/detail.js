const express = require('express');
const router = express.Router();
const {createProduct, getProduct, updProduct, getProductById, deleteProduct } = require('../controllers/detail')


router.post('/new', createProduct)
router.get('/get', getProduct)
router.put('/new/:id', updProduct)
router.get('/get/:id', getProductById)
router.delete('/delete/:id', deleteProduct)
module.exports = router;