const Product = require('../models/Products');
const multer = require('multer');
const path = require('path');


//set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads'); // Adjust path as needed
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            return cb(new Error('Only images are allowed'), false);
        }
        cb(null, true);
    },
});

const addProduct = async (req, res) => {
    try{
        const{name,price,category,stock}=req.body;


        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        const image = req.file.path; // File path of the uploaded image
        const product=new Product({name,image,price,category,stock});
        await product.save();
        res.status(201).json({message: 'Product added successfully', product});
    }catch(err){
        res.status(400).json({ error: err.message });
    }
    }
// Get all products
const getAllProducts = async (req, res) => {
    try {
        const { category, priceRange } = req.query; // Example filters
        let filter = {};

        // Filter by category if provided
        if (category) filter.category = category;

        // Filter by price range if provided
        if (priceRange) {
            const [min, max] = priceRange.split('-');
            filter.price = { $gte: min, $lte: max };
        }

        // Fetch products that match the filter
        const products = await Product.find(filter);

        // Send the products as a response
        res.status(200).json(products);
    } catch (error) {
        // Handle errors and send a 400 response with the error message
        res.status(400).json({ error: error.message });
    }
};

// Get a single product by ID
const getProductById=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product)return res.status(404).json({error:'Product not found'});
        res.status(200).json(product);
    }catch(err){
        res.status(400).json({ error: err.message });
    }
}

// Update a product

const updateProduct = async (req, res) => {
    try {
        // Find and update the product by ID
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,        // Product ID from the request parameters
            req.body,             // Data to update (passed in the request body)
            {
                new: true,        // Return the updated document, not the original
                runValidators: true, // Run schema validation on the update
            }
        );

        // If no product is found, send a 404 response
        if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });

        // Respond with the updated product
        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        // Handle errors and send a 400 response with the error message
        res.status(400).json({ error: error.message });
    }
};

// Delete a product

const deleteProduct = async (req, res) => {
    try {
        // Find and delete the product by ID
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        // If no product is found, send a 404 response
        if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });

        // Respond with a success message
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        // Handle errors and send a 400 response with the error message
        res.status(400).json({ error: error.message });
    }
};

module.exports = { upload,addProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
