'use client'

export default function SpeedDBHome() {
  return(
    <div className="h-screen bg-foreground">
       <header className="bg-foreground pr-10 relative">
        <h1 className="text-6xl text-center font-fasterOne">SpeedDB</h1>
        <h3 className="font-electrolize text-2xl text-center">Database to view speeds from different corners on different tracks</h3>
        <nav className="flex gap-x-5 text-xl items-center justify-center">
          <ul className="flex gap-x-5 text-center items-center justify-center">
          <li><a href="/SpeedDB/alter-dashboard" className="hover:underline">SpeedDBAlter</a></li>
          <li><a href="/SpeedDB/view-dashboard" className="hover:underline">SpeedDBView</a></li>
          </ul>
        </nav>
      </header>

    <main className="bg-foreground items-center justify-items-center text-start top-10 relative">
      <p className="w-200 text-2xl">
        SpeedDB is open database to view formula 1 speeds in most famous corners around the world.
      </p>
      <p className="w-200 text-2xl pt-5">
        SpeedDB can be categorize into 2 types.
        Insert - you can insert you findings and contribute.
        View - Here you can view all data we gathered.
      </p>
      <p className="w-200 text-2xl pt-5">
        this project is made by one person and it can contain some bugs. That's why I would appreciate if you contacted me.
        You can contact me via:
        <a href="">MHBlog page</a>
        <a href="">portfolio</a>
        <a href=""></a>
      </p>
    </main>
    </div>
  )
}