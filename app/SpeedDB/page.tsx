'use client'

export default function SpeedDBHome() {
  return(
    <div className="h-screen bg-foreground text-background">
       <header className="bg-foreground pr-10 top-5 relative">
        <a href="/">
        <h1 className="text-6xl text-center font-fasterOne">SpeedDB</h1>
        </a>
        <h3 className="font-electrolize text-2xl text-center">Database to view speeds from different corners on different tracks</h3>
        <nav className="flex gap-x-5 text-xl items-center justify-center">
          <ul className="flex gap-x-5 text-center items-center justify-center pt-5">
          <li><a href="/SpeedDB/view-dashboard" className="hover:underline">SpeedDBView</a></li>
          </ul>
        </nav>
      </header>

    <main className="bg-foreground items-center justify-items-center  top-10 relative">
      <p className="w-200 max-sm:w-80 text-2xl">
        SpeedDB is open database to view formula 1 speeds in most famous corners around the world.
        trough SpeedDB, You can view cornering speeds across 3 cornering profiles - high speed, medium speed, low speed.
        NOTICE: this website are unofficial and are not associated in any way with the Formula 1 companies. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of Formula One Licensing B.V. 
      </p>
      <p className="w-200 max-sm:w-80 text-2xl pt-5">
        this project is made by one person and it can contain some bugs. That's why I would appreciate if you contacted me.
        You can contact me via:
      </p>
        <ul className="flex-col flex text-2xl gap-2 pt-2 items-start max-sm:pr-45">
        <a href="mhblog-xi.vercel.app">MHBlog page</a>
        <a href="maximharvancik.vercel.app">portfolio</a>
        </ul>
    </main>
            <footer className="lg:top-45 md:top-85 max-sm:top-10 w-full bg-foreground text-center pr-10 relative">
          <span className='bg-foreground text-white text-center items-baseline justify-baseline w-full relative'>
            Copyright © All right reserved by MHBlog and Maxim harvančík</span>
        </footer>
    </div>
  )
}