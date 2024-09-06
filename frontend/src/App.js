import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import MobileView from './pages/MobileView';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet';


function App({title, description, keywords,author}) {
  
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include'
      });
      if (!dataResponse.ok) {
        throw new Error(`HTTP error! status: ${dataResponse.status}`);
      }
      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      } else {
        if (!isFirstLoad) {
          toast.error('Failed to fetch user details.');
        }
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      if (!isFirstLoad) {
        toast.error('Error fetching user details.');
      }
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.cartCount.url, {
        method: SummaryApi.cartCount.method,
        credentials: 'include'
      });
      if (!dataResponse.ok) {
        throw new Error(`HTTP error! status: ${dataResponse.status}`);
      }
      const dataApi = await dataResponse.json();
      if (dataApi.success && dataApi.data) {
        setCartProductCount(dataApi.data.count);
      } else {
        if (!isFirstLoad) {
          toast.error('Failed to fetch cart count.');
        }
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
      if (!isFirstLoad) {
        toast.error('Error fetching cart count.');
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
    setIsFirstLoad(false);
  }, []);

  const contextValue = useMemo(() => ({
    fetchUserDetails, 
    cartProductCount,
    fetchUserAddToCart
  }), [cartProductCount]);

  return (
    
    <>
    <Helmet>
        <title>{title}</title>
        <meta charset="UTF-8"/>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
        <meta name="author" content={author}/>
        <link rel="canonical" href="https:www.prakritioils.com/" />
    </Helmet>
      <Context.Provider value={contextValue}>
        <ToastContainer 
          position="top-center" 
          autoClose={5000} 
          hideProgressBar 
          closeOnClick 
          draggable 
          pauseOnHover
          toastStyle={{ 
            maxWidth: '60%', 
            margin: '0 auto', 
            textAlign: 'center',
          }}
        />
        <Header />
        <main className='min-h-[calc(100vh-130px)]'>
          <Outlet />
        </main>
        <Footer />
        <MobileView />
      </Context.Provider>
    </>
  );
}
App.defaultProps={
  title : "PRAKRITIOILS-Shop Now",
  description : "Freshness, Purity and Goodness in every drop and bite, Wood pressed oils, Spices, Desi Ghee, Stingless/Small bee honey, Wild bee Honey, Palm Jaggery, Cane Jaggery, Homemade Puliyogare Gojju, Healty Millets",
  keywords : "Wood Pressed Oils, Oils, Spices, Ghee, Masala, Freshness, Jaggery, Healthy Millets",
   author : "Bharath C"
}
export default App;
