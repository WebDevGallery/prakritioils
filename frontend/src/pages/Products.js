import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const Products = () => {
  const [openUploadProduct, setopenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className='p-4'>
      <div className='bg-white py-2 px-4 flex justify-between items-center text-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button 
          className='border-2 border-green-600 rounded-full p-2 transition-all hover:bg-green-600' 
          onClick={() => setopenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      <div className='flex flex-col md:flex-row md:flex-wrap gap-5 py-4 overflow-y-scroll'>
        {
          allProduct.map((product, index) => (
            <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4' key={index + "allProducts"}>
              <AdminProductCard data={product} fetchdata={fetchAllProduct} />
            </div>
          ))
        }
      </div>

      {
        openUploadProduct && (
          <UploadProduct onClose={() => setopenUploadProduct(false)} fetchData={fetchAllProduct} />
        )
      }
    </div>
  );
};

export default Products;
