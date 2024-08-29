import { useState } from 'react';
import { User } from '../../types';
import UsersListItem from './UsersListItem';
import Pagination from './Pagination';
import NoElements from './NoElements';

export default function UsersList({
  users,
  setCurrentUser,
  setIsOpenModal,
}: {
  users: User[];
  setCurrentUser: (value: User) => void;
  setIsOpenModal: (value: boolean) => void;
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const showUsers = currentUsers?.map((user) => (
    <UsersListItem
      key={user.slug}
      user={user}
      setCurrentUser={setCurrentUser}
      setIsOpenModal={setIsOpenModal}
    />
  ));

  return (
    <div className='flex flex-col gap-[20px] h-full'>
      {showUsers.length === 0 ? (
        <NoElements />
      ) : (
        <>
          {showUsers}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
