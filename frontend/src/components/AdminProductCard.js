import React, { useState } from 'react';
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import AdminEditProduct from './AdminEditProduct';
import AdminDeleteProduct from './AdminDeleteProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({ data, fetchdata }) => {
    const [editProduct, setEditProduct] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(false);

    return (
        <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
            <div className="w-40">
                <div className="w-32 h-32 flex justify-center items-center">
                    <img
                        src={data.productImage[0] || '/default-image.png'}
                        alt={data.productName}
                        width={140}
                        height={140}
                        className="object-fill mx-auto h-full"
                    />
                </div>
                <h1 className="mt-2 font-semibold text-ellipsis line-clamp-2">{data.productName}</h1>
                <div>
                    <p className="font-semibold">{displayINRCurrency(data.selling)}</p>
                </div>
                <div className="flex space-x-4 mt-2">
                    <div
                        className="p-2 bg-green-400 rounded-full text-white hover:bg-green-600 cursor-pointer"
                        onClick={() => setEditProduct(true)}
                    >
                        <FaRegEdit />
                    </div>
                   
                </div>
            </div>

            {editProduct && (
                <AdminEditProduct
                    productData={data}
                    onClose={() => setEditProduct(false)}
                    fetchdata={fetchdata}
                />
            )}
        </div>
    );
};

export default AdminProductCard;
