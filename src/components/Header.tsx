import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='grid grid-cols-[20%_1fr] xl:grid-cols-[18%_1fr] 2xl:grid-cols-[16%_1fr] py-[15px] px-[20px] lg:px-0 bg-[#141313]'>
      <Link to='/' className='lg:text-center font-bold text-2xl'>
        Movie.<span className='text-red-600'>Trailers</span>.Admin
      </Link>
    </header>
  );
}
