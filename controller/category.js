const Category = require('../models/Category');
exports.create = async (req,res)=>{
    const {category} = req.body
    try{
        const findCategory = await Category.findOne({category})
        if(findCategory){
            res.status(400).json({
                errorMessage:`${category} is already exists!!`
            });
        }else{
            let newCategory = new Category;
            newCategory.category = category;
            await newCategory.save();
            res.status(200).json({
                category:newCategory,
                succesMessage:`${req.body.category} was created`
            });
        }
        
    }catch(err){
        console.log('category create error : ',err);
        res.status(500).json({
            errorMessage:'please try again later'
        });
    }
    
}
exports.readAll = async(req,res)=>{
    try{
        
        const categories = await Category.find();
        
        res.status(200).json({
            categories
        })
    }catch(err){
        console.log('category readAll error: ',err);
        res.status(500).json({
            errorMessage:'please try again later'
        })
    }
}