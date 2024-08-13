import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';

import { db } from '../database/firebase';
import { User } from '../../types';
import { toast } from 'react-toastify';

export default function useGetUsers() {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    try {
      const queryCollection = collection(db, 'users');
      const unsubscribe = onSnapshot(queryCollection, (snapshot) => {
        let tempArr: User[] = [];
        snapshot.forEach((doc) => {
          tempArr.push(doc.data() as User);
        });
        setUsers(tempArr);
        return tempArr;
      });
      return () => unsubscribe();
    } catch (error) {
      toast.error("Ошибка при получении данных! Попробуйте позже!");
    }
  }, []);

  return users;
}
