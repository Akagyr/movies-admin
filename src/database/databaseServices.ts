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
import { Category, Movie } from '../../types';

export async function getDBElement(collection: DocumentReference<DocumentData, DocumentData>) {
  try {
    const document: DocumentSnapshot<DocumentData> = await getDoc(collection);
    const docData = document.data();
    return docData;
  } catch (error) {
    console.error('Error getting selected document:', error);
    return null;
  }
}

export async function createDBMovie(movie: Movie) {
  try {
    const dbMovie = await getDBElement(doc(db, 'movies', movie.slug));
    if (!dbMovie) {
      await setDoc(doc(db, 'movies', movie.slug), movie);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error add user with this id', error);
    return false;
  }
}

export async function updateDBMovie(movieData: Movie) {
  try {
    await updateDoc(doc(db, 'movies', movieData.slug), movieData);
    return true;
  } catch (error) {
    console.error(`Error add user with id - ${movieData.slug}:`, error);
    return false;
  }
}

export async function deleteDBMovie(slug: string) {
  try {
    await deleteDoc(doc(db, 'movies', slug));
    return true;
  } catch (error) {
    console.error(`Error delete movie with id - ${slug}:`, error);
    return false;
  }
}

export async function createDBCategory(category: Category) {
  try {
    await setDoc(doc(db, 'categories', category.slug), category);
    return true;
  } catch (error) {
    console.error('Ошибка добавления категории!', error);
    return false;
  }
}

export async function updateDBCategory(categoryData: Category) {
  try {
    await updateDoc(doc(db, 'categories', categoryData.slug), categoryData);
    return true;
  } catch (error) {
    console.error(`Ошибка обновления категории!`, error);
    return false;
  }
}

export async function deleteDBCategory(slug: string) {
  try {
    await deleteDoc(doc(db, 'categories', slug));
    return true;
  } catch (error) {
    console.error(`Ошибка удаления категории!`, error);
    return false;
  }
}
