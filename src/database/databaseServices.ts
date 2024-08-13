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
import { Movie } from '../../types';

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

export async function addDBMovie({ movie }: { movie: Movie }) {
  try {
    const dbMovie = await getDBElement(doc(db, 'movies', movie.slug));
    if (!dbMovie) {
      await setDoc(doc(db, 'movies', movie.slug), movie);
    }
  } catch (error) {
    console.error('Error add user with this id', error);
  }
}

export async function updateDBMovie({ movieData }: { movieData: Movie }) {
  try {
    await updateDoc(doc(db, 'movies', movieData.slug), movieData);
  } catch (error) {
    console.error(`Error add user with id - ${movieData.slug}:`, error);
  }
}

export async function deleteDBMovie({ slug }: { slug: string }) {
  try {
    await deleteDoc(doc(db, 'movies', slug));
  } catch (error) {
    console.error(`Error delete movie with id - ${slug}:`, error);
    return null;
  }
}
