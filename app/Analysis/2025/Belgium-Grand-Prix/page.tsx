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
            <li><a href='#Latest' className='hover:text-white duration-300'>Latest</a></li>
            <li><a href='SpeedDB' className='hover:text-white duration-300'>SpeedDB</a></li>
            <li><a href='/About' className='hover:text-white duration-300'>About</a></li>
            <li><a href='/' className='hover:text-white duration-300'>Contact</a></li>
            <li><a href='/login' className='hover:text-white duration-300'>Login</a></li>
          </ul>
        </div>
        </header>

        <div className='relative'>
          <h1 className='text-5xl m-5'>Friday Analysis - Belgium Grand Prix</h1>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            Fridays in formula 1 are for a regular fan boring. No action on track, sometimes even cars are parked in garages half of the practise.
            But we fanatics love every second when cars are on track and we can admire the pinnacle of engineering.
          </p>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            Belgium grand prix brings us the sprint weekend. Only one practice session and straight to the qualifying for tommorow sprint race.
            The circuit Spa-francorchamps offer us mix of legendary eau rouge, raidilion corners or kemmel straight.
            teams had to make a decision whether to use low downforce rear wing or choose rather higher downforce rear wing.
            <a href='https://x.com/AlbertFabrega'>Here</a> you can see which teams opted for lower and higher downforce rear wing.
            I highly recommend this profile because every race he publish which cars brought updates, rear wings of teams, etc...
          </p>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xll m-5'>
            But let's dive into friday report.
          </p>
          <h3 className='text-5xl m-5'>FP1</h3>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            Personally, I missed whole FP1 because of work. but i managed to gather exclusive data for you.
            It seems red bull's low downforce wing will benefit for couple of laps and then the pace would drop massively. This trend is common for RB21.
            We saw it many times in season.
            Mclaren once again top 1 car. But i feel ferrari will be close whole race and also Verstappen will be too.
            Mercedes need cold temps. The car can't perform in hot environments. We've seen it in Monaco, Spain.
            But when temps are cold they are race winning contenders. We've seen it in Canada.
            AM and Williams brought some updates for their cars so i expected them to be competetive this race and also until the end of the season.
            Haas on the other hand will struggle. Alpine is the same.
            Racing bulls will be top 7 car but their drivers will fight for points.
          </p>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            Mcl is unbeatable in 2nd sector. They benefit massively from their low-medium downforce wing. But on straights, they loose far more lap time than RB.
            RB benfits from their low downforce wing. Their top speed is sovereign. In race if will rain, they will struggle so much.
            I will leave you to analyze H2H to you.
          </p>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-5'>
              <a href='/assets/2025/belgiumGP/FP1/PIA vs LEC.png'>
              <img src="/assets/2025/belgiumGP/FP1/PIA vs LEC.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/belgiumGP/FP1/PIA vs VER.png'>
              <img src="/assets/2025/belgiumGP/FP1/PIA vs VER.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/belgiumGP/FP1/Race_Pace.png'>
              <img src="/assets/2025/belgiumGP/FP1/Race_Pace.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/belgiumGP/FP1/Results.png'>
              <img src="/assets/2025/belgiumGP/FP1/Results.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/belgiumGP/FP1/Sectors.png'>
              <img src="/assets/2025/belgiumGP/FP1/Sectors.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/belgiumGP/FP1/Team_Pace.png'>
              <img src="/assets/2025/belgiumGP/FP1/Team_Pace.png" alt="" className='hover:opacity-90 duration-150'/>´
              </a>
              <a href='/assets/2025/belgiumGP/FP1/Top_Speeds.png'>
              <img src="/assets/2025/belgiumGP/FP1/Top_Speeds.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/belgiumGP/FP1/VER vs NOR.png'>
              <img src="/assets/2025/belgiumGP/FP1/VER vs NOR.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
            </div>

          <h1 className='text-5xl m-5 pt-10'>Sprint Qualifying</h1>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            Sprint Qualifying was interesting from the start. from the shocking dropout of Lewis Hamilton to dominant pole position by Oscar Piastri.
          </p>
          <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
            In SQ1, Antonelli spun at T13 causing delay to SQ2 because of consenquance of his spun, he pushed the gravel on track hence causing the delay.
            Lewis hamilton on his last lap locked his rear tyres, sending him into spin.
            SQ2 saw least action. Apart Russell in P13. AM finished P14 and P15.
            SQ3 saw most of action. This sequence was on only 1 lap so the tension was high.
            Lando Norris was extra cautious in 1st sector, 2nd was briliant and 3rd was ok. I believe if he didn't choose safer line in 1st sector he could conted more for pole position.
            Oscar was quickest in 2nd and 3rd Sector. 1st sector was mid/afwul for Mcl.
            however Haas's were quickest in 1st sector and competetive in 2nd and 3rd. Those track conditions were optimal for haas.
            Williams, if not for yellow flag in SQ1, would have 2 cars in top 7. Sainz with incredible lap finished on 6th.
            Bortoleto and Gasly drove briliantly today too.
          </p>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-5'>
              <a href='/assets/2025/belgiumGP/SQ/PIA vs VER.png'>
              <img src="/assets/2025/belgiumGP/SQ/PIA vs VER.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/belgiumGP/SQ/Results.png'>
              <img src="/assets/2025/belgiumGP/SQ/Results.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/belgiumGP/SQ/Sectors.png'>
              <img src="/assets/2025/belgiumGP/SQ/Sectors.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/belgiumGP/SQ/Top_Speeds.png'>
              <img src="/assets/2025/belgiumGP/SQ/Top_Speeds.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
              <a href='/assets/2025/belgiumGP/SQ/Track_Dominance - VER vs PIA.png'>
              <img src="/assets/2025/belgiumGP/SQ/Track_Dominance - VER vs PIA.png" alt="" className='hover:opacity-90 duration-150'/>
              </a>
            </div>
            <p className='lg:w-200 xl:w-300 md:w-200 max-sm:w-90 sm:110 text-xl m-5'>
              Alright that's all for today.
              You can support me by writing me a message  <a href='https://mhblog-xi.vercel.app/Contact'>via this link</a> and give me feedback of what to improve and what should i implement into this concept.
              Appreciate you feedback and looking forward to saturday.
            </p>
        </div>
        </div>
    )
}