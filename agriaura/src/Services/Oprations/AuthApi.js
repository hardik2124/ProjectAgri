import { toast } from "react-toastify";
import { authEndppoints } from "../Apis"
import { apiConnector } from "../ApiConnector";
import { Login, Logout, setLoading, setToken, UserData } from "../../Redux/Slices/authSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API,
    CHANGEPASSWORD_API

} = authEndppoints;



// login
// export const login = (email, password, navigate, onAuth) => {
//     return async (dispatch) => {
//         const toastId = toast.loading("Loading...", { position: "top-right" });
//         dispatch(setLoading(true));

//         try {
//             const response = await apiConnector("POST", LOGIN_API, {
//                 email,
//                 password
//             });

//             console.log("LOGIN API RESPONSE............", response)

//             if (!response?.data?.success) {
//                 toast.error(response.data.message);
//                 return
//             } else {
//                 toast.success(response.data.message);
//                 dispatch(setToken(response.data.token));

//                 //user name image here

//                 localStorage.setItem("token", JSON.stringify(response.data.token));
//                 localStorage.setItem("user", JSON.stringify(response.data.user));
//                 onAuth();
//                 navigate("/");
//             }

//             // toast.success(response.data.message);
//             // dispatch(setToken(response.data.token));

//             // //user name image here

//             // localStorage.setItem("token", JSON.stringify(response.data.token));
//             // localStorage.setItem("user", JSON.stringify(response.data.user));
//             // onAuth();
//             // navigate("/");
//         } catch (e) {
//             console.log("LOGIN API ERROR............", e);



//         }

//         dispatch(setLoading(false))
//         toast.dismiss(toastId)
//     }
// }

export const login = (email, password, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", LOGIN_API, { email, password });

            console.log("LOGIN API RESPONSE............", response);

            if (response?.data?.success === 'false') {
                // Handle backend error response
                toast.error(response.message);
                throw new Error(response.data.message || "Invalid credentials");
            }

            // Success case
            toast.success("Login Successful");

            dispatch(setToken(response.data.token));
            dispatch(UserData(response.data.user));

            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            dispatch(Login(true));
            navigate("/");
        } catch (e) {
            // Handle errors and show backend messages
            console.error("LOGIN API ERROR............", e);

            toast.error("Login failed. Please try again.");
        } finally {
            // Ensure loading state is reset
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    };
};



//chat gpt code
// export const login = (email, password, navigate, onAuth) => {
//     return async (dispatch) => {
//         const toastId = toast.loading("Loading...");
//         dispatch(setLoading(true));

//         try {
//             const response = await apiConnector("POST", LOGIN_API, { email, password });

//             console.log("LOGIN API RESPONSE:", response);

//             if (!response?.data?.success) {
//                 throw new Error(response?.data?.message || "Login failed");
//             }

//             toast.success("Login Successful");
//             dispatch(setToken(response.data.token));

//             localStorage.setItem("token", JSON.stringify(response.data.token));
//             localStorage.setItem("user", JSON.stringify(response.data.user));

//             onAuth(); // Optional callback
//             navigate("/");
//         } catch (error) {
//             console.error("LOGIN API ERROR:", error);
//             toast.error(error.message || "An error occurred during login");
//         } finally {
//             dispatch(setLoading(false));
//             toast.dismiss(toastId);
//         }
//     };
// };




// get reset password token

export const getResetPasswordToken = (email, setEmailSent) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...", { position: "top-right" });

        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSWORDTOKEN_API, { email });

            console.log("RESET PASSWORD TOKEN RESPONSE....", response);

            if (!response.data.success) {
                toast.error(response.data.message)
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");
            setEmailSent(true);
        } catch (e) {
            console.log("RESET PASSWORD TOKEN Error", e);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}



//reset password

export const resetPassword = (password, confirmPassword, token, setsuccess) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token });

            console.log("RESET Password RESPONSE ... ", response);

            if (!response.data.success) {
                toast.error(response.data.message)
                throw new Error(response.data.message);
            }

            toast.success("Password has been reset successfully");
            setsuccess(true);
        } catch (e) {
            console.log("RESET PASSWORD Error", e);
        }

        dispatch(setLoading(false));
    }
}

//send otp

export const sendOtp = (email, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            });

            console.log("SENDOTP API RESPONSE............", response);

            if (!response.data.success) {
                toast.error(response.data.message)
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully")
            navigate("/verify-email")

        } catch (e) {
            console.log("SENDOTP API ERROR............", e)
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}



//sign up

export const signUp = (
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate,

) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...")
        console.log("account type", accountType)
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })

            console.log("SIGNUP API RESPONSE2............", response.data.success)
            console.log("SIGNUP API RESPONSE............", response)

            if (!response?.data?.success) {
                toast.error(response.data.message)
                throw new Error(response.data.message)
            }
            dispatch(UserData(response.data.user));
            toast.success("Signup Successfully")
            dispatch(Login(true));
            navigate("/")
        } catch (e) {
            console.log("SIGNUP API ERROR............", e)
            navigate("/signup")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export const logoutt = (navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Logging out...");
        dispatch(setLoading(true));

        try {
            // Clear user data from localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // Dispatch action to clear token from Redux store
            dispatch(setToken(null));
            dispatch(Logout(false));
            // Provide success feedback to the user
            toast.success("Logout Successful");

            // Redirect to login page
            
            navigate("/login");
        } catch (e) {
            // Handle errors and show feedback
            console.error("LOGOUT ERROR:", e);
            toast.error("Logout failed. Please try again.");
        } finally {
            // Ensure loading state is reset
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    };
};