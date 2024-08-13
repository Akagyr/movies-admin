import { Category } from '../../types';
import CategoriesListItem from './CategoriesListItem';

export default function CategoriesList({ categories }: { categories: Category[] }) {
    const showCategories = categories?.map((cat) => <CategoriesListItem key={cat.slug} category={cat} />);

    return <div className='flex flex-col gap-[20px] mt-[30px]'>{showCategories}</div>;
}