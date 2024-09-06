import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import Context from '../context';
import scrollToTop from '../helpers/scrollToTop';

const CategoryWiseProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);
    
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

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
                            <Link
                                to={"/product/" + product?._id}
                                key={index}
                                className="w-full h-full bg-white rounded-lg shadow-md transition-transform transform hover:scale-105"
                                onClick={scrollToTop()}
                            >
                                <div className="bg-white h-64 p-4 flex items-center justify-center rounded-t-lg">
                                    <img
                                        src={product.productImage[0]}
                                        className="object-contain h-full hover:scale-110 transition-transform mix-blend-multiply"
                                        alt={product.name}
                                    />
                                </div>
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
                                    <button className="text-sm bg-green-600 py-1 text-white rounded-full hover:bg-green-700 transition-colors mt-3" onClick={(e) => handleAddToCart(e, product?._id)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
};

export default CategoryWiseProductDisplay;
