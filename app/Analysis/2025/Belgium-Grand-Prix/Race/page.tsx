'use client'
import { useState } from 'react'
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import * as React from "react"
import { Dialog, DialogPanel } from '@headlessui/react'
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight, ChevronLeft, Settings, User, Mail, FileText } from 'lucide-react';

const navigation = [
  { name: 'Latest', href: '/', current: false, id: 1 },
  { name: 'SpeedDB', href: '/SpeedDB', current: false, id: 2 },
  { name: 'About', href: '/', current: false, id: 3 },
  { name: 'Contact', href: '/', current: true, id: 4 },
  { name: 'Login', href: '/Login', current: true, id: 5 },
];


export default function BelgiumGP() {
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const [isOpen, setIsOpen] = useState(false);
    return(
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
            <li><a href='/#Latest' className='hover:text-white duration-300'>Latest</a></li>
            <li><a href='/SpeedDB' className='hover:text-white duration-300'>SpeedDB</a></li>
            <li><a href='/About' className='hover:text-white duration-300'>About</a></li>
            <li><a href='/' className='hover:text-white duration-300'>Contact</a></li>
            <li><a href='/login' className='hover:text-white duration-300'>Login</a></li>
          </ul>
        </div>
        </header>

        <div className='relative'>
          <h1 className='text-5xl m-5'>Race Analysis - Belgium Grand Prix</h1>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            Todays 2025 Belgium Grand Prix saw 1 hour and 20 minute long suspended session because of heavy rain.
            We went racing around 16:25 local time.
          </p>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            After sprint we approximately knew how the power is divided.
            Mclaren on top with mercedes, ferrari and red bull taking each other points.
          </p>
          <h3 className='text-5xl m-5'>Race start</h3>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            Lando Norris started from pole position. Oscar piastri behind him with Charles Leclerc on P3.
            LN4 made whole race mistakes but the start was just one big mistake which ulimately cost him the win.
            he made bad battery management, leaving him on kemmel straight with empty battery. Also the technical problem with battery didn't help either.
            OP81 could easily overtake him with slipstream into T5. 
          </p>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            Belgium grand prix started to be less and less entertaining in recent years.
            We witness i would say the most boring race yet. Minimal overtakes and overall action on track.
            
          </p>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-5'>
              <a href='/assets/2025/belgiumGP/R/Race_Pace.png'>
              <img src="/assets/2025/belgiumGP/R/Race_Pace.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/belgiumGP/R/Team_Pace.png'>
              <img src="/assets/2025/belgiumGP/R/Team_Pace.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/belgiumGP/R/Top_Speeds.png'>
              <img src="/assets/2025/belgiumGP/R/Top_Speeds.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/belgiumGP/R/Tyre_Degradatio.png'>
              <img src="/assets/2025/belgiumGP/R/Tyre_Degradatio.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
            </div>

          <h1 className='text-5xl m-5 pt-10'>Race</h1>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            To be honest, i don't know what to write about this race.
            Nothing interesting happened, only that LN4 was slowly closing the gap but he made a mistake and this cycle repeated like 3 times.
            Hamilton's strategy was brilliant.
            Antonelli's struggling a lot in recent weekeneds.
            Leclerc and Verstappen literally matched on thousands of second identical race pace.
            Albon with another amazing position finish.
          </p>
            <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
              There need to be changes either for track or cars.
              Or we can say goodbye to spa. But this scenario is more likely.
              Looking forward to budapest.
            </p>
        </div>
        </div>
    )
}