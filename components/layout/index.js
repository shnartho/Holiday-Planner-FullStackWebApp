import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { useState } from 'react'

export default function Layout({ children }) {
    // const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="">
            <Navbar />

            <main className="pb-8 mx-16">
                {children}
            </main>

        </div>
    )

    return (
        <>
            <div className="min-h-full">
                {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

                <div className="flex flex-1 flex-col lg:pl-64">
                    <Navbar setSidebarOpen={setSidebarOpen} />

                    <main className="flex-1 pb-8">
                        {children}
                    </main>

                </div>

            </div>
        </>
    )
}