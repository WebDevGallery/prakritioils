import React from 'react'
import { FaInstagram } from "react-icons/fa";
import Logo from './Logo';
import { Link } from 'react-router-dom';
import scrollToTop from '../helpers/scrollToTop';

const Footer = () => {
  return (
    <footer className="bg-slate-200">
      <div className="mx-auto p-4">
        <div className="bg-gray-100">
          <div className="max-w-screen-xl px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
            <div className="p-5">
              <Link to={""}>
                <h3 className="font-bold text-xl text-green-600">
                  <Logo />
                </h3>
              </Link>
              <p className="text-green-600 font-semibold mt-4">
                FSSAI Certified
              </p>
              <p className="text-green-600 font-semibold">
                100% Natural Wood Pressed Oils
              </p>
            </div>

            <div className="p-5">
              <div className="text-sm uppercase text-green-600 font-bold">
                Resources
              </div>
              <Link
                to={'about-us'}
                className="my-3 block"
                onClick={scrollToTop}
              >
                About Us
                <span className="text-teal-600 text-xs p-1"></span>
              </Link>
            </div>

            <div className="p-5">
              <div className="text-sm uppercase text-green-600 font-bold">
                Support
              </div>
              <Link
                to={'cancellation'}
                className="my-3 block"
                onClick={scrollToTop}
              >
                Cancellation
                <span className="text-teal-600 text-xs p-1"></span>
              </Link>
              <Link
                to={'refund-shipping'}
                className="my-3 block"
                onClick={scrollToTop}
              >
                Refund and Shipping
                <span className="text-teal-600 text-xs p-1"></span>
              </Link>
            </div>

            <div className="p-5">
              <div className="text-sm uppercase text-green-600 font-bold">
                Contact Us
              </div>
              <a className="my-3 block" href="/#">
                Prakriti wood pressed oils, spices and more
                <br />
                Shop#10, Chandru complex,
                <br />
                Opp RBI layout, next to Elita main gate, JP Nagar 7th phase,
                Bangalore-560078
              </a>
              <a className="my-3 block" href="tel:8951936369">
                +91 8951936369
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 pt-2">
          <div className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col max-w-screen-lg items-center">
            <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
              <a
                href="https://www.instagram.com/prakriti.oils?igsh=MXdhYWQ5czBrMjdrMQ=="
                className="w-10 mx-1"
              >
                <FaInstagram className="fill-current text-2xl cursor-pointer text-gray-500 hover:text-purple-900" />
              </a>
            </div>
            <div className="my-5">© Copyright 2024. All Rights Reserved.</div><br/>
            <div className="flex justify-end">PRAKRITIOILS || POWERED BY BRACKETS</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
