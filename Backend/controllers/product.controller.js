import Product from "../Model/product.model.js";

// Create product section and related function //
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, stock, category } = req.body;

        if (!name || !price || !description || !image || stock === undefined || !category) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        if (price <= 0) {
            return res.status(400).json({
                message: "Price should be greater than 0"
            })

        }

        if (stock < 0) {
            return res.status(400).json({
                message: "Invalid Stock"
            })
        }

        const prod = await Product.create({
            name,
            description,
            price,
            image,
            stock,
            category

        });

        return res.status(201).json({
            message: "Successful", prod
        });


    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// GET all products function
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// get pdt by Id
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            }); l
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Search filter function

export const searchProduct = async (req, res) => {
    try {
        const { search, category } = req.query; //query uthayega from url
        const filter = {};

        if (search) {
            filter.$or = [
                {
                name: {
                    $regex: search,
                    $options: "i"
                }
            },
        {
                category: {
                    $regex: search,
                    $options: "i"
                }
            }
            ];
        }  

        if(category){
            filter.category = category;
        }

        const pdts = await Product 
        .find(filter)
        .select("name  price  description image category stock");

        return res.status(200).json({
            message : "Product Found",
            pdts 

        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message : "Internal server Error"
        });
    }
}
