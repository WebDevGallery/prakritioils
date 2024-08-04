import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalProductCard from '../components/VerticalProductCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListArray.forEach(el => {
    urlCategoryListObject[el] = true;
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState(urlCategoryListArray);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: filterCategoryList,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
      console.log(dataResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory(prev => ({
      ...prev,
      [value]: checked,
    }));
  };

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(categoryKeyName => selectCategory[categoryKeyName]);
    setFilterCategoryList(arrayOfCategory);

    // Update URL
    const searchParams = new URLSearchParams();
    arrayOfCategory.forEach(category => searchParams.append('category', category)); // Ensure 'category' matches backend
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  }, [selectCategory, navigate, location.pathname]);

  useEffect(() => {
    if (filterCategoryList.length > 0) {
      fetchData();
    } else {
      setData([]); // Reset data if no categories are selected
    }
  }, [filterCategoryList]);

  return (
    <div>
      <div className=''>
        {/* desktop version */}
        <div className=' lg:grid grid-cols-[200px,1fr] mb-5 w-full'>
          {/* left side */}
          <div className='bg-white hidden md:block p-2 min-h-[calc(100vh-150px)] overflow-y-scroll'>
            <div>
              <h3 className='uppercase font-medium text-slate-600 border-b border-slate-500 pb-1 text-lg'>
                Sort by
              </h3>
              <form className='text-sm flex flex-col gap-2 py-2'>
                <div className='flex items-center gap-3'>
                  <input type='radio' name='sort' id='price-low-high' />
                  <label htmlFor='price-low-high'>Price - Low to High</label>
                </div>
                <div className='flex items-center gap-3'>
                  <input type='radio' name='sort' id='price-high-low' />
                  <label htmlFor='price-high-low'>Price - High to Low</label>
                </div>
              </form>
            </div>

            {/* filter */}
            <div>
              <h3 className='uppercase font-medium text-slate-600 border-b border-slate-500 pb-1 text-lg'>
                Category
              </h3>
              <form className='text-sm flex flex-col gap-2 py-2'>
                {productCategory.map((category, index) => (
                  <div className='flex items-center gap-3' key={category.value}>
                    <input
                      type='checkbox'
                      name='category'
                      checked={selectCategory[category.value] || false}
                      id={category.value}
                      value={category.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={category.value}>{category.label}</label>
                  </div>
                ))}
              </form>
            </div>
          </div>

          {/* right side */}
          <div className='w-full mb-5'>
            {loading && <p>Loading...</p>}
            {!loading && data.length === 0 && <p>No products found.</p>}
            {data.length > 0 && !loading && <div className='mb-5'>
              <VerticalProductCard data={data}  loading={loading} />
            </div>  }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
