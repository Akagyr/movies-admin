import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className='flex flex-col justify-center items-center gap-[5px] bg-[#141313] h-full rounded-2xl'>
      <img src='/images/notFoundPage.svg' alt='Not found' />
      <p className='text-2xl font-bold'>Страница не найдена</p>
      <Link to='/' className='px-[15px] py-[8px] bg-red-800 rounded-lg mt-[20px]'>
        Вернутся
      </Link>
    </div>
  );
}
