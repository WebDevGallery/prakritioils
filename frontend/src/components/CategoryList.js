import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(5).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.categoryProduct.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const dataResponse = await response.json();
      setCategoryProduct(dataResponse.data || []);
    } catch (error) {
      console.error('Error fetching category products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center gap-4 justify-center overflow-scroll scrollbar-none'>
        {loading ? (
          categoryLoading.map((_, index) => (
            <div
              className='h-16 w-16 md:h-24 md:w-24 border border-green-600 rounded-full overflow-hidden bg-white animate-pulse'
              key={"categoryLoading" + index}
            ></div>
          ))
        ) : (
          categoryProduct.map((product, index) => (
            <Link
              to={`/product-category/?category=${encodeURIComponent(product?.category)}`}
              className='cursor-pointer'
              key={product?.category + index}
            >
              <div className='w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden bg-white flex items-center justify-center border border-green-600'>
                <img
                  src={product?.productImage[0]}
                  alt={product?.category}
                  className='object-cover mix-blend-multiply h-full hover:scale-125 transition-all'
                />
              </div>
              <p className='text-center text-sm md:text-base capitalize'>
                {product?.category}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
