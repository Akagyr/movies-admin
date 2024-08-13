import { Link } from 'react-router-dom';
import { Category } from '../../types';
import { toast } from 'react-toastify';

export default function CategoriesListItem({ category }: { category: Category }) {
  const deleteCategory = async (slug: string) => {
    try {
      // await deleteDBMovie({ slug });
      toast.success('Успешно удалена!');
    } catch {
      toast.error('Ошибка при удалении! Попробуйте позже!');
    }
  };

  return (
    <div className='flex gap-[20px] items-center justify-between bg-red-800/10 rounded-lg py-[10px] px-[20px]'>
      <h2 className='font-semibold'>{category.name}</h2>
      <div className='flex gap-[10px] items-center justify-center'>
        <Link to={`${category.slug}/update`} className='px-[10px] py-[8px] bg-blue-800 w-fit rounded-lg'>
          Изменить
        </Link>
        <button
          onClick={() => deleteCategory(category.slug)}
          className='px-[15px] py-[8px] bg-red-800 w-fit rounded-lg'
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
