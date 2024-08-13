import { Link } from 'react-router-dom';
import { User } from '../../types';
import { toast } from 'react-toastify';

export default function UsersListItem({ user }: { user: User }) {
  const deleteUser = async (slug: string) => {
    try {
      // await deleteDBMovie({ slug });
      toast.success('Успешно удален!');
    } catch {
      toast.error('Ошибка при удалении! Попробуйте позже!');
    }
  };
  
  return (
    <div className='grid grid-cols-[100px_1fr_1fr_1fr_200px] gap-[30px] items-center text-center bg-red-800/10 rounded-lg py-[10px] px-[20px]'>
      <img src={user.photoURL} className='rounded-full w-[80px] place-self-center' alt={user.displayName} />
      <h2 className='text-lg font-semibold'>{user.displayName}</h2>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <div className='flex gap-[10px] items-center justify-center'>
        <Link
          to={`${user.uid}/update`}
          className='px-[10px] py-[8px] bg-blue-800 w-fit rounded-lg'
        >
          Изменить
        </Link>
        <button
          onClick={() => deleteUser(user.uid)}
          className='px-[15px] py-[8px] bg-red-800 w-fit rounded-lg'
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
