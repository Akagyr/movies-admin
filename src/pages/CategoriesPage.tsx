import { Link } from 'react-router-dom';
import useGetCategories from '../hooks/useGetCategories';
import CategoriesList from '../components/CategoriesList';

export default function CategoriesPage() {
  const categories = useGetCategories();

  return (
    <main className='py-[50px] px-[100px]'>
      <Link to='category/create' className='block px-[15px] py-[8px] bg-green-800 w-fit rounded-lg'>
        Добавить новую категорию
      </Link>
      <CategoriesList categories={categories!} />
    </main>
  );
}
