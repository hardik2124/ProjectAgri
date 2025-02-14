const BASE_URL = "http://localhost:5154/api/v1"

export const authEndppoints = {
    SENDOTP_API: BASE_URL + "/auth/sendOTP",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/resetPasswordToken",
    RESETPASSWORD_API: BASE_URL + "/auth/resetPassword",
    CHANGEPASSWORD_API: BASE_URL + "/auth/changePassword",
}

export const productEndpoints = {
    GETPRODUCTS_API: BASE_URL + "/products/allproducts",
    GETBYIDPRODUCT_API: BASE_URL + "/products/productbyid",
    ADDPRODUCT_API: BASE_URL + "/products/addProduct",
    DELETEPRODUCT_API: BASE_URL + "/products/deleteProduct",
    EDITPRODUCT_API: BASE_URL + "/products/editProduct",
    ADDPRODUCTSTOCK_API: BASE_URL + "/products/addProductStock",
    REMOVEPRODUCTSTOCK_API: BASE_URL + "/products/removeProductStock",
}