import useGetUsers from '../hooks/useGetUsers';
import UsersList from '../components/UsersList';
import { useState } from 'react';
import CustomModal from '../components/custom/CustomModal';
import UserForm from '../components/UserForm';
import { User } from '../../types';
import Loading from '../components/Loading';
import CustomSearchInput from '../components/custom/CustomSearchInput';

export default function UsersPage() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const users = useGetUsers();
  const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);

  if (!users) {
    return <Loading />;
  }

  return (
    <div className='flex flex-col gap-[25px] h-full'>
      <CustomModal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <UserForm user={currentUser} setIsOpenModal={setIsOpenModal} />
      </CustomModal>
      <h2 className='font-bold text-xl'>Пользователи:</h2>
      <CustomSearchInput items={users} setFilteredItems={setFilteredUsers} />
      <UsersList
        users={filteredUsers ? filteredUsers : users}
        setCurrentUser={setCurrentUser}
        setIsOpenModal={setIsOpenModal}
      />
    </div>
  );
}
