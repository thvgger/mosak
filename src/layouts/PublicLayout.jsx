import TopBanner from '../components/header/TopBanner';
import Header from '../components/header/Header';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';
import Footer from "../components/Footer";
import TopNav from '../components/header/TopNav';
import BottomNav from '../components/BottomNav';

const PublicLayout = () => {
  const location = useLocation();

  // Check if current path is home or any other route you consider "home"
  const isHome = ['/', '/home', '/index'].includes(location.pathname);

  // Check if current path is Community
  const isCommunity = location.pathname.startsWith('/community');
  // const isCommunity = [ '/community' ].includes(location.pathname);
  
  return (
    <div className='relative pb-20'>
      {isHome && !isCommunity && <TopBanner />}
      {!isHome && !isCommunity && <TopNav />}
      <Header isCommunity={isCommunity} /> 
      <Outlet context={{ isCommunity }} />
      {!isCommunity && <BottomNav />}
      {!isCommunity && <Footer />}
    </div>
  );
}

export default PublicLayout;