'use client'
import RaceSpeedDashboard from "@/components/ui/SpeedDb-interface"
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

export default function SpeedDB() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
  return(
    <div className="bg-white h-full">
      <header className="bg-foreground text-background relative">
        <a href="/">
        <h1 className="text-6xl text-center font-fasterOne">SpeedDB</h1>
        </a>
        <h3 className="font-electrolize text-2xl text-center">Database to view speeds from different corners on different tracks</h3>
        <nav>
        <ul className="bg-foreground text-background flex gap-x-10 pt-5 items-center justify-center relative text-2xl border-b pb-4 max-sm:text-xl max-sm:gap-x-2 ">
        <li><a href='/'>Latest</a></li>
        <li><a href='SpeedDB'>SpeedDB</a></li>
        <li><a href='/About'>About</a></li>
        <li><a href='/'>Contact</a></li>
        <li><a href='/login'>Login</a></li>
        </ul>
        </nav>
      </header>
      <main className="bg-foreground">
        <RaceSpeedDashboard/>
      </main>
        <span className="text-md relative text-background bg-foreground w-screen lg:bottom-20 lg:left-90">
          NOTE: The cornering speeds are now only for fastest car in session and for fastest lap of session
          </span>
    </div>
  )
}