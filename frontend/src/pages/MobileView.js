import React, { useContext } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Context from '../context';

const MobileView = () => {
  const { cartProductCount } = useContext(Context);

  return (
    <div className="md:hidden flex sticky bottom-0 h-16 w-full justify-center items-center">
      <div className="bg-green-50 shadow-md border border-green-200 rounded-t-lg py-3 px-7 h-full w-full">
        <div className="flex justify-between items-center text-center text-3xl text-green-600">
          {/* Home Icon */}
          <Link to={'/'}>
            <IoHomeOutline className="hover:text-green-700 transition-colors" />
          </Link>

          {/* Cart Icon */}
          <Link to={'/my-cart'} className="relative flex items-center">
            <IoCartOutline className="font-extrabold text-4xl hover:text-green-700 transition-colors" />
            <div className="absolute -top-1 -right-1 w-5 h-5 flex justify-center items-center rounded-full bg-red-600">
              <p className="text-white text-xs">{cartProductCount}</p>
            </div>
          </Link>

          {/* User Icon */}
          <div>
            <FaRegUser className="hover:text-green-700 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileView;
