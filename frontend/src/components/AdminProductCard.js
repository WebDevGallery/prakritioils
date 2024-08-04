import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct,seteditProduct] = useState(false)
  return (
    <div  className='bg-white p-4 rounded'>
                <div className='w-40 '>
                <div className='w-32 h-32 flex justify-center items-center'>
                <img src={data.productImage[0]} width={140} height={140} className='object-fill mx-auto h-full'></img>
                </div>
                <h1 className=' text-ellipsis line-clamp-2'>{data.productName}</h1>
                <div>
                    <p className=' font-semibold'>
                        {
                            displayINRCurrency(data.selling)
                        }
                    </p>
                </div>
                <div className='w-fit ml-auto p-2 bg-green-400 rounded-full text-white hover:bg-green-600 cursor-pointer' onClick={()=>seteditProduct(true)}>
                    <FaRegEdit />
                </div>
                </div>
                {
                    editProduct && (
                        <AdminEditProduct productData={data} onClose={()=>seteditProduct(false)} fetchdata={fetchdata}/>
                    )
                }
                
              </div>
  )
}

export default AdminProductCard