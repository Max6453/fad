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
          <h1 className='text-5xl m-5'>Race Analysis - Hungarian Grand Prix</h1>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            Race in hungaroring was one to remember this season.
          </p>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            Race start was full of action. Leclerc managed to hang on to his position, and so as Piastri.
            However, Norris lost positions to Russell and Alonso mainly because he was blocked by Piastri.
            Positions were stabilised until first pitstops came.
            Norris choosed to go longer than his teammate.
            Lerclerc after his pitstop retained his lead from Piastri. 
            Norris made 29 laps on his mediums when he went to the pits.
            His long game started.
            meanwhile Leclerc was increasing his lead to Piastri.
            Russell was in field of no one.
            After 2nd pitstops, Leclerc pace dropped massively. Whole article about this problem can be found <a href='https://mhblog-xi.vercel.app/Motorsport/Formula-1/Hungarian-Grand-Prix/Weekend-Report' className='underline'> via this link</a>
            Leclerc was easy prey for Russell. 
            Russell, after many attempts and dangerous defence by Leclerc, managed to overtake the ferrari for last podium position.
            Meanwhile a battle started to be fought between Mclarens.
            Piastri needed to close the 9 second gap to 1st place.
            Around lap 66 he caught up Norris and their fight begun.
            However, only lasted for 4 laps with only 1 big moment in T1 by Piastri when he locked up his front tyres.
            Lando Norris won Hungarian grand prix and took his 9 grand prix win and closed the championship gap to only 9 points.  
          </p>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            This race showed us the competence of Lando Norris. Many wrote him up already in Canada.
            i mean was one of them. I'm Norris fan myself but i really thought that Piastri would win easily the championship.
            But in last 4 races, apart Belgium where he made many mistakes, He showed us his qualities and why he deserve to be a world champion.
            Oscar, on the other hand, made mistakes either in quali of in the race in those 4 races. Also showed us impatience which is interesting from him.
            But 4 races don't define whole season or this half season. I still remember his dominance in bahrain or first fight between him and Verstappen.
            I believe this fight between mclarens will be tough untill the last lap of Abu Dhabi.
          </p>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-5'>
              <a href='/assets/2025/HungaryGP/R/Race_Pace.png'>
              <img src="/assets/2025/HungaryGP/R/Race_Pace.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/HungaryGP/R/Strategy.png'>
              <img src="/assets/2025/HungaryGP/R/Strategy.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/HungaryGP/R/Team_Pace.png'>
              <img src="/assets/2025/HungaryGP/R/Team_Pace.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/HungaryGP/R/Top_Speeds.png'>
              <img src="/assets/2025/HungaryGP/R/Top_Speeds.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/HungaryGP/R/Tyre_deg - extensive.png'>
              <img src="/assets/2025/HungaryGP/R/Tyre_deg - extensive.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/HungaryGP/R/Tyre_deg - Vol2.png'>
              <img src="/assets/2025/HungaryGP/R/Tyre_deg - Vol2.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
            </div>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            On median race pace, Norris was fastest with Piastri behind him.
            I was surprised with Colapinto's pace in the race. He was even fastest in one point the the rest of the field.
            Aston Martin ressurected their car after a weekend-to-forget in Belgium.
            Haas definetely became the slowest car this year.
            Many drivers tryed the 1-stop strategy but only significant outcome was Norris which secured him the win
            I believe than my prediction with fastest teams where i put 1. Mclaren, 2nd Ferrari and 3rd mercedes was correct.
            But becuase of Leclerc's problems, the pace look slower.
            Aston returned to the "Best of the rest" place.
            I put here 2 tyre degradation graphs.
            1 is more extensive where you can see tyre life each driver and their laptimes.
            2 is more begginner-friendly i would say.
          </p>
            <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
              Alright that's all for today.
              You can support me by writing me a message  <a href='https://mhblog-xi.vercel.app/Contact'>via this link</a> and give me feedback of what to improve and what should i implement into this concept.
              And don't forget to see SpeedDB. Newest data were just released.
              Appreciate you feedback and looking forward to saturday.
            </p>
        </div>
        </div>
    )
}