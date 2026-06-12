import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export const Layout: React.FC = () => {
 const location = useLocation()
 const isDemoPage = location.pathname.includes('/demo')

 useEffect(() => {
   window.scrollTo(0, 0)
 }, [location.pathname])

 return (
 <>
 <Header simple={isDemoPage} />
 <main className="pt-16 min-h-screen">
 <Outlet />
 </main>
 {!isDemoPage && <Footer />}
 </>
 )
}
