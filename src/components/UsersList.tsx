import { User } from '../../types';
import UsersListItem from './UsersListItem';

export default function UsersList({ users }: { users: User[] }) {
    const showUsers = users?.map((user) => <UsersListItem key={user.uid} user={user} />);

    return <div className='flex flex-col gap-[20px] mt-[15px]'>{showUsers}</div>;
}
