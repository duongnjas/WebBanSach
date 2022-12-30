const express = require('express');
const {
    GetAllCategories,
    FindCategoryWithId,
    CreateNewCategory,
    UpdateCategory,
    RemoveCategory
} = require('../controllers/category.controller');

const { GetProductByCategory } = require('../controllers/product.controller');

const categoryRouter = express.Router();

categoryRouter.get('/', GetAllCategories);
categoryRouter.get('/:id', FindCategoryWithId);
categoryRouter.post('/', CreateNewCategory);
categoryRouter.put('/:id', UpdateCategory);
categoryRouter.delete('/:id', RemoveCategory);

// products
categoryRouter.get('/:id/products', GetProductByCategory);

module.exports = categoryRouter;