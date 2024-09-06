import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef();

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data || []);
    };

    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    return (
        <div className="container mx-auto px-7 my-6 relative">
            <h2 className="text-2xl font-semibold py-6">{heading}</h2>

            <div className="relative">
                {/* Left Scroll Button */}
                <button
                    className='bg-white shadow-md rounded-full text-2xl absolute top-1/2 transform -translate-y-1/2 left-0 z-10 p-2 text-green-600 hover:bg-green-100 transition-all'
                    onClick={scrollLeft}
                >
                    <FaAngleLeft />
                </button>

                {/* Right Scroll Button */}
                <button
                    className='bg-white shadow-md rounded-full text-2xl absolute top-1/2 transform -translate-y-1/2 right-0 z-10 p-2 text-green-600 hover:bg-green-100 transition-all'
                    onClick={scrollRight}
                >
                    <FaAngleRight />
                </button>

                {/* Scrollable Product Cards */}
                <div
                    className="flex items-center gap-2 md:gap-6 overflow-x-auto scrollbar-none transition-all"
                    ref={scrollElement}
                >
                    {loading
                        ? loadingList.map((_, index) => (
                            <div key={index} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] flex md:max-w-[320px] h-48 bg-slate-300 rounded-sm shadow-md animate-pulse"></div>
                        ))
                        : data.map((product, index) => {
                            return (
                                <Link to={"product/" + product?._id} key={index} className="border-green-500 border-2 w-full min-w-[320px] rounded-2xl md:min-w-[320px] max-w-[100%] flex md:max-w-[360px] h-48 bg-white shadow-md group">
                                    <div className="bg-white h-full p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center rounded-2xl">
                                        <img src={product.productImage[0]} className="object-scale-down h-full w-full hover:scale-110 transition-all flex justify-center items-center mix-blend-multiply" alt={product.name} />
                                    </div>
                                    <div className='p-3 grid w-full relative bg-lime-300 rounded-xl'>
                                        <h2 className='font-semibold md:text-lg text-base text-ellipsis line-clamp-1'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium'>
                                                {displayINRCurrency(product?.selling)}
                                            </p>
                                            <p className=' text-slate-500 line-through'>
                                                {displayINRCurrency(product?.price)}
                                            </p>
                                        </div>
                                        {/* Hide button initially, show on hover */}
                                        <button className='text-sm bg-green-600 py-1 text-white rounded-full hover:bg-green-700 mt-3 absolute bottom-0 left-0 right-0 mx-auto w-3/4 opacity-0 group-hover:opacity-100 transition-opacity' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default HorizontalCardProduct;
