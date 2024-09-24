import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Context from '../context';
import { useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef();

  const { fetchUserAddToCart, setCartProductCount } = useContext(Context);
  const user = useSelector((state) => state?.user?.user);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setData(categoryProduct?.data || []);
    setLoading(false);
  };

  const handleAddToCart = async (e, productId) => {
    e.preventDefault(); // Prevent navigation due to the Link component
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
          fetchUserAddToCart();
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
      setCartProductCount(cartItems.length);
      toast.success('Product added to cart');
    }
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
          className="bg-white shadow-md rounded-full text-2xl absolute top-1/2 transform -translate-y-1/2 left-0 z-10 p-2 text-green-600 hover:bg-green-100 transition-all"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>

        {/* Right Scroll Button */}
        <button
          className="bg-white shadow-md rounded-full text-2xl absolute top-1/2 transform -translate-y-1/2 right-0 z-10 p-2 text-green-600 hover:bg-green-100 transition-all"
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
                <div
                  key={index}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] h-80 bg-slate-300 rounded-sm shadow-md animate-pulse"
                ></div>
              ))
            : data.map((product, index) => (
                <div
                  key={index}
                  className="border-green-500 border-2 rounded-2xl w-full min-w-[230px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] shadow-md group relative"
                >
                  <Link to={`product/${product?._id}`}>
                    <div className="bg-white h-64 border-2 rounded-2xl px-5 min-w-[120px] md:min-w-[145px] flex items-center justify-center">
                      <img
                        src={product.productImage[0]}
                        className="object-contain h-full w-full hover:scale-110 transition-all"
                        alt={product.name}
                      />
                    </div>
                  </Link>
                  <div className="p-3 grid gap-3 relative bg-lime-400 rounded-lg">
                    <h2 className="font-semibold md:text-lg text-base text-ellipsis line-clamp-1">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">{product?.category}</p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium">
                        {displayINRCurrency(product?.selling)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    {/* Add to Cart Button */}
                    <button
                      className="text-sm bg-green-600 py-1 text-white rounded-full hover:bg-green-700 mt-3 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-0 left-0 right-0 mx-auto w-3/4"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalCardProduct;
