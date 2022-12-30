const Category = require('../models/category.model');

const {
    getPagination
} = require('../services/query')

async function GetAllCategories (req, res) {
    const categories = await Category.find({});;
    if(categories) {
        return res.status(200).json(categories);
    }
    return res.status(404).json({ error: "Not found any category!" });
}

async function FindCategoryWithId (req, res) {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if(category) {
        return res.status(200).json(category);
    }
    return res.status(404).json({ error: "Not found category with id=" + categoryId });
}

async function CreateNewCategory (req, res) {
    const newCategory = {
        slug: req.body.slug,
        name: req.body.name
    };
    
    const result = await Category.create(newCategory);
    if(result) {
        return res.status(201).json(result);
    } 
    return res.status(501).json({ error: "Invalid data!" });
}

async function UpdateCategory (req, res) {
    const categoryId = req.params.id;
    const existCategory = await Category.findById(categoryId);
    if(!existCategory)
        return res.status(400).json({ error: "Category not found!"});

    const newCategory = {
        slug: req.body.slug,
        name: req.body.name
    };
    
    const result = await Category.updateOne({ _id: categoryId }, newCategory);
    if(result) {
        return res.status(200).json(result);
    } 
    return res.status(501).json({ error: "Invalid data!" });
}

async function RemoveCategory (req, res) {
    const categoryId = req.params.id;

    const existCategory = await Category.findById(categoryId);
    if(!existCategory)
        return res.status(404).json({ error: "Category not found!" });

    const result =  await Category.remove({ _id: categoryId });
    if(result) {
        return res.status(200).json(result);
    } 
    return res.status(501).body({ error: "Cannot remove this category!"});
}

module.exports = {
    GetAllCategories,
    FindCategoryWithId,
    CreateNewCategory,
    UpdateCategory,
    RemoveCategory
}