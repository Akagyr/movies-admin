import useGetUsers from '../hooks/useGetUsers';
import UsersList from '../components/UsersList';

export default function UsersPage() {
    const users = useGetUsers();
    
    return (
      <main className='py-[50px] px-[100px]'>
        <h2 className='font-bold text-xl'>Пользователи:</h2>
        <UsersList users={users!} />
      </main>
    );
}
