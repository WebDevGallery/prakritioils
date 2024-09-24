import React, { useContext } from 'react';
import scrollToTop from '../helpers/scrollToTop';
import displayINRCurrency from '../helpers/displayCurrency';
import { useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import { Link } from 'react-router-dom';

const VerticalProductCard = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null);
    const { fetchUserAddToCart, setCartProductCount } = useContext(Context);
    const user = useSelector((state) => state?.user?.user);  // Get user info from Redux store

    const handleAddToCart = async (e, productId) => {
        e.preventDefault(); // Prevent navigation when "Add to Cart" button is clicked

        if (user?._id) {
            // User is logged in, add to cart via API
            try {
                const response = await fetch(SummaryApi.addToCart.url, {
                    method: SummaryApi.addToCart.method,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId }),
                });

                const data = await response.json();
                if (data.success) {
                    toast.success('Product added to cart');
                    fetchUserAddToCart(); // Fetch the updated cart data
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error('Error adding product to cart');
                console.error('Error:', error);
            }
        } else {
            // User is not logged in, add to localStorage
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingItem = cartItems.find((item) => item.productId === productId);

            if (existingItem) {
                toast.error('Already exists in Cart');
                return;
            }

            cartItems.push({ productId, quantity: 1 });
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            setCartProductCount(cartItems.length);  // Update the cart count
            toast.success('Product added to cart');
        }
    };

    return (
        <div className='m-10'>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-center md:gap-8 overflow-x-scroll h-full scrollbar-none transition-all">
                {loading
                    ? loadingList.map((_, index) => (
                        <div key={index} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px]  md:max-w-[320px] h-80 bg-slate-300 rounded-sm shadow-md animate-pulse"></div>
                    ))
                    : data.map((product, index) => {
                        return (
                            <div key={index} className="w-full min-w-[230px] md:min-w-[320px] max-w-[320px] md:max-w-[320px] h-full bg-white rounded-sm shadow-md">
                                <Link
                                    to={"/product/" + product?._id}
                                    className="block"
                                    onClick={scrollToTop}
                                >
                                    <div className="bg-white h-64 p-4 min-w-[120px] md:min-w-[145px] flex items-center justify-center">
                                        <img
                                            src={product?.productImage[0]}
                                            className="object-scale-down h-full hover:scale-110 transition-all"
                                            alt={product?.productName}
                                        />
                                    </div>
                                </Link>
                                <div className='p-3 grid gap-3'>
                                    <h2 className='font-semibold md:text-lg text-base text-ellipsis line-clamp-1'>
                                        {product?.productName}
                                    </h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium'>
                                            {displayINRCurrency(product?.selling)}
                                        </p>
                                        <p className='text-slate-500 line-through'>
                                            {displayINRCurrency(product?.price)}
                                        </p>
                                    </div>
                                    <button
                                        className='text-sm bg-green-600 py-1 text-white rounded-full hover:bg-green-700 mt-3'
                                        onClick={(e) => handleAddToCart(e, product?._id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default VerticalProductCard;
