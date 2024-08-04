import React, { useContext, useState, useEffect } from 'react';
import Logo from './Logo';
import { FaSearch, FaCartPlus } from "react-icons/fa";
import { LuUserCircle } from "react-icons/lu";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/Role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const { cartProductCount } = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search?.split("=")[0])
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  useEffect(() => {
    if (!user?._id) {
      setMenuDisplay(false);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const handleSearch = (e) =>{
    const {value} = e.target
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("search")
    }
  }

  return (
    <header className='h-22 shadow-md bg-white'>
      <div className='container h-full mx-auto flex items-center justify-between'>
        <div className='cursor-pointer'>
          <Link to={'/'}>
            <Logo />
          </Link>
        </div>
        <div className='hidden lg:flex items-center w-full justify-between max-w-lg h-[50px] border rounded-lg'>
          <input
            onChange={handleSearch}
            value={search}
            type='text'
            placeholder='Search here..'
            className='outline-none ml-10 h-full w-full'
          />
          <div className='text-lg min-w-[50px] h-[50px] bg-green-600 flex items-center justify-center rounded-r-lg text-white cursor-pointer'>
            <FaSearch />
          </div>
        </div>
        <div className='flex gap-10 pr-10 justify-between items-center'>
          {user?._id && (
            <Link to="/my-cart" className='relative hidden md:flex items-center'>
              <FaCartPlus className='text-3xl cursor-pointer' />
              <div className='absolute -top-1 -right-1 w-5 h-5 flex justify-center items-center rounded-full bg-red-600'>
                <p className='text-white text-xs'>{cartProductCount}</p>
              </div>
            </Link>
          )}

          <div className='relative group flex justify-center items-center'>
            {user?._id && (
              <div className=' hidden sm:block text-3xl cursor-pointer' onClick={() => setMenuDisplay(prev => !prev)}>
                <LuUserCircle />
              </div>
            )}
            {menuDisplay && (
              <div className='absolute bg-white top-12 right-0 w-48 p-3 shadow-lg'>
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to="/admin-panel"
                      className='block p-2 hover:bg-slate-200'
                      onClick={() => setMenuDisplay(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          <div>
            {user?._id ? (
              <button onClick={handleLogout} className='font-semibold'>
                Logout
              </button>
            ) : (
              <Link to='/login' className='font-semibold'>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
