'use client'
import AdminDashboard from "@/components/ui/insert-interface"
import Button from "@/components/ui/button"
export default function SpeedDB() {
  return(
    <div>
      <header className="bg-foreground text-background relative">
        <h1 className="text-6xl text-center font-fasterOne">SpeedDB</h1>
        <h3 className="font-electrolize text-2xl text-center">Database to view speeds from different corners on different tracks</h3>
        <div className="text-center items-center justify-center relative justify-items-center pt-10">
          <Button/>
        </div>
              <nav>
        <ul className="bg-foreground text-background flex gap-x-10 max-sm:gap-x-2 max-sm:text-xl pt-5 items-center justify-center relative text-2xl border-b pb-4">
        <li><a href='#Latest'>Latest</a></li>
        <li><a href='SpeedDB'>SpeedDB</a></li>
        <li><a href='/About'>About</a></li>
        <li><a href='/'>Contact</a></li>
        <li><a href='/login'>Login</a></li>
        </ul>
        </nav>
      </header>

      <main className="bg-foreground">
        <AdminDashboard/>
      </main>
    </div>
  )
}