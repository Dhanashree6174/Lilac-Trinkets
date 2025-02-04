const Product=require("../models/productmodel");

const api=require("../util/apiFeatures");

exports.createproduct=async (req,res,next)=>{
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
}

exports.updateproduct=async(req,res,next)=>{
    let prod1=await Product.findById(req.params.id);
    if(!prod1){
        res.status(500).json({
            success:false,
            message:"The product does not exist"
        })
    }
    prod1=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json(
        {success:true,
        prod1}
    )
}

exports.getAllProducts=async (req,res)=>{
    // return next(new ErrorHandler("This is my temp error",500))
    const resultPerPage=8;
    const productsCount=await Product.countDocuments();
    const ApiFeatures=new api(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products =await ApiFeatures.query;
    res.status(200).json({success:true,
    products,productsCount, resultPerPage})
}

exports.getProductDetails = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  };

exports.deleteproduct=async(req,res,next)=>{
    let prod2=await Product.findById(req.params.id);
    if(!prod2){
        res.status(500).json({
            success:false,
            message:"The product does not exist"
        })
    }
    prod2=await Product.deleteOne(prod2);
    res.status(200).json(
        {success:true,
        prod2}
    )
}

exports.findOneproduct=async(req,res,next)=>{
    let prod3=await Product.findById(req.params.id);
    if(!prod3){
        res.status(500).json({
            success:false,
            message:"The product does not exist"
        })
    }
    res.status(200).json(
        {success:true,
        prod3}
    )
}
