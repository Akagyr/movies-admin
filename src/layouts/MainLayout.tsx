import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useEffect } from 'react';

export default function MainLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const loginAccess = sessionStorage.getItem('loginAccess');
    if (!loginAccess) {
      return navigate('/login');
    }
  }, []);

  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <div className='grid grid-cols-[20%_1fr] xl:grid-cols-[18%_1fr] 2xl:grid-cols-[16%_1fr] overflow-hidden h-full'>
        <Sidebar />
        <main className='py-[40px] px-[100px] overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
