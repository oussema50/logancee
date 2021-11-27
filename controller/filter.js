const Product = require('../models/Product');
exports.getNewArrivals = async (req,res)=>{
    const sortBy = req.query.sortBy ? req.query.sortBy : 'desc';
    const limit = req.query.limit ? + req.query.limit: + 3;
    console.log(sortBy)
    try{
        const newArrivals = await Product.find({}).sort({createdAt:sortBy}).limit(limit);
        console.log('new arrivals from filter getNewArrivals: ',newArrivals);
        res.status(200).json({
            newArrivals,
        })
    }catch(err){
        console.log('err from getNewArrivals api: ',err);
        res.status(500).json({
            errorMessage:'please try again later'
        })
    }
}
exports.searchByQueryType = async (req,res)=>{
    const {type,query} = req.body
    try{
        let products;
        switch(type){
            case'text':
                products = await Product.find({$text:{$search: query}});
                break;
            case 'category':
                products = await Product.find({productCategory: query});    
        }
        if(!products.length > 0){
            products = await Product.find();
        }
        res.status(200).json({
            products,
        })
    }catch(err){
        console.log('err from searchByQueryType api: ',err);
        res.status(500).json({
            errorMessage:'please try again later'
        })
    }
}