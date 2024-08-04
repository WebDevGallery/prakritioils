import React from 'react'
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Logo from './Logo';



const Footer = () => {
  return (
    <footer className='bg-slate-200'>
        <div className='container mx-auto p-4'>
          <p className='text-center font-bold' title="Prakrithi Oils">
          <div class="bg-gray-100">
    <div class="max-w-screen-xl px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
        <div class="p-5">
            <h3 class="font-bold text-xl text-green-600"><Logo/></h3>
        </div>
        <div class="p-5">
            <div class="text-sm uppercase text-green-600 font-bold">Resources</div>
            <a class="my-3 block" href="/#">Documentation <span class="text-teal-600 text-xs p-1"></span></a><a
                class="my-3 block" href="/#">Tutorials <span class="text-teal-600 text-xs p-1"></span></a><a
                class="my-3 block" href="/#">Support <span class="text-teal-600 text-xs p-1">New</span></a>
        </div>
        <div class="p-5">
            <div class="text-sm uppercase text-green-600 font-bold">Support</div>
            <a class="my-3 block" href="/#">Help Center <span class="text-teal-600 text-xs p-1"></span></a><a
                class="my-3 block" href="/#">Privacy Policy <span class="text-teal-600 text-xs p-1"></span></a><a
                class="my-3 block" href="/#">Conditions <span class="text-teal-600 text-xs p-1"></span></a>
        </div>
        <div class="p-5">
            <div class="text-sm uppercase text-green-600 font-bold">Contact us</div>
            <a class="my-3 block" href="/#">XXX XXXX, Floor 4 San Francisco, CA
                <span class="text-teal-600 text-xs p-1"></span></a><a class="my-3 block" href="/#">contact@company.com
                <span class="text-teal-600 text-xs p-1"></span></a>
        </div>
    </div>
</div>

<div class="bg-gray-100 pt-2">
    <div class="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col
      max-w-screen-lg items-center">
        <div class="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            <a href="/#" class="w-10 mx-1">
            <FaTwitter class="fill-current text-2xl cursor-pointer text-gray-500 hover:text-indigo-600" width="100%" height="100%"/>
            </a>
            <a href="/#" class="w-10 mx-1">
            <FaFacebookSquare class="fill-current text-2xl cursor-pointer text-gray-500 hover:text-blue-600" width="100%" height="100%" />
            </a>
            <a href="/#" class="w-10 mx-1">
            <FaInstagram class="fill-current text-2xl cursor-pointer text-gray-500 hover:text-purple-900" width="150%" height="150%"/>
            </a>
            
        </div>
        <div class="my-5">© Copyright 2024. All Rights Reserved.</div>
    </div>
</div>
          </p>
        </div>
    </footer>
  )
}

export default Footer