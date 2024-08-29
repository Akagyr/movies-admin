import useGetCategories from '../hooks/useGetCategories';
import CategoriesList from '../components/CategoriesList';
import CategoryForm from '../components/CategoryForm';
import { useState } from 'react';
import CustomModal from '../components/custom/CustomModal';
import Loading from '../components/Loading';
import { Category } from '../../types';
import CustomSearchInput from '../components/custom/CustomSearchInput';

export default function CategoriesPage() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const categories = useGetCategories();
  const [filteredCategoties, setFilteredCategoties] = useState<Category[] | null>(null);

  if (!categories) {
    return <Loading />;
  }

  return (
    <div className='flex flex-col gap-[25px] h-full'>
      <CustomModal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <CategoryForm setIsOpenModal={setIsOpenModal} />
      </CustomModal>
      <button
        onClick={() => setIsOpenModal(true)}
        className='px-[15px] py-[8px] bg-green-800 w-fit rounded-lg'
      >
        Добавить категорию
      </button>
      <CustomSearchInput items={categories} setFilteredItems={setFilteredCategoties} />
      <CategoriesList categories={filteredCategoties ? filteredCategoties : categories} />
    </div>
  );
}
