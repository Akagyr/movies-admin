import { Movie } from '../../types';
import MoviesListItem from './MoviesListItem';

export default function MoviesList({ movies }: { movies: Movie[] }) {
  const showMovies = movies?.map((mov) => <MoviesListItem key={mov.slug} movie={mov} />);

  return <div className='flex flex-col gap-[20px] mt-[30px]'>{showMovies}</div>;
}
