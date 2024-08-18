import { useState } from 'react';
import { Movie } from '../../types';
import MoviesListItem from './MoviesListItem';
import Pagination from './Pagination';

export default function MoviesList({
  movies,
  setCurrentMovie,
  setIsOpenModal,
}: {
  movies: Movie[];
  setCurrentMovie: (value: Movie) => void;
  setIsOpenModal: (value: boolean) => void;
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const moviesPerPage = 4;
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const showMovies = currentMovies?.map((mov) => (
    <MoviesListItem
      key={mov.slug}
      movie={mov}
      setCurrentMovie={setCurrentMovie}
      setIsOpenModal={setIsOpenModal}
    />
  ));

  return (
    <div className='flex flex-col gap-[20px] mt-[30px]'>
      {showMovies}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
