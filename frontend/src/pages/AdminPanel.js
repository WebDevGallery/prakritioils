import React, { useEffect } from 'react'
import { LuUserCircle } from "react-icons/lu";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ROLE from '../common/Role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()
    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/")
        }
    },[user])

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden '>
        <aside className='bg-slate-200 min-h-full w-full max-w-80 customShadow'>
            <div className='flex justify-center text-center h-[20%]'>
            <div className='text-8xl cursor-pointer mt-3 '>
                <LuUserCircle />
            </div>
            </div>
            <div className='flex justify-center'>
                
                <p className=' capitalize text-lg font-semibold'> 
                    {
                        user?.name
                    }
                </p>
            </div>
            <div>
                    <nav className='grid mx-7 p-2'>
                        <Link className='px-2 py-1 shadow-sm' to={"all-users"}>All Users</Link>
                        <Link className='px-2 py-1 shadow-sm' to={"all-products"}>All Products</Link>
                    </nav>
            </div>
        </aside>
        <main className='w-full h-full p-4'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel