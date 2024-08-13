import { Link } from 'react-router-dom';
import { Movie } from '../../types';
import { deleteDBMovie } from '../database/databaseServices';
import { toast } from 'react-toastify';

export default function MoviesListItem({ movie }: { movie: Movie }) {
  const deleteMovie = async (slug: string) => {
    try {
      // await deleteDBMovie({ slug });
      toast.success('Успешно удален!');
    } catch {
      toast.error('Ошибка при удалении! Попробуйте позже!');
    }
  };

  return (
    <div className='grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr_1fr_100px] gap-[30px] items-center text-center bg-red-800/10 rounded-lg'>
      <img src={movie.image} className='rounded-lg w-[100px] aspect-[3/4]' alt={movie.name} />
      <h2 className='text-lg font-semibold'>{movie.name}</h2>
      <p>{movie.category}</p>
      <p>{movie.country}</p>
      <p>{movie.release_date}</p>
      <p>{movie.age}</p>
      <p>{movie.duration}</p>
      <div className='flex flex-col justify-evenly h-full items-center'>
        <Link
          to={`${movie.slug}/update`}
          className='px-[10px] py-[8px] bg-blue-800 w-fit rounded-lg'
        >
          Изменить
        </Link>
        <button
          onClick={() => deleteMovie(movie.slug)}
          className='px-[15px] py-[8px] bg-red-800 w-fit rounded-lg'
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
