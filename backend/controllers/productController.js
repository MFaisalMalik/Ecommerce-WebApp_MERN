const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler")

// Creat Product -- Admin
exports.createProduct = async (req, res, next) => {

    const product = await Product.create(req.body);
    res.status(201).json({
        success : true, 
        product
    })
}

// Get All Product
exports.getAllProducts = async(req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success : true,
        products
    });
}

// Get Product Details
exports.getProductDetails = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if( !product ){
        return next(new ErrorHandler("Product not found", 404))
    }
    
    res.status(200).json({
        status : true,
        product
    })
}

// Update Product -- Admin
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if( !product ){
        return next(new ErrorHandler("Product not found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    });

    res.status(200).json({
        succes: true,
        product
    })
}

// Delete Product -- Admin
exports.deleteProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if( !product ){
        return next(new ErrorHandler("Product not found", 404))
    }

    await product.remove();

    res.status(200).json({
        status : true,
        message : "Product Deleted Successfully"
    })
}