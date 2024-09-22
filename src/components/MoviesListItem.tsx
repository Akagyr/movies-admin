import { Movie } from '../../types';
import { deleteDBMovie } from '../database/databaseServices';
import { toast } from 'react-toastify';
import { convertTimestampToDate } from '../helpers/convertTimestampToDateHelper';

export default function MoviesListItem({
  movie,
  setCurrentMovie,
  setIsOpenModal,
}: {
  movie: Movie;
  setCurrentMovie: (value: Movie) => void;
  setIsOpenModal: (value: boolean) => void;
}) {
  const convertedDate = convertTimestampToDate(movie.release_date);

  const handleDeleteMovie = async (slug: string) => {
    try {
      const request = await deleteDBMovie(slug);
      if (request) {
        toast.success('Успешно удален!');
      } else {
        toast.error('Ошибка удаления пользователя!');
      }
    } catch {
      toast.error('Ошибка удаления пользователя!');
    }
  };

  const handleUpdateMovie = async () => {
    setCurrentMovie(movie);
    setIsOpenModal(true);
  };

  return (
    <div className='grid grid-cols-[95px_1fr_1fr_1fr_1fr_1fr_1fr_100px] gap-[30px] items-center text-center bg-red-800/10 rounded-lg'>
      <img src={movie.image} className='rounded-lg w-[95px] aspect-[3/4]' alt={movie.name} />
      <h2 className='text-lg font-semibold'>{movie.name}</h2>
      <p>{movie.category}</p>
      <p>{movie.country}</p>
      <p>{convertedDate}</p>
      <p>{movie.age}</p>
      <p>{movie.duration}</p>
      <div className='flex flex-col justify-evenly h-full items-center'>
        <button
          onClick={() => handleUpdateMovie()}
          className='px-[10px] py-[8px] bg-blue-800 w-fit rounded-lg'
        >
          Изменить
        </button>
        <button
          onClick={() => handleDeleteMovie(movie.slug)}
          className='px-[15px] py-[8px] bg-red-800 w-fit rounded-lg'
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
