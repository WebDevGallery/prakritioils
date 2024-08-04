import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import MobileView from './pages/MobileView';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

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
      }

      console.log("User details:", dataApi);
    } catch (error) {
      console.error('Error fetching user details:', error);
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
        setCartProductCount(dataApi?.data?.count);
      }

      console.log("Cart data:", dataApi);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails, 
        cartProductCount,
        fetchUserAddToCart
      }}>
        <ToastContainer />
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

export default App;
