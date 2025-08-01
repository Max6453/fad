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
          <h1 className='text-5xl m-5'>Friday Analysis - Hungarian Grand Prix</h1>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            Another productive day in beautiful budapest for the last round before the long summer break.
          </p>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            "Monaco without walls" is nickname of Hungaroring located 32 minute drive from the center of budapest to a village Mogyoród.
            The circuit offer us a diversity of corners. You can find in hungaroring every type of corner from low speed T1 to high speed T11.
          </p>
          <h3 className='text-5xl m-5'>FP1</h3>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            From the beggining we knew that Mclaren will start with dominant approach. They finished 1, 2 with Lando Norris topping the sheet.
            FP1's purpose is to know track, asphalt, car, etc..
            More relevant data for the race can be expected in FP2 but event those can be redundant because of predicted rain on sunday.
            but let's go back to FP1.
            As I said, LN4 finished 1st and OP81 2nd. CL16 finished 3rd proving the pace of ferrari. In preview article ,which can be found on mhblog-xi.vercel.app website,
            I predicted Ferrari with Mercedes and Red Bull 2nd - 4th. But after these sessions i can say that in this conditions, they will fight for podium.
            More unknown pace is red bull. They shown weak signs of strong pace today. Which can be worrying but they always bounce back from friday to saturday.
            Mercedes's pace isn't great either.
          </p>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-5'>
              <a href='/assets/2025/HungaryGP/FP1/NOR vs LEC.png'>
              <img src="/assets/2025/HungaryGP/FP1/NOR vs LEC.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/HungaryGP/FP1/Results.png'>
              <img src="/assets/2025/HungaryGP/FP1/Results.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/HungaryGP/FP1/Top_Speeds.png'>
              <img src="/assets/2025/HungaryGP/FP1/Top_Speeds.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/HungaryGP/FP1/Results.png'>
              <img src="/assets/2025/HungaryGP/FP1/Tyre_Deg vol.1.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/HungaryGP/FP1/Sectors.png'>
              <img src="/assets/2025/HungaryGP/FP1/Sectors.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
            </div>

          <h1 className='text-5xl m-5 pt-10'>FP2</h1>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            FP2 was more relevant. This session just strenghten the mclarens position.
            Leclerc was behind them again but surprise of the day - Aston martin.
            Somehow the swinged to top 5.
            But once again red bull was lost and mercedes unredible.
            I see that Mclaren will win with ferrari and mercedes behind and red bull will be 4th.
            I'm flattered by Mclarens top speed because they were struggling with the drag whole regs.
            Ferrari was fastest in speed trap.
            Mclarens were fastest in 2nd and 3rd sector, Confirming their dominance in technical parts of circuits.
            Ferrari of Lewis hamiton fastest in 1st sector, which is mainly made with 1 main straight, 2 smaller straights and mix of low to high speed corners.
            Tyre choices are pretty simple. I predict medium/hard only pitstops with backmarkers starting on softs.
            Hard and medium could have the same performance like in Belgium.

          </p>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-5'>
              <a href='/assets/2025/HungaryGP/FP2/PIA vs VER.png'>
              <img src="/assets/2025/HungaryGP/FP2/NOR vs LEC.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/HungaryGP/FP2/Results.png'>
              <img src="/assets/2025/HungaryGP/FP2/Results.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/HungaryGP/FP2/Sectors.png'>
              <img src="/assets/2025/HungaryGP/FP2/Sectors.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/HungaryGP/FP2/Top_Speeds.png'>
              <img src="/assets/2025/HungaryGP/FP2/Top_Speeds.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/HungaryGP/FP2/Track_Dominance - VER vs PIA.png'>
              <img src="/assets/2025/HungaryGP/FP2/Tyre_Degradation.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
            </div>
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