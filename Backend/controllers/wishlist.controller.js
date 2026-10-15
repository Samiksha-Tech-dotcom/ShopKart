import User from "../Model/user.model.js";
import Product from "../Model/product.model.js";

export const addToWishlist = async (req, res) => {

    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found!!"
            })
        }

        //checking for duplicate product
        if (req.user.wishlist.includes(productId)) {
            return res.status(409).json({
                message: "Product already exists in Wishlist."
            })
        }
        req.user.wishlist.push(productId); //put the product in the wishlist arraylist
        await req.user.save(); // saves the user document in the MongoDB 


        return res.status(200).json({
            success: true,
            message: "Product added to wishlist"
        });

    } catch (error) {
        return res.status(500).json({
            message: " Server Error."
        })

    }
};
// gettting the wishlist now 
export const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("wishlist");  // whats is populate doing is that its replacing the product id with all the  product details in mongo Db
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            count: user.wishlist.length,
            wishlist: user.wishlist
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });

    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const index = user.wishlist.indexOf(productId);

        if (index === -1) {
            return res.status(404).json({
                message: "Product not found in wishlist"
            });
        }
        user.wishlist.splice(index, 1);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Product removed from wishlist"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Server Error"
        });


    }
};