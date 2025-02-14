// import { productEndpoints } from "../Apis"
// import { apiConnector } from "../ApiConnector";
// import { toast } from "react-toastify";
// import { setLoading, UserData } from "../../Redux/Slices/authSlice";
// import { useDispatch } from "react-redux";
// import { useContext } from "react";

// const {
//     GETPRODUCTS_API,
//     GETBYIDPRODUCT_API,
//     ADDPRODUCT_API,
//     EDITPRODUCT_API,
//     DELETEPRODUCT_API,
//     ADDPRODUCTSTOCK_API,
//     REMOVEPRODUCTSTOCK_API

// } = productEndpoints;

// export const useUserDetails = () => {
//     return useContext(UserData);
// };

// export const getAllProduct = async () => {
//     const toastId = toast.loading("Loading...");
//     const userDetails = useUserDetails();

//     if (!userDetails || !userDetails._id) {
//         toast.error("User details not found");
//         toast.dismiss(toastId);
//         return;
//     }

//     try {
//         const response = await apiConnector("GET", GETPRODUCTS_API, { userId: userDetails._id });

//         if (!response || !response.data) {
//             throw new Error("Fetch data error");
//         }

//         console.log(response.data);
//         return response.data;
//     } catch (error) {
//         console.error("Error while fetching data from server:", error);
//         toast.error(error.message || "Failed to fetch products");
//     } finally {
//         toast.dismiss(toastId);
//     }
// };
import { productEndpoints } from "../Apis";
import { apiConnector } from "../ApiConnector";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const { GETPRODUCTS_API } = productEndpoints;

export const getAllProduct = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = []

    try {
        const response = await apiConnector("GET", GETPRODUCTS_API, { token: token });

        if (!response || !response.data) {
            throw new Error("Fetch data error");
        }

        console.log(response.data);
        result = response?.data?.products;
    } catch (error) {
        console.error("Error while fetching data from server:", error);
        toast.error(error.message || "Failed to fetch products");
    } finally {

        toast.dismiss(toastId);
    }

    return result;
};

