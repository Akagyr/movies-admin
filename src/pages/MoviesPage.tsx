import useGetMovies from '../hooks/useGetMovies';
import MoviesList from '../components/MoviesList';
import MovieForm from '../components/MovieForm';
import { useState } from 'react';
import { Movie } from '../../types';
import CustomModal from '../components/custom/CustomModal';
import Loading from '../components/Loading';
import CustomSearchInput from '../components/custom/CustomSearchInput';

export default function MoviesPage() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const movies = useGetMovies();
  const [filteredMovies, setFilteredMovies] = useState<Movie[] | null>(null);

  if (!movies) {
    return <Loading />;
  }

  return (
    <div className='flex flex-col gap-[25px] h-full'>
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
      <CustomSearchInput items={movies} setFilteredItems={setFilteredMovies} />
      <MoviesList
        movies={filteredMovies ? filteredMovies : movies}
        setCurrentMovie={setCurrentMovie}
        setIsOpenModal={setIsOpenModal}
      />
    </div>
  );
}
