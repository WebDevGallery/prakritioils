import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import VerticalProductCard from '../components/VerticalProductCard';

const SearchProduct = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const query = new URLSearchParams(location.search).get('q');
    console.log('Query:', query);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${SummaryApi.searchProduct.url}?q=${query}`);
            const dataResponse = await response.json();
            console.log('Response:', dataResponse);
            setData(dataResponse.data || []); // Ensure data is an array
        } catch (error) {
            console.error('Error fetching products:', error);
            setData([]); // Set data to an empty array on error
        }
        setLoading(false);
    };

    useEffect(() => {
        if (query) {
            fetchProduct();
        }
    }, [query]);

    return (
        <div className="container mx-auto px-4 py-6 bg-green-50 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">Search Results</h2>
            {
                loading && (
                    <p className="text-lg text-center text-green-600">Loading ...</p>
                )
            }
            <p className="text-green-700 mb-4">Search Results: {data.length}</p>
            {
                data.length === 0 && !loading && (
                    <p className="bg-white text-lg text-center text-green-700 p-4 border border-green-200 rounded-lg">No Data Found...</p>
                )
            }
            {
                data.length !== 0 && !loading && (
                    <VerticalProductCard loading={loading} data={data} />
                )
            }
        </div>
    );
};

export default SearchProduct;
