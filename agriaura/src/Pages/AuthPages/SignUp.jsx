import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp } from "../../Services/Oprations/AuthApi";
import { useDispatch } from "react-redux";
import Tab from "./Tab";
import { setSignupData } from "../../Redux/Slices/authSlice";
import toast from "react-hot-toast";

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const ACCOUNT_TYPE = {
        Farmer: "farmer",
        AgroOwner: "agroowner",
        Visitor: "visitor",
    };

    // student or instructor
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.Visitor)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { firstName, lastName, email, password, confirmPassword } = formData

    // Handle input fields, when some value changes
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    // Handle Form Submission
    const handleOnSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }
        const signupData = {
            ...formData,
            accountType,
        }

        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(signupData))
        // Send OTP to user for verification
        dispatch(sendOtp(formData.email, navigate))

        // Reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setAccountType(ACCOUNT_TYPE.Visitor)
    }

    // data to pass to Tab component
    const tabData = [
        {
            id: 1,
            tabName: "Visitor",
            type: ACCOUNT_TYPE.Visitor,
        },
        {
            id: 2,
            tabName: "Farmer",
            type: ACCOUNT_TYPE.Farmer,
        },
        {
            id: 3,
            tabName: "AgroOwner",
            type: ACCOUNT_TYPE.AgroOwner,
        },

    ]

    return (
        <div className="grid place-items-center h-screen">
            {/* Form */}
            <form
                onSubmit={handleOnSubmit}
                className="mt-6 flex w-1/2 max-w-md flex-col gap-y-4 bg-gray-200 p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    Create Your Account
                </h2>
                {/* Tab for Account Type */}
                <Tab tabData={tabData} field={accountType} setField={setAccountType} />

                {/* First Name and Last Name */}
                <div className="flex gap-x-4">
                    <label className="w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-700">
                            First Name <sup className="text-pink-500">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleOnChange}
                            placeholder="Enter first name"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-gray-100 p-[12px] text-richblack-700"
                        />
                    </label>
                    <label className="w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-700">
                            Last Name <sup className="text-pink-500">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleOnChange}
                            placeholder="Enter last name"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-gray-100 p-[12px] text-richblack-700"
                        />
                    </label>
                </div>

                {/* Email Address */}
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-700">
                        Email Address <sup className="text-pink-500">*</sup>
                    </p>
                    <input
                        required
                        type="text"
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

                {/* Password and Confirm Password */}
                <div className="flex gap-x-4">
                    <label className="relative w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-700">
                            Create Password <sup className="text-pink-500">*</sup>
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
                    </label>
                    <label className="relative w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-700">
                            Confirm Password <sup className="text-pink-500">*</sup>
                        </p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder="Confirm Password"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-gray-100 p-[12px] pr-12 text-richblack-700"
                        />
                        <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {showConfirmPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-300 py-[8px] px-[12px] font-medium text-richblack-900 hover:bg-yellow-400"
                >
                    Create Account
                </button>

                {/* Login Redirect */}
                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-700">
                        Log In
                    </Link>
                </p>
            </form>
        </div>

    )
}

export default SignUp;