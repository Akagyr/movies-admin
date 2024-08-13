import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';

import { db } from '../database/firebase';
import { Movie } from '../../types';
import { toast } from 'react-toastify';

export default function useGetMovies() {
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    try {
      const queryCollection = collection(db, 'movies');
      const unsubscribe = onSnapshot(queryCollection, (snapshot) => {
        let tempArr: Movie[] = [];
        snapshot.forEach((doc) => {
          tempArr.push(doc.data() as Movie);
        });
        setMovies(tempArr);
        return tempArr;
      });
      return () => unsubscribe();
    } catch (error) {
      toast.error("Ошибка при получении данных! Попробуйте позже!");
    }
  }, []);

  return movies;
}
