import React from 'react'
import { FaInstagram } from "react-icons/fa";
import Logo from './Logo';
import { Link } from 'react-router-dom';
import scrollToTop from '../helpers/scrollToTop';

const Footer = () => {
  return (
    <footer className="bg-lime-500">
      <div className="mx-auto p-4">
        <div className="bg-green-50 shadow-lg rounded-lg">
          <div className="max-w-screen-xl px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
            <div className="p-5">
              <Link to={""}>
                <h3 className="font-bold text-xl text-green-700">
                  <Logo />
                </h3>
              </Link>
              <p className="text-green-700 font-semibold mt-4">
                FSSAI Certified
              </p>
              <p className="text-green-700 font-semibold">
                100% Natural Wood Pressed Oils
              </p>
            </div>

            <div className="p-5">
              <div className="text-sm uppercase text-green-800 font-bold">
                Resources
              </div>
              <Link
                to={'about-us'}
                className="my-3 block text-green-600 hover:text-green-900 transition-colors"
                onClick={scrollToTop}
              >
                About Us
              </Link>
            </div>

            <div className="p-5">
              <div className="text-sm uppercase text-green-800 font-bold">
                Support
              </div>
              <Link
                to={'cancellation'}
                className="my-3 block text-green-600 hover:text-green-900 transition-colors"
                onClick={scrollToTop}
              >
                Cancellation
              </Link>
              <Link
                to={'refund-shipping'}
                className="my-3 block text-green-600 hover:text-green-900 transition-colors"
                onClick={scrollToTop}
              >
                Refund and Shipping
              </Link>
            </div>

            <div className="p-5">
              <div className="text-sm uppercase text-green-800 font-bold">
                Contact Us
              </div>
              <a className="my-3 block text-green-600" href="/#">
                Prakriti wood pressed oils, spices and more
                <br />
                Shop#10, Chandru complex,
                <br />
                Opp RBI layout, next to Elita main gate, JP Nagar 7th phase,
                Bangalore-560078
              </a>
              <a className="my-3 block text-green-600 hover:text-green-900 transition-colors" href="tel:8951936369">
                +91 8951936369
              </a>
            </div>
          </div>
        </div>

        <div className="bg-green-50 pt-2 mt-4 rounded-lg shadow-lg">
          <div className="flex pb-5 px-3 m-auto pt-5 border-t border-green-200 text-gray-800 text-sm flex-col max-w-screen-lg items-center">
            <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
              <a
                href="https://www.instagram.com/prakriti.oils?igsh=MXdhYWQ5czBrMjdrMQ=="
                className="w-10 mx-1"
              >
                <FaInstagram className="fill-current text-2xl cursor-pointer text-green-600 hover:text-green-800 transition-colors" />
              </a>
            </div>
            <div className="my-5 text-green-700">© Copyright 2024. All Rights Reserved.</div>
            <div className="flex justify-end text-green-700">PRAKRITIOILS || POWERED BY BRACKETS</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
