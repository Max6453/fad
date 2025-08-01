'use client'
import { useState } from 'react'
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import * as React from "react"
import { Dialog, DialogPanel } from '@headlessui/react'
import { AnimatePresence, motion, transformValue } from "framer-motion"
import { ChevronRight, ChevronLeft, Settings, User, Mail, FileText } from 'lucide-react';

const navigation = [
  { name: 'Latest', href: '/', current: false, id: 1 },
  { name: 'SpeedDB', href: '/SpeedDB', current: false, id: 2 },
  { name: 'About', href: '/', current: false, id: 3 },
  { name: 'Contact', href: '/', current: true, id: 4 },
  { name: 'login', href: '/Login', current: true, id: 5 },
];

import Image from "next/image";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div>
        <header className=" text-background relative z-50 w-full bg-foreground">
          <span className="text-6xl max-sm:text-5xl relative">
            <a href='/'>
             <h1 className="font-fasterOne pt-5 w-auto hover:scale-95 pl-5 max-sm:pl-0 duration-350">Formula Analysis Dashboard</h1>
            </a>
          </span>
          <nav aria-label="Global" className="flex items-center justify-between lg:px-8 h-20 max-sm:h-30">
          <span className='font-electrolize text-2xl md:w-160'>First open formula 1 database to browse average speed on words fastest and slowest corners</span>
            <div className="absolute right-5 pt-10 pr-5 max-md:pr-0 max-md:right-0 max-md:pt-25">
            <button
            id='openBtn'
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="bottom-5 max-md:bottom-10 max-sm:bottom-5 relative max-sm:block md:block lg:hidden icon-default inline-flex items-center justify-center rounded-md p-2.5 text-white z-50 animation duration-300 transform transition-all"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-10 block hover:-scale-y-110 animation duration-300 transition-all transform" />

            </button>
          </div>
        </nav>
       <AnimatePresence>
        {mobileMenuOpen && (
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="block static">
        <div className="fixed inset-1 bg-black/20" />
        <motion.div
          initial={{ x: '0', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '0', opacity: 0 }}
          transition={{ type:"spring", stiffness: 300, damping: 30, duration: 0.6 }}
          className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto opacity-10 text-center text-white bg-black/50 px-6 py-6 sm:max-w-full sm:ring-1 sm:ring-gray-900/10"
        >
      <DialogPanel>
      <div className="flex items-end justify-end">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className=" rounded-md relative pr-4 pb-12 max-sm:pb-0 max-sm:pt-20 text-white hover:text-red-500 transition-all duration-300"
        >
          <span className="sr-only">Close menu</span>
          <XMarkIcon aria-hidden="true" className="size-10 hover:rotate-180 duration-300" />
        </button>
      </div>
      <div className="flow-root">
        <div className="divide-y divide-gray-500/10">
          <div className=" grid grid-cols-2 max-sm:grid-cols-1 pr-5">
            {navigation.map((item) => (
              <a
                key={`${item.name}-${item.href}`}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 font-semibold text-white opacity-90 text-6xl m-8 hover:text-blue-500 transition-all duration-250"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>  
      </div>
      </DialogPanel>
    </motion.div>
  </Dialog>
        )}
</AnimatePresence>
        <div className='relative w-64 h-full z-50 bg-foreground'>
          <ul className='text-4xl gap-30 m-5 pb-3 gap-y-10 max-sm:hidden lg:flex md:hidden max-md:hidden'>
            <li><a href='#Latest' className='hover:text-white duration-300'>Latest</a></li>
            <li><a href='SpeedDB' className='hover:text-white duration-300'>SpeedDB</a></li>
            <li><a href='/About' className='hover:text-white duration-300'>About</a></li>
            <li><a href='/' className='hover:text-white duration-300'>Contact</a></li>
            <li><a href='/login' className='hover:text-white duration-300'>Login</a></li>
          </ul>
        </div>
        </header>

        <main className='relative'>
          <div className='grid lg:grid-cols-2 md:grid-cols-1 lg:pl-20 md:pl-10 gap-20 relative top-25'>
            <div>
              <a href='Analysis/2025/Hungarian-Grand-Prix/Friday' className='hover:opacity-90 duration-300'>
              <img src="assets/2025/HungaryGP/FP2/Tyre_Degradation.png"
              className='w-140 h-75'/>
              <span className='w-140 h-8 absolute justify-center bg-foreground text-center text-2xl text-white'>Hungarian Grand Prix - Friday analysis</span>
              </a>
            </div>
            <div>
              <a href='Analysis/2025/Belgium-Grand-Prix/Race' className='hover:opacity-90 duration-300'>
              <img src="assets/2025/BelgiumGP/R/Race_Pace.png"
              className='w-140 h-75'/>
              <span className='w-140 h-8 absolute justify-center bg-foreground text-center text-2xl text-white'>Belgium Grand Prix - Race analysis</span>
              </a>
            </div>
            <div>
              <a href='Analysis/2025/Belgium-Grand-Prix/' className='hover:opacity-90 duration-300'>
              <img src="assets/2025/BelgiumGP/SQ/Sectors.png"
              className='w-140 h-75'/>
              <span className='w-140 h-8 absolute justify-center bg-foreground text-center text-2xl text-white'>Belgium Grand Prix - Friday analysis</span>
              </a>
            </div>
          </div>
        </main>
        <footer>
          <span className='bg-foreground lg:top-270 md:top-370 sm:top-370 max-sm:top-370 text-white text-center items-baseline justify-baseline w-full absolute'>
            Copyright © All right reserved by MHBlog and Maxim harvančík</span>
        </footer>
  </div>
  );
}