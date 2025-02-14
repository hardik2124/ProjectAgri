import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Services/Oprations/AuthApi";




const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)

    const { email, password } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password, navigate));

    }

    return (
        
        <div className="grid place-items-center h-screen">
            <form
                onSubmit={handleOnSubmit}
                className="mt-6 flex w-1/2 max-w-md flex-col gap-y-4 bg-gray-200 p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    Login
                </h2>
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-700">
                        Email Address <sup className="text-pink-500">*</sup>
                    </p>
                    <input
                        required
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="Enter email address"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-gray-100 p-[12px] text-richblack-700"
                    />
                </label>
                <label className="relative">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-700">
                        Password <sup className="text-pink-500">*</sup>
                    </p>
                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        placeholder="Enter Password"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-gray-100 p-[12px] pr-12 text-richblack-700"
                    />
                    <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >
                        {showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                    </span>
                    <Link to="/forgot-password">
                        <p className="mt-1 ml-auto max-w-max text-xs text-blue-700">
                            Forgot Password
                        </p>
                    </Link>
                </label>
                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-300 py-[8px] px-[12px] font-medium text-richblack-900 hover:bg-yellow-400"
                >
                    Log In
                </button>
                <Link to="/signup">
                    you don't have an account? <span className="text-blue-700">Sign Up</span>
                </Link>
            </form>
        </div>


    )
}

export default Login;


// <div className="flex items-start justify-center w-full min-h-screen pt-10">
        //     <form
        //         onSubmit={handleOnSubmit}
        //         className="mt-6 flex w-1/2 max-w-md flex-col gap-y-4 bg-richblack-900 p-6 rounded-lg shadow-lg"
        //     >
        //         <label className="w-full">
        //             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
        //                 Email Address <sup className="text-pink-200">*</sup>
        //             </p>
        //             <input
        //                 required
        //                 type="text"
        //                 name="email"
        //                 value={email}
        //                 onChange={handleOnChange}
        //                 placeholder="Enter email address"
        //                 style={{
        //                     boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        //                 }}
        //                 className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        //             />
        //         </label>
        //         <label className="relative">
        //             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
        //                 Password <sup className="text-pink-200">*</sup>
        //             </p>
        //             <input
        //                 required
        //                 type={showPassword ? "text" : "password"}
        //                 name="password"
        //                 value={password}
        //                 onChange={handleOnChange}
        //                 placeholder="Enter Password"
        //                 style={{
        //                     boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        //                 }}
        //                 className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
        //             />
        //             <span
        //                 onClick={() => setShowPassword((prev) => !prev)}
        //                 className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        //             >
        //                 {showPassword ? (
        //                     <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
        //                 ) : (
        //                     <AiOutlineEye fontSize={24} fill="#AFB2BF" />
        //                 )}
        //             </span>
        //             <Link to="/forgot-password">
        //                 <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
        //                     Forgot Password
        //                 </p>
        //             </Link>
        //         </label>
        //         <button
        //             type="submit"
        //             className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        //         >
        //             log In
        //         </button>
        //     </form>
        // </div>
