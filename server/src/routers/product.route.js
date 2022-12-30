const express = require('express');
const {
    GetAllProducts,
    FindProductWithId,
    GetProductImages,
    CreateNewProduct,
    UpdateProduct,
    DeleteProduct,
    SearchProduct
} = require('../controllers/product.controller');
const upload = require('../middlewares/uploadFile');

const productRouter = express.Router();

productRouter.get('/', GetAllProducts);
productRouter.get('/:id', FindProductWithId);
productRouter.get('/:id/images', GetProductImages);
productRouter.get('/search/:name', SearchProduct);
productRouter.post('/', CreateNewProduct);
productRouter.put('/:id', upload.array('images', 10), UpdateProduct);
productRouter.delete('/:id', DeleteProduct);

module.exports = productRouter;