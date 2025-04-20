import Product from '../models/product.model.js'

 
// get all the products
export const getProduct = async (req, res)=>{
  const products = await Product.find({})
  res.json(products)
}

//  create a Product

 export const createProduct = async (req, res)=>{
    const product = new Product(req.body);
    const createdproduct =  await product.save()
    res.json(createdproduct)
 }


// product get by id
 export const getProductById = async  (req, res)=>{
  console.log("🔍 getProductById CALLED with id:", req.params.id);
    try{
     const product = await Product.findById(req.params.id) 
     if (product){res.json(product)}
     else{
        res.status(404).json({message: "Invalid id product not found"});
     }
    }catch(err){
        console.log("error found in product id", err.message);
    }
 } 

//  update the product
export const updateProduct =async  (req, res)=>{
      const {name, image, brand, category, description, price, countInStock }= req.body;
      const product =await Product.findById(req.params.id)

      if(product){
        product.name = name || product.name ,
        product.image = image || product.image ,
        product.brand = brand || product.brand
        product.category = category || product.category;
        product.description = description || product.description;
        product.price = price || product.price;
        product.countInStock = countInStock || product.countInStock;

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }
      else{
        res.status(404).json({message:"product not found"})
      }
}

// delete product

export const deleteProduct = async (req, res)=>{
    const product =await Product.findById(req.params.id)
    if(product){
        await product.deleteOne()
        res.json({message :"product deleted"})
    }else{
    res.status(404).json({message : " product not found"});
    }
}

