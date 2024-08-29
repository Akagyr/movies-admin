import { User } from '../../types';
import { toast } from 'react-toastify';
import { deleteDBUser } from '../database/databaseServices';

export default function UsersListItem({
  user,
  setCurrentUser,
  setIsOpenModal,
}: {
  user: User;
  setCurrentUser: (value: User) => void;
  setIsOpenModal: (value: boolean) => void;
}) {
  const handleDeleteUser = async (slug: string) => {
    try {
      const request = await deleteDBUser(slug);
      if (request) {
        toast.success('Успешно удален!');
      } else {
        toast.error('Ошибка удаления пользователя!');
      }
    } catch {
      toast.error('Ошибка удаления пользователя!');
    }
  };

  const handleUpdateUser = async () => {
    setCurrentUser(user);
    setIsOpenModal(true);
  };

  return (
    <div className='grid grid-cols-[100px_1fr_1fr_1fr_200px] gap-[30px] items-center text-center bg-red-800/10 rounded-lg py-[10px] px-[20px]'>
      <img
        src={user.photo}
        className='rounded-full w-[80px] place-self-center'
        alt={user.name}
      />
      <h2 className='text-lg font-semibold'>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <div className='flex gap-[10px] items-center justify-center'>
        <button
          onClick={() => handleUpdateUser()}
          className='px-[10px] py-[8px] bg-blue-800 w-fit rounded-lg'
        >
          Изменить
        </button>
        <button
          onClick={() => handleDeleteUser(user.slug)}
          className='px-[15px] py-[8px] bg-red-800 w-fit rounded-lg'
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
