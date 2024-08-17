import { User } from '../../types';
import UsersListItem from './UsersListItem';

export default function UsersList({
  users,
  setCurrentUser,
  setIsOpenModal,
}: {
  users: User[];
  setCurrentUser: (value: User) => void;
  setIsOpenModal: (value: boolean) => void;
}) {
  const showUsers = users?.map((user) => (
    <UsersListItem
      key={user.uid}
      user={user}
      setCurrentUser={setCurrentUser}
      setIsOpenModal={setIsOpenModal}
    />
  ));

  return <div className='flex flex-col gap-[20px] mt-[15px]'>{showUsers}</div>;
}
