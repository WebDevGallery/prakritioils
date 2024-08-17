import React, { useCallback, useContext, useEffect, useState } from 'react';
import { IoStarHalfOutline } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { useParams } from 'react-router-dom';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDIsplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: ""
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImagecord, setZoomImagecord] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.productdetails.url, {
        method: SummaryApi.productdetails.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ productId: params.id })
      });

      const dataResponse = await response.json();
      setData(dataResponse.data);
      setActiveImage(dataResponse.data.productImage[0]);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params.id]);

  const handleMouseEnterProduct = (imgUrl) => {
    setActiveImage(imgUrl);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImagecord({ x, y });
  }, []);

  const handleZoomOutImage = () => {
    setZoomImage(false);
  };

  return (
    <div className='mx-1 p-3'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-2'>
        <div>
          <div className='h-96 w-full flex flex-col lg:flex-row-reverse gap-4'>
            <div className='h-[500px] lg:h-96 lg:w-96 w-full bg-white p-3x relative'>
              <img
                src={activeImage}
                className='h-full w-full object-scale-down mix-blend-multiply'
                onMouseMove={handleZoomImage}
                onMouseLeave={handleZoomOutImage}
                alt='Product'
              />
              {zoomImage && (
                <div className='hidden lg:block absolute min-w-[500px] min-h-[500px] bg-white p-1 -right-[510px] top-0'>
                  <div
                    className='w-full h-full min-h-[500px] min-w-[500px] mix-blend-multiply scale-100 overflow-hidden'
                    style={{ backgroundImage: `url(${activeImage})`, backgroundRepeat: 'no-repeat', backgroundPosition: `${zoomImagecord.x * 100}% ${zoomImagecord.y * 100}%` }}
                  ></div>
                </div>
              )}
            </div>
            <div className='h-32'>
              {loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {productImageListLoading.map((_, index) => (
                    <div className='h-32 w-32 bg-slate-200 rounded animate-pulse' key={index}></div>
                  ))}
                </div>
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {data.productImage.map((imgUrl, index) => (
                    <div className='h-20 w-20 bg-white rounded p-1' key={imgUrl}>
                      <img
                        src={imgUrl}
                        className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer'
                        onMouseEnter={() => handleMouseEnterProduct(imgUrl)}
                        alt='Product Thumbnail'
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {loading ? (
          <div className='grid gap-6'>
            <p className='bg-slate-200 animate-pulse px-5 h-4 w-full rounded-full inline-block py-2 '></p>
            <h2 className='text-2xl lg:text-4xl font-semibold h-6 bg-slate-200 animate-pulse'></h2>
            <p className='capitalize text-slate-500 bg-slate-200 min-w-[100px] animate-pulse h-6'></p>
            <div className='text-green-600 flex items-center gap-1 text-xl bg-slate-200 h-6 animate-pulse'></div>
            <div className='flex items-center gap-2 text-2xl font-medium bg-slate-200 h-6 animate-pulse'></div>
            <div className='flex items-center justify-center gap-3'>
              <button className='h-6 bg-slate-200 animate-pulse w-full'></button>
              <button className='h-6 bg-slate-200 animate-pulse w-full'></button>
            </div>
            <div>
              <p className='h-52 bg-slate-200 animate-pulse w-96'></p>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-5 px-5'>
            <p className='bg-green-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data.brandName}</p>
            <h2 className='text-2xl lg:text-4xl font-semibold'>{data.productName}</h2>
            <p className='capitalize text-slate-500'>{data.category}</p>
            <div className='text-green-600 flex items-center gap-1 text-xl'>
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoStarHalfOutline />
            </div>
            <div className='flex items-center gap-2 text-2xl font-medium'>
              <p className='text-green-600'>{displayINRCurrency(data.selling)}</p>
              <p className='text-slate-500 line-through'>{displayINRCurrency(data.price)}</p>
            </div>
            <div className='flex items-center justify-center gap-3'>
              <button className='border-2 border-green-600 rounded px-3 py-1 min-w-[100px] text-green-600 font-medium hover:bg-green-600 hover:text-white'>
                Buy
              </button>
              <button className='border-2 border-green-600 rounded px-3 py-1 min-w-[100px] font-medium text-white bg-green-600 hover:text-green-600 hover:bg-white' onClick={(e) => handleAddToCart(e, data._id)}>
                Add To Cart
              </button>
            </div>
            <div>
              <p className='text-slate-600 font-medium my-1'>Description:</p>
              <p>{data.description}</p>
            </div>
          </div>
        )}
      </div>
      {data.category && (
        <CategoryWiseProductDisplay category={data.category} heading={"Recommended for you"} />
      )}
    </div>
  );
};

export default ProductDetails;
