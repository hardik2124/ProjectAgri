const express = require("express");
const router = express.Router();
const { GetAllProducts, GetProductById, addProductStock, removeProductStock, addProduct, editProduct, deleteProduct } = require("../Controller/Product");
const { Auth, isAdmin } = require("../middleWare/Auth")


router.get("/getAllProducts", Auth, GetAllProducts);
router.get("/productbyid", Auth, GetProductById);
router.post("/addProduct", Auth, isAdmin, addProduct);
router.post("/editProduct", Auth, isAdmin, editProduct);
router.post("/deleteProduct", Auth, isAdmin, deleteProduct);
router.post("/addProductStock", Auth, isAdmin, addProductStock);
router.post("/removeProductStock", Auth, isAdmin, removeProductStock);


module.exports = router