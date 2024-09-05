import React, { useEffect, useState } from 'react'
import image1 from '../assets/banners/desk/desk1.jpg'
import image2 from '../assets/banners/desk/desk2.jpg'
import image3 from '../assets/banners/desk/desk3.jpg'
import image4 from '../assets/banners/desk/desk4.jpg'
import image5 from '../assets/banners/desk/desk5.jpg'
import image6 from '../assets/banners/desk/desk6.jpg'
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

import mobileimage1 from '../assets/banners/prak2.jpg'
import mobileimage2 from '../assets/banners/prak3.jpg'
import mobileimage3 from '../assets/banners/prak4.jpg'
import mobileimage4 from '../assets/banners/prak5.jpg'
import mobileimage5 from '../assets/banners/prakOils.jpg'

const BannerProduct = () => {
    const [currentImage,setCurrentImage] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6
    ]

    const mobileImages = [
        mobileimage1,
        mobileimage2,
        mobileimage3,
        mobileimage4,
        mobileimage5
    ]

    const nextImage = () =>{
        if(desktopImages.length -1 > currentImage){
            setCurrentImage(preve => preve+1)
        }
        
    }

    const previousImage = () =>{
        if(currentImage != 0){
            setCurrentImage(preve => preve-1)
        }
        
    }

    useEffect(()=>{
        const interval  = setInterval(() => {
            if(desktopImages.length -1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        }, 4000)
        return ()=> clearInterval(interval)
    },[currentImage])
    
  return (
    <div className=' container mx-auto px-7  flex justify-center' >
        <div className='h-96 md:h-[500px] w-[85%] bg-slate-200 rounded relative'>
            <div className=' absolute z-10 w-full h-full md:flex items-center hidden'>
                <div className=' flex justify-between w-full text-3xl'>


                <button onClick={previousImage} className='bg-white shadow-md rounded-full'>
                    <FaAngleLeft />
                </button>


                <button onClick={nextImage} className='bg-white shadow-md rounded-full'>
                    <FaAngleRight />
                </button>


                </div>
            </div>


            {/* desktop and tablet  */}
           <div className='hidden  md:flex h-full overflow-hidden'>
           {
                desktopImages.map((imageUrl,index)=>{
                    return(
                        <div className='w-full h-full  min-w-full min-h-full transition-all' key={imageUrl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                        <img src={imageUrl} className=' w-full h-full ' />
                    </div>
                    )
                })
            }
            </div>


            {/* mobile */}
            <div className='flex h-full overflow-hidden md:hidden'>
           {
                mobileImages.map((imageUrl,index)=>{
                    return(
                        <div className='w-full h-full  min-w-full min-h-full transition-all' key={imageUrl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                        <img src={imageUrl} className=' w-full h-full object-cover' />
                    </div>
                    )
                })
            }
            </div>             
        </div>
    </div>
  )
}

export default BannerProduct