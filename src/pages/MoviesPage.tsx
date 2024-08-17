import { Link } from 'react-router-dom';
import useGetMovies from '../hooks/useGetMovies';
import MoviesList from '../components/MoviesList';
import MovieForm from '../components/MovieForm';

export default function MoviesPage() {
  const movies = useGetMovies();

  return (
    <>
      <Link to='movie/create' className='block px-[15px] py-[8px] bg-green-800 w-fit rounded-lg'>Добавить новый фильм</Link>
      {/* <MovieForm /> */}
      <MoviesList movies={movies!} />
    </>
  );
}
