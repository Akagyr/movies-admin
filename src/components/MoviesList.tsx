import { Movie } from '../../types';
import MoviesListItem from './MoviesListItem';

export default function MoviesList({
  movies,
  setCurrentMovie,
  setIsOpenModal,
}: {
  movies: Movie[];
  setCurrentMovie: (value: Movie) => void;
  setIsOpenModal: (value: boolean) => void;
}) {
  const showMovies = movies?.map((mov) => (
    <MoviesListItem
      key={mov.slug}
      movie={mov}
      setCurrentMovie={setCurrentMovie}
      setIsOpenModal={setIsOpenModal}
    />
  ));

  return <div className='flex flex-col gap-[20px] mt-[30px]'>{showMovies}</div>;
}
