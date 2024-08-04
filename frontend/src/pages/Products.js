import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const Products = () => {
  const [openUploadProduct, setopenUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])

  const fetchAllProduct = async() =>{
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    setAllProduct(dataResponse?.data || [])

  }

  useEffect(()=>{
    fetchAllProduct()
  },[])
  return (
    <div>
      <div className=' bg-white py-2 px-4 flex justify-between text-center'>
        <h2 className=' font-bold text-lg'>All Products</h2>
        <button className=' border-2 border-green-600 rounded-full p-2 transition-all hover:bg-green-600' onClick={()=>setopenUploadProduct(true)}>Upload Product</button>
      </div>


      <div className='flex justify-start  flex-wrap gap-5 py-4 h-[calc(100vh-420px)] overflow-y-scroll'>
        {
          allProduct.map((product,index)=>{
            return(
              <AdminProductCard data={product} key={index+"allProducts"} fetchdata={fetchAllProduct}/>
            )
          })
        }  
      </div>



      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setopenUploadProduct(false)} fetchData={fetchAllProduct}/>
        )
      }
      
    </div>
  )
}

export default Products