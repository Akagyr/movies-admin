import { Category } from '../../types';
import { toast } from 'react-toastify';
import { deleteDBCategory } from '../database/databaseServices';

export default function CategoriesListItem({
  category,
}: {
  category: Category;
}) {
  const handleDeleteCategory = async (slug: string) => {
    try {
      const request = await deleteDBCategory(slug);
      if (request) {
        toast.success('Успешно удалена!');
      } else {
        toast.error('Ошибка удаления категории!');
      }
    } catch {
      toast.error('Ошибка удаления категории!');
    }
  };

  return (
    <div className='flex gap-[20px] items-center justify-between bg-red-800/10 rounded-lg py-[12px] px-[20px]'>
      <h2 className='font-semibold'>{category.name}</h2>
      <button
        onClick={() => handleDeleteCategory(category.slug)}
        className='px-[15px] py-[8px] bg-red-800 w-fit rounded-lg'
      >
        Удалить
      </button>
    </div>
  );
}
