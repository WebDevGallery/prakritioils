const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function deleteProductController(req, res) {
    try {
        // Check if the user has permission to delete the product
        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission Denied");
        }

        const { _id } = req.body; // Assuming product ID is passed in the request body

        // Find and delete the product by its ID
        const deletedProduct = await productModel.findByIdAndDelete(_id);

        if (!deletedProduct) {
            throw new Error("Product not found");
        }

        // Respond with success
        res.json({
            message: "Product Deleted Successfully",
            data: deletedProduct,
            success: true,
            error: false
        });
    } catch (err) {
        // Handle any errors
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = deleteProductController;
