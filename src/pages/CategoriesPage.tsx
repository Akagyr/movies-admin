import useGetCategories from '../hooks/useGetCategories';
import CategoriesList from '../components/CategoriesList';
import CategoryForm from '../components/CategoryForm';
import { useState } from 'react';
import CustomModal from '../components/custom/CustomModal';

export default function CategoriesPage() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const categories = useGetCategories();

  return (
    <>
      <CustomModal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <CategoryForm setIsOpenModal={setIsOpenModal} />
      </CustomModal>
      <button
        onClick={() => setIsOpenModal(true)}
        className='px-[15px] py-[8px] bg-green-800 w-fit rounded-lg'
      >
        Добавить категорию
      </button>
      <CategoriesList categories={categories!} />
    </>
  );
}
