import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { resetPassword } from "../../Services/Oprations/AuthApi"



// const ResetPassword = () => {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const location = useLocation()
//     const { loading } = useSelector((state) => state.auth)
//     const [formData, setFormData] = useState({
//         password: "",
//         confirmPassword: "",
//     })

//     const [showPassword, setShowPassword] = useState(false)
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//     const { password, confirmPassword } = formData

//     const handleOnChange = (e) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [e.target.name]: e.target.value,
//         }))
//     }

//     const handleOnSubmit = (e) => {
//         e.preventDefault()
//         const token = location.pathname.split("/").at(-1)
//         dispatch(resetPassword(password, confirmPassword, token)) //remove navigate
//     }

//     return (
//         <div className="flex items-start justify-center w-full min-h-screen pt-10 bg-gray-50">
//             {loading ? (
//                 <div className="spinner"></div>
//             ) : (
//                 <div className="w-full max-w-md bg-gray-200 p-6 rounded-lg shadow-lg">
//                     <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-900">
//                         Choose new password
//                     </h1>
//                     <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-700">
//                         Almost done. Enter your new password and you're all set.
//                     </p>
//                     <form onSubmit={handleOnSubmit}>
//                         {/* New Password */}
//                         <label className="relative">
//                             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-700">
//                                 New Password <sup className="text-pink-500">*</sup>
//                             </p>
//                             <input
//                                 required
//                                 type={showPassword ? "text" : "password"}
//                                 name="password"
//                                 value={password}
//                                 onChange={handleOnChange}
//                                 placeholder="Enter Password"
//                                 className="w-full rounded-[0.5rem] bg-gray-100 p-[12px] pr-10 text-richblack-900 shadow-inner"
//                             />
//                             <span
//                                 onClick={() => setShowPassword((prev) => !prev)}
//                                 className="absolute right-3 top-[38px] z-10 cursor-pointer"
//                             >
//                                 {showPassword ? (
//                                     <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//                                 ) : (
//                                     <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//                                 )}
//                             </span>
//                         </label>

//                         {/* Confirm New Password */}
//                         <label className="relative mt-4">
//                             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-700">
//                                 Confirm New Password <sup className="text-pink-500">*</sup>
//                             </p>
//                             <input
//                                 required
//                                 type={showConfirmPassword ? "text" : "password"}
//                                 name="confirmPassword"
//                                 value={confirmPassword}
//                                 onChange={handleOnChange}
//                                 placeholder="Confirm Password"
//                                 className="w-full rounded-[0.5rem] bg-gray-100 p-[12px] pr-10 text-richblack-900 shadow-inner"
//                             />
//                             <span
//                                 onClick={() => setShowConfirmPassword((prev) => !prev)}
//                                 className="absolute right-3 top-[38px] z-10 cursor-pointer"
//                             >
//                                 {showConfirmPassword ? (
//                                     <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//                                 ) : (
//                                     <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//                                 )}
//                             </span>
//                         </label>

//                         {/* Reset Password Button */}
//                         <button
//                             type="submit"
//                             className="mt-6 w-full rounded-[8px] bg-yellow-300 py-[12px] px-[12px] font-medium text-richblack-900 hover:bg-yellow-400"
//                         >
//                             Reset Password
//                         </button>
//                     </form>

//                     {/* Back to Login */}
//                     <div className="mt-6 flex items-center justify-between">
//                         <Link to="/login">
//                             <p className="flex items-center gap-x-2 text-richblack-700 hover:underline">
//                                 <BiArrowBack /> Back To Login
//                             </p>
//                         </Link>
//                     </div>
//                 </div>
//             )}
//         </div>

//     )
// }



const ResetPassword = () => {
    const [success, setsuccess] = useState(false)
    const dispatch = useDispatch();
    const location = useLocation();
    const { loading } = useSelector((state) => state.auth); // Adjust based on state structure

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, confirmPassword, token,setsuccess)); // Remove navigate if not needed
    };

    return (
        <div className="grid place-items-center h-screen">
            {loading ? (
                <div className="spinner"></div>
            ) : success ? (
                <div className="w-full max-w-md bg-gray-200 p-6 rounded-lg shadow-lg">
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-900">
                        Password Changed
                    </h1>
                    <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-700">
                        Your password has been successfully changed. You can now log in with your new password.
                    </p>
                    <Link to="/login">
                        <button
                            className="mt-6 w-full rounded-[8px] bg-yellow-300 py-[12px] px-[12px] font-medium text-richblack-900 hover:bg-yellow-400"
                        >
                            Go to Login
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="w-full max-w-md bg-gray-200 p-6 rounded-lg shadow-lg">
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-900">
                        Choose New Password
                    </h1>
                    <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-700">
                        Almost done. Enter your new password and you're all set.
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        <label className="relative">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-700">
                                New Password <sup className="text-pink-500">*</sup>
                            </p>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                placeholder="Enter Password"
                                className="w-full rounded-[0.5rem] bg-gray-100 p-[12px] pr-10 text-richblack-900 shadow-inner"
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-10 cursor-pointer"
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                        </label>

                        <label className="relative mt-4">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-700">
                                Confirm New Password <sup className="text-pink-500">*</sup>
                            </p>
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder="Confirm Password"
                                className="w-full rounded-[0.5rem] bg-gray-100 p-[12px] pr-10 text-richblack-900 shadow-inner"
                            />
                            <span
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-10 cursor-pointer"
                            >
                                {showConfirmPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                        </label>

                        <button
                            type="submit"
                            className="mt-6 w-full rounded-[8px] bg-yellow-300 py-[12px] px-[12px] font-medium text-richblack-900 hover:bg-yellow-400"
                        >
                            Reset Password
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/login">
                            <p className="flex items-center gap-x-2 text-richblack-700 hover:underline">
                                <BiArrowBack /> Back To Login
                            </p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};


export default ResetPassword;