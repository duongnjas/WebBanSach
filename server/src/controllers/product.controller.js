const fs = require('fs');
const path = require('path');

const Product = require("../models/product.model")

const {
    getPagination
} = require('../services/query')

async function GetAllProducts (req, res) {
    const products = await Product.find({}, { images: 0 });
    if(products) {
        return res.status(200).json(products);
    }
    return res.status(404).json({ error: "Not found any product!" });
}

async function FindProductWithId (req, res) {
    const productId = req.params.id;
    const product = await Product.findById(productId, { images: 0 });

    if(product) {
        return res.status(200).json(product);
    }
    return res.status(404).json({ error: "Not found product with id=" + productId });
}

async function GetProductImages (req, res) {
    const productId = req.params.id;
    const product = await Product.findById(productId, { images: 1 });

    if(product) {
        return res.status(200).json(product);
    }
    return res.status(404).json({ error: "Not found images of product with id=" + productId });
}

async function GetProductByCategory (req, res) {
    const categoryId = req.params.id;
    const products = await Product.findById(categoryId, { images: 0 });
    
    if(products) {
        return res.status(200).json(products);
    }
    return res.status(404).json({ error: "Not found any product!" });
}

async function CreateNewProduct(req, res) {
    const files = req.files;

    const newProduct = {
        categoryId: req.body.categoryId,
        name: req.body.name,
        images: req.body.images || [],
        description: req.body.description,
        price: req.body.price,
        specifications: req.body.specifications
    };

    try {
        files.forEach((file) => {
            newProduct.images.push(
                {
                    data: fs.readFileSync(path.join(__dirname, '..', '..', '/uploads/' + file.filename)),
                    contentType: 'image/png' 
                }
            )
        })
    }
    catch(err) {
        console.log(err);
    }

    const result = await Product.create(newProduct);
    if(result) {
        return res.status(201).json(result);
    }
    return res.status(501).json({ error: "Invalid data!" });
}

async function UpdateProduct (req, res) {
    const files = req.files;

    const productId = req.params.id;
    const products = await Product.findById(productId, { images: 0 });
    
    if(!products) {
        return res.status(404).json({ error: "Product not found!"});
    }

    const newProduct = {
        categoryId: req.body.categoryId,
        name: req.body.name,
        images: req.body.images || [],
        description: req.body.description,
        price: req.body.price
    };

    try {
        files.forEach((file) => {
            newProduct.images.push(
                {
                    data: fs.readFileSync(path.join(__dirname, '..', '..', '/uploads/' + file.filename)),
                    contentType: 'image/png' 
                }
            )
        })
    }
    catch(err) {
        console.log(err);
    }

    const result = await Product.updateOne({ _id: productId }, newProduct);
    if(result) {
        return res.status(200).json(result);
    }
    return res.status(501).json({ error: "Invalid data!" });
}

async function DeleteProduct (req, res) {
    const productId = req.params.id;
    const products = await Product.findById(productId, { images: 0 });
    
    if(!products) {
        return res.status(404).json({ error: "Product not found!"});
    }

    const result = await Product.remove({ _id: productId });
    if(result) {
        return res.status(200).json(result);
    }
    return res.status(501).json({ error: "Cannot delete this product!" });
}

module.exports = {
    GetAllProducts,
    FindProductWithId,
    GetProductImages,
    GetProductByCategory,
    CreateNewProduct,
    UpdateProduct,
    DeleteProduct
}