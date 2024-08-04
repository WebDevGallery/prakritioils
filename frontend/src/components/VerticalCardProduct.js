import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);
    const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()


    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
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
    }, []);

    const scrollRight = () =>{
        scrollElement.current.scrollLeft +=300
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -=300
    }

    return (
        <div className="container mx-auto px-7 my-6 relative">
            <h2 className="text-2xl font-semibold py-6">{heading}</h2>

            <div className="flex items-center gap-2 md:gap-6 overflow-scroll h-full scrollbar-none transition-all" ref={scrollElement}>
            <button className='bg-white shadow-md rounded-full text-2xl ml-4  hidden md:block absolute left-0' onClick={scrollLeft}>
                    <FaAngleLeft />
                </button>


                <button className='bg-white shadow-md rounded-full mr-4 text-2xl hidden md:block absolute right-0' onClick={scrollRight}>
                    <FaAngleRight />
                </button>
                {loading
                    ? loadingList.map((_, index) => (
                        <div key={index} className=" w-full min-w-[280px] md:min-w-[320px] max-w-[280px]  md:max-w-[320px] h-80 bg-slate-300 rounded-sm shadow-md animate-pulse"></div>
                      ))
                    : data.map((product, index) => {
                        return (
                            <Link to={"product/"+product?._id} key={index} className="w-full min-w-[230px] md:min-w-[320px] max-w-[230px]  md:max-w-[320px] h-full bg-white rounded-sm shadow-md">
                                <div className="bg-white h-64 p-4 min-w-[120px] md:min-w-[145px] flex items-center justify-center ">
                                    <img src={product.productImage[0]} className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply" alt={product.name} />
                                </div>
                                <div className='p-3 grid gap-3'>
                                    {/* Add product details here */}
                                    <h2 className='font-semibold md:text-lg text-base text-ellipsis line-clamp-1'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium'>
                                            {displayINRCurrency(product?.selling) }
                                        </p>
                                        <p className=' text-slate-500 line-through'>
                                            {displayINRCurrency(product?.price)}
                                        </p>
                                    </div>
                                    <button className='text-sm bg-green-600 py-1 text-white rounded-full hover:bg-green-700 mt-3 ' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default VerticalCardProduct;
