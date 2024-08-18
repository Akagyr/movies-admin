import { useState } from 'react';
import { Category } from '../../types';
import CategoriesListItem from './CategoriesListItem';
import Pagination from './Pagination';

export default function CategoriesList({ categories }: { categories: Category[] }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const categoriesPerPage = 7;
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;

  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  const showCategories = currentCategories?.map((cat) => (
    <CategoriesListItem key={cat.slug} category={cat} />
  ));

  return (
    <div className='flex flex-col gap-[20px] mt-[30px]'>
      {showCategories}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
