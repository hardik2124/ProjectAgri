import { productEndpoints } from "../Apis"
import { apiConnector } from "../ApiConnector";
// import { toast } from "react-toastify";
import { setLoading, UserData } from "../../Redux/Slices/authSlice";
import { useDispatch } from "react-redux";
import { useContext } from "react";

const {
    GETALLPRODUCTS_API,
    GETBYIDPRODUCT_API,
    ADDPRODUCT_API,
    EDITPRODUCT_API,
    DELETEPRODUCT_API,
    ADDPRODUCTSTOCK_API,
    REMOVEPRODUCTSTOCK_API

} = productEndpoints;

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
// import { productEndpoints } from "../Apis";
// import { apiConnector } from "../ApiConnector";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";


// const { GETPRODUCTS_API } = productEndpoints;

// export const getAllProduct = async (token) => {
//     const toastId = toast.loading("Loading...")
//     let result = []

//     try {
//         const response = await apiConnector("GET", GETPRODUCTS_API, { token: token });

//         if (!response || !response.data) {
//             throw new Error("Fetch data error");
//         }

//         console.log(response.data);
//         result = response?.data?.products;
//     } catch (error) {
//         console.error("Error while fetching data from server:", error);
//         toast.error(error.message || "Failed to fetch products");
//     } finally {

//         toast.dismiss(toastId);
//     }

//     return result;
// };


export const fetchProducts = async (token) => {
    // setLoading(true); // Set loading to true when fetching starts
    // setError(null); // Clear any previous errors
    try {
        // const storedUser = localStorage.getItem('user');

        // if (!storedUser) {
        //     console.error("User data not found in local storage.");
        //     setError("User data not found. Please log in."); // Set error message
        //     return;
        // }
        console.log("Token is === " + token);

        if (!token) {
            console.log("error while geting token from local storage for product ")
        }

        // const user = JSON.parse(storedUser);
        // const ownerId = user._id;

        // if (!ownerId) {
        //     console.error("Owner ID not found in user data.");
        //     setError("Owner ID not found. Contact support."); // Set error message
        //     return;
        // }

        const response = await apiConnector("GET", GETALLPRODUCTS_API, null, { "Authorization": `Bearer ${token}`},null);
        console.log("response of get product " + response);
        //   const url = `http://localhost:5154/api/v1/product/allproducts?ownerId=${ownerId}`;

        //   const response = await axios.get(url); // Corrected
        // if(!response)
        const data = response.data; // Extract data object
        console.log("data ==== = === === " + data);
        if (data && data.sucess && data.products) {
            return data.products;
        } else {
            return null;
        }

        // // Extract unique categories from the products data
        // const uniqueCategories = [
        //     "All", // "All" is always included as an option
        //     ...new Set(products.map((product) => product.category)), // Get unique categories
        // ];
        // setCategories(uniqueCategories);

    } catch (err) {
        console.error("Error fetching products:", err);
        // setError("Failed to fetch products."); // Set error message
    } finally {
        // setLoading(false); // Set loading to false when fetching is complete (success or error)
    }
};