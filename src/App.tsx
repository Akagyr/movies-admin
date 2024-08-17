import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MoviesPage from './pages/MoviesPage';
import MainLayout from './layouts/MainLayout';
import LoginLayout from './layouts/LoginLayout';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import { ToastContainer } from 'react-toastify';
import UsersPage from './pages/UsersPage';
import CategoriesPage from './pages/CategoriesPage';

function App() {
  return (
    <>
      <ToastContainer position='top-center' autoClose={2000} theme='light' />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<MoviesPage />} />
          <Route path='users' element={<UsersPage />} />
          <Route path='categories' element={<CategoriesPage />} />
        </Route>
        <Route element={<LoginLayout />}>
          <Route path='login' element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
