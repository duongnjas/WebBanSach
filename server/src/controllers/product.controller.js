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
        name: req.body.name,
        images: req.body.images,
        rate: req.body.rate,
        price: req.body.price,
        discount: req.body.discount,
        slug: req.body.slug,
        sold: req.body.sold,
        details: {
            category : req.body.details.category,
            images : req.body.details.images,
            options : {
                name : req.body.details.options.name,
                values : req.body.details.options.values
            },
            specifications: [{
                name: req.body.details.specifications.name,
                value: req.body.details.specifications.value
            }],
            description: req.body.details.description
        }
    };

    // try {
    //     files.forEach((file) => {
    //         newProduct.images.push(
    //             {
    //                 data: fs.readFileSync(path.join(__dirname, '..', '..', '/uploads/' + file.filename)),
    //                 contentType: 'image/png'
    //             }
    //         )
    //     })
    // }
    // catch(err) {
    //     console.log(err);
    // }

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
        name: req.body.name,
        images: req.body.images,
        rate: req.body.rate,
        price: req.body.price,
        discount: req.body.discount,
        slug: req.body.slug,
        sold: req.body.sold,
        description: req.body.description,
        details: {
            category : req.body.details.category,
            images : req.body.details.images,
            options : [{
                id : req.body.details.options.id,
                name : req.body.details.options.name,
                values : {
                    id: req.body.details.options.values.id,
                    idType: req.body.details.options.values.idType,
                    value: req.body.details.options.values.value
                }
            }],
            specifications: {
                id: req.body.specifications.id,
                name: req.body.specifications.name,
                value: req.body.specifications.value
            },
            description: req.body.description
        }
    };

    // try {
    //     files.forEach((file) => {
    //         newProduct.images.push(
    //             {
    //                 data: fs.readFileSync(path.join(__dirname, '..', '..', '/uploads/' + file.filename)),
    //                 contentType: 'image/png'
    //             }
    //         )
    //     })
    // }
    // catch(err) {
    //     console.log(err);
    // }

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