import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function LoginLayout() {
  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <Outlet />
    </div>
  );
}
