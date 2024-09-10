import React, { useContext, useEffect, useState, useCallback } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(SummaryApi.myCart.url, {
        method: SummaryApi.myCart.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || 'Failed to fetch data');
      }

      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      } else {
        throw new Error(responseData.message);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [context.cartProductCount]);

  const updateQty = async (id, qty) => {
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id: id, quantity: qty })
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const increaseQty = useCallback((id, qty) => updateQty(id, qty + 1), []);
  const decreaseQty = useCallback((id, qty) => qty > 1 && updateQty(id, qty - 1), []);

  const deleteCartProduct = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id: id })
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
        context.fetchUserAddToCart();
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCheckout = () => {
    const message = data.map(product => 
      `${product?.productId?.productName} - (${product?.quantity} * ${displayINRCurrency(product?.productId?.selling)}) - ${displayINRCurrency(product?.productId?.selling * product?.quantity)}`
    ).join('\n');

    const url = `https://api.whatsapp.com/send?phone=918951936369&text=${encodeURIComponent(`Hey I Saw These product on your website prakritioils.com\nCheckout details:\n${message}\nTotal Price: ${displayINRCurrency(totalPrice)}`)}`;
    window.location.href = url;
  };

  const totalQty = data.reduce((previous, current) => previous + current.quantity, 0);
  const totalPrice = data.reduce((preve, cur) => preve + (cur.quantity * cur?.productId?.selling), 0);

  return (
    <div className='container mx-auto px-4 py-6 bg-green-50 rounded-lg shadow-md'>
      <div className='text-center text-lg text-green-800 mb-6'>
        {data.length === 0 && !loading && (
          <p className='bg-white py-5'>No Data</p>
        )}
      </div>

      <div className='flex flex-col lg:flex-row lg:gap-5 justify-between'>
        {/* Product List */}
        <div className='w-full max-w-4xl'>
          {loading ? (
            loadingCart.map((_, index) => (
              <div key={index} className='w-full bg-white h-32 border m-3 border-slate-300 animate-pulse rounded-lg' />
            ))
          ) : (
            <div>
              {data.map((product) => (
                <div key={product?._id} className='w-full bg-white h-auto my-2 border border-slate-300 rounded-lg grid grid-cols-[128px,1fr] p-4 relative'>
                  <div className='w-32 h-32 bg-slate-200'>
                    <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply rounded-md' alt={product?.productId?.productName} />
                  </div>
                  <div className='px-4 py-2 relative'>
                    <button 
                      className='absolute top-2 right-2 text-green-600 rounded-full p-2 hover:bg-green-600 hover:text-white transition-colors cursor-pointer' 
                      onClick={() => deleteCartProduct(product?._id)}
                      aria-label={`Delete ${product?.productId?.productName}`}
                    >
                      <MdDelete />
                    </button>

                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 text-green-900'>{product?.productId?.productName}</h2>
                    <p className='capitalize text-green-600'>{product?.productId?.category}</p>
                    <div className='flex items-center justify-between'>
                      <p className='text-green-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.selling)}</p>
                      <p className='text-green-800 font-semibold text-lg'>{displayINRCurrency(product?.productId?.selling * product?.quantity)}</p>
                    </div>
                    <div className='flex items-center gap-3 mt-2'>
                      <button 
                        className='border border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' 
                        aria-label={`Decrease quantity of ${product?.productId?.productName}`} 
                        onClick={() => decreaseQty(product?._id, product?.quantity)}
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button 
                        className='border border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' 
                        aria-label={`Increase quantity of ${product?.productId?.productName}`} 
                        onClick={() => increaseQty(product?._id, product?.quantity)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary Section */}
        <div className='m-3 w-full lg:mt-4 max-w-sm'>
          {loading ? (
            <div className='h-36 bg-white border-slate-300 animate-pulse rounded-lg' />
          ) : (
            <div className='h-auto bg-white rounded-lg shadow-lg p-4'>
              <h1 className='text-white bg-green-600 px-4 py-2 rounded-t-lg text-center'>Summary</h1>
              <div className='mt-4'>
                <div className='flex justify-between text-lg font-medium text-green-800'>
                  <p>No of items :</p>
                  <p>{totalQty}</p>
                </div>
                <div className='mt-4'>
                  <p className='text-lg font-semibold text-green-800'>Product Details:</p>
                  {data.map((product) => (
                    <div key={product?._id} className='mb-2'>
                      <p className='text-md font-medium text-green-700'>
                        {product?.productId?.productName} - ({product?.quantity} * {displayINRCurrency(product?.productId?.selling)}) - {displayINRCurrency(product?.productId?.selling * product?.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className='flex justify-between text-lg font-medium text-green-800'>
                  <p>Total Price :</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>
                <button 
                  className='bg-green-600 hover:bg-green-700 text-white p-4 mt-4 w-full rounded-lg transition-colors' 
                  onClick={handleCheckout}
                >
                  CheckOut
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
