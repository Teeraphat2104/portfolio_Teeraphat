import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export const Layout: React.FC = () => {
 const location = useLocation()
 const isDemoPage = location.pathname.includes('/demo')

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
