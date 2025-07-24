'use client'
import AdminDashboard from "@/components/ui/insert-interface"
export default function SpeedDB() {
  return(
    <div>
      <header className="bg-foreground pr-10 relative">
        <h1 className="text-6xl text-center font-fasterOne">SpeedDB</h1>
        <h3 className="font-electrolize text-2xl text-center">Database to view speeds from different corners on different tracks</h3>
      </header>

      <main>
        <AdminDashboard/>
      </main>
    </div>
  )
}