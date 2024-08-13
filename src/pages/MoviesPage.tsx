import { Link } from 'react-router-dom';
import useGetMovies from '../hooks/useGetMovies';
import MoviesList from '../components/MoviesList';

export default function MoviesPage() {
  const movies = useGetMovies();

  return (
    <main className='py-[50px] px-[100px]'>
      <Link to='movie/create' className='block px-[15px] py-[8px] bg-green-800 w-fit rounded-lg'>Добавить новый фильм</Link>
      <MoviesList movies={movies!} />
    </main>
  );
}
