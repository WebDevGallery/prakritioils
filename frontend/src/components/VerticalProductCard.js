import React, { useContext } from 'react'
import scrollToTop from '../helpers/scrollToTop';
import displayINRCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import { Link } from 'react-router-dom';

const VerticalProductCard = ({loading,data = []}) => {
    const loadingList = new Array(13).fill(null);

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }
  return (
    <div className='m-10'>
        <div className=" grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-center md:gap-8 overflow-x-scroll h-full scrollbar-none transition-all">
            
            {loading
                ? loadingList.map((_, index) => (
                    <div key={index} className=" w-full min-w-[280px] md:min-w-[320px] max-w-[280px]  md:max-w-[320px] h-80 bg-slate-300 rounded-sm shadow-md animate-pulse"></div>
                  ))
                : data.map((product, index) => {
                    return (
                        <Link to={"/product/"+product?._id} key={index} className="w-full min-w-[230px] md:min-w-[320px] max-w-[320px]  md:max-w-[320px] h-full bg-white rounded-sm shadow-md" onClick={scrollToTop()}>
                            <div className="bg-white h-64 p-4 min-w-[120px] md:min-w-[145px] flex items-center justify-center ">
                                <img src={product?.productImage[0]} className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply" alt={product.name} />
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
  )
}

export default VerticalProductCard