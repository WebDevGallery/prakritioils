import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import Context from '../context';
import scrollToTop from '../helpers/scrollToTop';

const CategoryWiseProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);
    
    const { fetchUserAddToCart, setCartProductCount } = useContext(Context);
    const user = useSelector((state) => state?.user?.user);  // Get user info from Redux store

    const handleAddToCart = async (e, productId) => {
        e.preventDefault(); // Prevents navigation on button click inside Link

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
                    fetchUserAddToCart(); // Fetch updated cart data
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

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data || []);
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    return (
        <div className="container mx-auto px-4 py-8 my-6 relative bg-green-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold py-6 text-green-900">{heading}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading
                    ? loadingList.map((_, index) => (
                        <div key={index} className="w-full h-80 bg-slate-300 rounded-lg shadow-md animate-pulse"></div>
                      ))
                    : data.map((product, index) => {
                        return (
                            <div key={index} className="w-full h-full bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
                                <Link
                                    to={"/product/" + product?._id}
                                    onClick={scrollToTop}
                                    className="block"
                                >
                                    <div className="bg-blue-200 h-64 p-4 flex items-center justify-center rounded-t-lg">
                                        <img
                                            src={product.productImage[0]}
                                            className="object-contain h-full hover:scale-110 transition-transform"
                                            alt={product.name}
                                        />
                                    </div>
                                </Link>
                                <div className="p-3 grid gap-3 bg-green-100 rounded-b-lg">
                                    <h2 className="font-semibold md:text-lg text-base text-ellipsis line-clamp-1 text-green-800">{product?.productName}</h2>
                                    <p className="capitalize text-green-600">{product?.category}</p>
                                    <div className="flex gap-3">
                                        <p className="text-red-600 font-medium">
                                            {displayINRCurrency(product?.selling)}
                                        </p>
                                        <p className="text-slate-500 line-through">
                                            {displayINRCurrency(product?.price)}
                                        </p>
                                    </div>
                                    <button
                                        className="text-sm bg-green-600 py-1 text-white rounded-full hover:bg-green-700 transition-colors mt-3"
                                        onClick={(e) => handleAddToCart(e, product?._id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default CategoryWiseProductDisplay;
