import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      if (responseData.success) {
        toast.success(responseData.message);
        await mergeCarts();  // Merge local cart with server cart
        navigate('/');
        fetchUserDetails();
        fetchUserAddToCart();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to merge local cart with server cart after login
  const mergeCarts = async () => {
    const localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (localCart.length === 0) return; // No items to merge

    for (const item of localCart) {
      try {
        const response = await fetch(SummaryApi.addToCart.url, {
          method: SummaryApi.addToCart.method,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId: item.productId, quantity: item.quantity })
        });

        const data = await response.json();

        if (!data.success) {
          console.error(`Failed to add product ${item.productId} to cart: ${data.message}`);
        }
      } catch (error) {
        console.error(`Error adding product ${item.productId} to cart: ${error.message}`);
      }
    }

    // Clear local cart after merging
    localStorage.removeItem('cartItems');
  };

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-2 w-full max-w-md mx-auto'>
          <div className='flex justify-center items-center text-2xl text-green-600'>
            Login
          </div>
          <form className='pt-6' onSubmit={handleSubmit}>
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
              <div className='bg-slate-100 p-2 flex justify-between items-center'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  placeholder='Enter Password'
                  className='w-full h-full bg-transparent outline-none'
                />
                <div
                  className='cursor-pointer text-xl'
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
              <Link
                to='/forgot-password'
                className='block w-fit ml-auto hover:underline'
              >
                Forgot password?
              </Link>
            </div>
            <button className='bg-green-600 text-white rounded px-6 py-2 w-full max-w-[150px] mt-5 hover:scale-110 transition-all mx-auto block'>
              Login
            </button>
          </form>
          <p className='my-4'>
            Don't have an account?{' '}
            <Link
              to='/sign-up'
              className='text-red-600 hover:underline'
            >
              Sign-up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
