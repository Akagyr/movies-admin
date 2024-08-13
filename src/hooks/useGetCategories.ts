import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';

import { db } from '../database/firebase';
import { Category } from '../../types';
import { toast } from 'react-toastify';

export default function useGetCategories() {
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    try {
      const queryCollection = collection(db, 'categories');
      const unsubscribe = onSnapshot(queryCollection, (snapshot) => {
        let tempArr: Category[] = [];
        snapshot.forEach((doc) => {
          tempArr.push(doc.data() as Category);
        });
        setCategories(tempArr);
        return tempArr;
      });
      return () => unsubscribe();
    } catch (error) {
      toast.error("Ошибка при получении данных! Попробуйте позже!");
    }
  }, []);

  return categories;
}
