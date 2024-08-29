import {
  getDoc,
  DocumentSnapshot,
  DocumentReference,
  DocumentData,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { Category, Movie, User } from '../../types';

export async function getDBElement(collection: DocumentReference<DocumentData, DocumentData>) {
  try {
    const document: DocumentSnapshot<DocumentData> = await getDoc(collection);
    const docData = document.data();
    return docData;
  } catch (error) {
    console.error('Ошибка получения документа!', error);
    return null;
  }
}

export async function createDBMovie(movie: Movie) {
  try {
    await setDoc(doc(db, 'movies', movie.slug), movie);
    return true;
  } catch (error) {
    console.error('Ошибка создания фильма!', error);
    return false;
  }
}

export async function updateDBMovie(movieData: Movie) {
  try {
    await updateDoc(doc(db, 'movies', movieData.slug), movieData);
    return true;
  } catch (error) {
    console.error('Ошибка обновления данных фильма!', error);
    return false;
  }
}

export async function deleteDBMovie(slug: string) {
  try {
    await deleteDoc(doc(db, 'movies', slug));
    return true;
  } catch (error) {
    console.error('Ошибка удаления фильма!', error);
    return false;
  }
}

export async function createDBCategory(category: Category) {
  try {
    await setDoc(doc(db, 'categories', category.slug), category);
    return true;
  } catch (error) {
    console.error('Ошибка создания категории!', error);
    return false;
  }
}

export async function deleteDBCategory(slug: string) {
  try {
    await deleteDoc(doc(db, 'categories', slug));
    return true;
  } catch (error) {
    console.error('Ошибка удаления категории!', error);
    return false;
  }
}

export async function updateDBUser(userData: User) {
  try {
    await updateDoc(doc(db, 'users', userData.slug), userData);
    return true;
  } catch (error) {
    console.error('Ошибка обновления пользователя!', error);
    return false;
  }
}

export async function deleteDBUser(slug: string) {
  try {
    await deleteDoc(doc(db, 'users', slug));
    return true;
  } catch (error) {
    console.error('Ошибка удаления пользователя!', error);
    return false;
  }
}
