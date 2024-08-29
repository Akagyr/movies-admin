import { useEffect, useState } from 'react';

type SearchableItem = {
  name: string;
  [key: string]: any;
};

export default function CustomSearchInput<T extends SearchableItem>({
  items,
  setFilteredItems,
}: {
  items: T[];
  setFilteredItems: (value: T[] | null) => void;
}) {
  const [searchItem, setSearchItem] = useState<string>('');

  useEffect(() => {
    if (items) {
      setFilteredItems(items);
      setFilteredItems(
        items.filter((item) => item.name.toLowerCase().includes(searchItem.toLowerCase()))
      );
    }
  }, [items]);

  const handleSearch = (searchText: string) => {
    setSearchItem(searchText);
    if (items) {
      if (searchText.length > 0) {
        setFilteredItems(
          items.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
        );
      } else {
        setFilteredItems(null);
      }
    }
  };

  return (
    <div className='relative'>
      <label
        htmlFor='search'
        className='absolute left-[10px] top-1/2 transform -translate-y-1/2 text-gray-400'
      >
        🔍︎
      </label>
      <input
        id='search'
        className='rounded-lg block w-[450px] py-[8px] px-[15px] pl-[35px] bg-neutral-800 placeholder-gray-500 text-white'
        type='search'
        value={searchItem}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder='Я ищу ...'
        disabled={items.length > 0 ? false : true}
      />
    </div>
  );
}
