const Product = require('../models/Product');
const fs = require('fs')
exports.create = async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    console.log(req.user);
    const {filename} = req.file;
    const {productName,productDesc,productPrice,productCategory,productQuantity} = req.body;
    console.log('image name : ',filename)
    try{
        const newProduct = new Product;
        newProduct.productImg = filename;
        newProduct.productName = productName;
        newProduct.productDesc = productDesc;
        newProduct.productPrice = productPrice;
        newProduct.productCategory = productCategory;
        newProduct.productQuantity = productQuantity;
        await newProduct.save();
        res.status(200).json({
            succesMessage:`${productName} was created`,
            product:newProduct
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            errorMessage:'please try again later'
        });
    }
}
exports.readAll = async(req,res)=>{
    try{
        const allProducts = await Product.find().populate('productCategory','category');
        
        res.status(200).json({
            allProducts
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            errorMessage:'please try again later'
        })
    }
}
exports.readByCount = async(req,res)=>{
    try{
        const ProductsByCount = await Product.find().populate('productCategory','category').limit(6);
        
        res.status(200).json({
            ProductsByCount
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            errorMessage:'please try again later'
        })
    }
}
exports.read = async(req,res)=>{
    try{
        const productId = req.params.productId
        console.log('productId',productId)
        const product = await Product.findById(productId);
        res.status(200).json({ 
            product
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            errorMessage:'please try again later'
        })
    }
}
exports.delete = async (req,res)=>{
    const id= req.params.id;
    try{
        const   productDelete = await Product.findByIdAndDelete(id);
        fs.unlink(`uploads/${productDelete.productImg}`,(err)=>{
            if (err) throw err
            console.log('the image deleted successfuly from filesystem: ',productDelete.productImg)
        })
        res.status(200).json({
            productDelete
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            errorMessage:'please try again later'
        }) 
    }
}
exports.update = async(req,res)=>{
    const productId = req.params.productId;

    try{
        if(req.file !== undefined){
            req.body.productImg = req.file.filename; 
        } 
        const oldProduct = await Product.findByIdAndUpdate(productId,req.body);
        console.log('oldProduct : ', oldProduct); 
        if(req.file !== undefined && req.file.filename !== oldProduct.productImg){
            fs.unlink(`uploads/${oldProduct.productImg}`,(err)=>{
                if (err) throw err
                console.log('the image deleted successfuly from filesystem: ',oldProduct.productImg)
            }); 
        }
        
        res.status(200).json({
            succesMessage:`${oldProduct.productName} was updated`
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            errorMessage:'please try again later'
        });
    }
}