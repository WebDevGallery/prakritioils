import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const statesInIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        address: {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "India" // Fixed to India
        }
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        // Handle address fields separately
        if (name.startsWith('address.')) {
            const fieldName = name.split('.')[1]; // Get the field name after 'address.'
            setData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [fieldName]: value
                }
            }));
        } else {
            setData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== data.confirm_password) {
            toast.error("Password and Confirm Password didn't match");
            return;
        }

        try {
            const response = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    address: data.address // Include address in the payload
                })
            });

            const dataApi = await response.json();

            if (response.ok) {
                toast.success("User created successfully");
                navigate('/login'); // Redirect to the login page
            } else {
                toast.error(dataApi.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <section id='signup'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-2 w-full max-w-md mx-auto'>
                    <div className='flex justify-center items-center text-2xl text-green-600'>
                        Sign Up
                    </div>
                    <form className='pt-6' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Name:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder='Enter your name'
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full bg-transparent outline-none'
                                />
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    placeholder='Enter email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full bg-transparent outline-none'
                                />
                            </div>
                        </div>
                        <div>
                            <label>Password:</label>
                            <div className='bg-slate-100 p-2 flex justify-center items-center'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    required
                                    placeholder='Enter Password'
                                    className='w-full h-full bg-transparent outline-none'
                                />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword(prev => !prev)}>
                                    {showPassword ? <FaEye className='cursor-pointer' /> : <FaEyeSlash className='cursor-pointer' />}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label>Confirm Password:</label>
                            <div className='bg-slate-100 p-2 flex justify-center items-center'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name='confirm_password'
                                    value={data.confirm_password}
                                    onChange={handleOnChange}
                                    required
                                    placeholder='Confirm Password'
                                    className='w-full h-full bg-transparent outline-none'
                                />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword(prev => !prev)}>
                                    {showPassword ? <FaEye className='cursor-pointer' /> : <FaEyeSlash className='cursor-pointer' />}
                                </div>
                            </div>
                        </div>

                        {/* Address Fields */}
                        <div className='grid'>
                            <label>Enter Your Full Address:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder='Enter your full Address'
                                    name='address.street'
                                    value={data.address.street}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full bg-transparent outline-none'
                                />
                            </div>
                        </div>
                        <div className='grid'>
                            <label>City:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder='Enter your city'
                                    name='address.city'
                                    value={data.address.city}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full bg-transparent outline-none'
                                />
                            </div>
                        </div>
                        <div className='grid'>
                            <label>State:</label>
                            <div className='bg-slate-100 p-2'>
                                <select
                                    name='address.state'
                                    value={data.address.state}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full bg-transparent outline-none'
                                >
                                    <option value=''>Select State</option>
                                    {statesInIndia.map((state, index) => (
                                        <option key={index} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Postal Code:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder='Enter postal code'
                                    name='address.postalCode'
                                    value={data.address.postalCode}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full bg-transparent outline-none'
                                />
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Country:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    value={data.address.country}
                                    readOnly
                                    className='w-full h-full bg-transparent outline-none'
                                />
                            </div>
                        </div>

                        <button className='bg-green-600 text-white rounded px-6 py-2 w-full max-w-[150px] mt-5 hover:scale-110 transition-all mx-auto block'>
                            Sign Up
                        </button>
                    </form>
                    <p className='my-4'>
                        Already have an account? <Link to={'/login'} className='text-red-600 hover:underline'>Login</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Signin;
