import { updateDBUser } from '../database/databaseServices';
import { toast } from 'react-toastify';
import { User } from '../../types';
import { useState } from 'react';

export default function UserForm({
  user,
  setIsOpenModal,
}: {
  user: User | null;
  setIsOpenModal: (value: boolean) => void;
}) {
  const [currentRole, setCurrentRole] = useState<'user' | 'admin'>(user!.role);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user) {
      if (currentRole === user.role) {
        toast.error(`Пользователь уже является - ${currentRole} !`);
      } else {
        const request = await updateDBUser({
          slug: user.slug,
          name: user.name,
          email: user.email,
          role: currentRole,
        });

        request
          ? toast.success('Данные пользователя успешно обновлены!')
          : toast.error('Ошибка обновления данных пользователя!');

        setIsOpenModal(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className='flex flex-col gap-[10px]'>
        <div className='flex gap-[10px] items-center'>
          <input
            type='radio'
            id='role1'
            name='role'
            value='admin'
            onChange={() => setCurrentRole('admin')}
            checked={currentRole === 'admin' ? true : false}
          />
          <label htmlFor='role1'>Admin</label>
        </div>
        <div className='flex gap-[10px] items-center'>
          <input
            type='radio'
            id='role2'
            name='role'
            value='user'
            onChange={() => setCurrentRole('user')}
            checked={currentRole === 'user' ? true : false}
          />
          <label htmlFor='role2'>User</label>
        </div>
      </div>
      <div className='flex gap-[20px] mt-[20px] justify-end items-center'>
        <button type='submit' className='rounded-lg px-[15px] py-[10px] bg-green-800'>
          Добавить
        </button>
        <button
          type='button'
          onClick={() => setIsOpenModal(false)}
          className='rounded-lg px-[15px] py-[10px] bg-red-800'
        >
          Отменить
        </button>
      </div>
    </form>
  );
}
