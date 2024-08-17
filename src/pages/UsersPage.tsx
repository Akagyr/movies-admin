import useGetUsers from '../hooks/useGetUsers';
import UsersList from '../components/UsersList';

export default function UsersPage() {
    const users = useGetUsers();
    
    return (
      <>
        <h2 className='font-bold text-xl'>Пользователи:</h2>
        <UsersList users={users!} />
      </>
    );
}
