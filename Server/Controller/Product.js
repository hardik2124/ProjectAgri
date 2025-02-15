const ProductHistory = require("../Models/ProductHistory");
const Products = require("../Models/Products");

exports.GetAllProducts = async (req, res) => {
    const ownerId = req.query.ownerId; // Get ownerId from query parameters
    console.log(ownerId);

    try {
        const { id } = req.body;

        if (!ownerId) {
            return res.status(400).json({ success: false, message: "Owner Id is required" })
        }

        const products = await Products.find()

        if (!products) {
            return res.status(404).json({ success: false, message: "No products found" });
        }

        return res.status(200).json({
            sucess: true,
            products: products,
            message: "Products fetched successfully"
        });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
}


exports.GetProductById = async (req, res) => {
    try {
        const { ownerId, productId } = req.body;

        if (!ownerId || !productId) {
            return res.status(400).json({ success: false, message: "Owner Id and Product Id both are required" });
        }

        const product = await Products.findOne({ ownerId: ownerId, _id: productId }).populate({
            path: 'reviews', // Fetch reviews related to this product
            populate: {
                path: 'user', // Fetch user details of the reviewer
                select: 'name email', // Select specific user fields
            }
        });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            product: product
        })

    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
}


exports.addProduct = async (req, res) => {
    try {

        const {
            ownerId,
            productName,
            description,
            category,
            pricePerUnit,
            unit,
            stock,
            netWeight
        } = req.body;

        if (!ownerId || !productName || !description || !category || !pricePerUnit || !unit || !stock || !netWeight) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }


        const product = await Products.create({
            ownerId: ownerId,
            productName: productName,
            description: description,
            category: category,
            pricePerUnit: pricePerUnit,
            unit: unit,
            stock: stock,
            netWeight: netWeight,

        });
        console.log("product", product);
        const productHistory = await ProductHistory.create({
            product: product._id,
            owner: ownerId,
            buyer: null,
            transactionType: "inventory update",
            quantity: stock,
            pricePerUnit: pricePerUnit,
            totalAmount: stock * pricePerUnit,
        })
        console.log("productHistory", productHistory);

        return res.status(200).json({
            success: true,
            message: "Product added successfully",
            product: product
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "error while adding a product::::::::::" + e.message
        });
    }
}

exports.addProductStock = async (req, res) => {
    try {

        const {
            ownerId,
            productId,
            stock,
            price
        } = req.body;

        if (!ownerId || !productId || !stock || !price) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const product = await Products.findOneAndUpdate(
            {
                ownerId: ownerId, _id: productId
            },
            {
                $inc: { stock: stock }
            },
            {
                new: true
            });

        const productHistory = await ProductHistory.create({
            product: productId,
            owner: ownerId,
            buyer: null,
            transactionType: "inventory update",
            quantity: stock,
            pricePerUnit: price,
            totalAmount: stock * price,
        });

        return res.status(200).json({
            success: true,
            message: "Stock added successfully",
            product: product
        });




    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "error while adding a product::::::::::" + e.message
        });
    }
}


exports.removeProductStock = async (req, res) => {
    try {
        const {
            ownerId,
            productId,
            stock,
            price
        } = req.body;

        if (!ownerId || !productId || !stock || !price) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const product = await Products.findOneAndUpdate(
            {
                ownerId: ownerId, _id: productId
            },
            {
                $inc: { stock: -stock }
            },
            {
                new: true
            });

        const productHistory = await ProductHistory.create({
            product: productId,
            owner: ownerId,
            buyer: null,
            transactionType: "inventory update",
            quantity: -stock,
            pricePerUnit: price,
            totalAmount: -stock * price,
        });

        return res.status(200).json({
            success: true,
            message: "Stock removed successfully",
            product: product
        });


    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "error while removing a product::::::::::" + e.message
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try {

        const {
            ownerId,
            productId
        } = req.body;

        if (!ownerId || !productId) {
            return res.status(400).json({
                success: false,
                message: "Owner Id and Product Id both are required"
            });
        }

        const product = await Products.findOneAndDelete({ ownerId: ownerId, _id: productId }, { new: true });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "product deleted successfully"
        });

    } catch (e) {
        return res.status(200).json({
            success: false,
            message: "something wrong while delete product" + e.message
        })
    }
}


exports.editProduct = async (req, res) => {
    try {
        const { ownerId, productId, productName, description, category, pricePerUnit, netWeight, images } = req.body;

        if (!ownerId || !productId) {
            return res.status(200).json({
                sucess: false,
                message: "id is required"
            });
        }

        const updateFields = {};
        if (productName) updateFields.productName = productName;
        if (description) updateFields.description = description;
        if (category) updateFields.category = category;
        if (pricePerUnit) updateFields.pricePerUnit = pricePerUnit;
        if (netWeight) updateFields.netWeight = netWeight;
        if (images) updateFields.images = images;


        const updatedProduct = await Products.findOneAndUpdate(
            { _id: productId, ownerId: ownerId },
            { $set: updateFields },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found or you're not authorized to update this product"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });



    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "error while editing a product::::::::::" + e.message
        });
    }
}