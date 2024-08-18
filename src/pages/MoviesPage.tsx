import useGetMovies from '../hooks/useGetMovies';
import MoviesList from '../components/MoviesList';
import MovieForm from '../components/MovieForm';
import { useState } from 'react';
import { Movie } from '../../types';
import CustomModal from '../components/custom/CustomModal';
import Loading from '../components/Loading';

export default function MoviesPage() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const movies = useGetMovies();

  return (
    <>
      <CustomModal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <MovieForm
          movie={currentMovie}
          setCurrentMovie={setCurrentMovie}
          setIsOpenModal={setIsOpenModal}
        />
      </CustomModal>
      <button
        onClick={() => setIsOpenModal(true)}
        className='px-[15px] py-[8px] bg-green-800 w-fit rounded-lg'
      >
        Добавить новый фильм
      </button>
      {movies ? (
        <MoviesList
          movies={movies!}
          setCurrentMovie={setCurrentMovie}
          setIsOpenModal={setIsOpenModal}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
