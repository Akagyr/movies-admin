import useGetUsers from '../hooks/useGetUsers';
import UsersList from '../components/UsersList';
import { useState } from 'react';
import CustomModal from '../components/custom/CustomModal';
import UserForm from '../components/UserForm';
import { User } from '../../types';

export default function UsersPage() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const users = useGetUsers();

  return (
    <>
      <CustomModal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <UserForm user={currentUser} setIsOpenModal={setIsOpenModal} />
      </CustomModal>
      <h2 className='font-bold text-xl'>Пользователи:</h2>
      <UsersList users={users!} setCurrentUser={setCurrentUser} setIsOpenModal={setIsOpenModal} />
    </>
  );
}
