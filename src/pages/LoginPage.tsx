import { useNavigate } from 'react-router-dom';
import { signIn } from '../helpers/authHelper';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const isAuth = await signIn({ email, password });

    if (isAuth) {
      navigate('/');
      toast.success('Вход выполнен успешно!');
    } else {
      toast.error("Неправильные почта или пароль!");
    }
  };

  return (
    <main className='flex justify-center py-[40px]'>
      <form
        onSubmit={handleSubmit}
        className='w-[450px] flex flex-col gap-[20px] bg-[#201f1f] p-[30px] text-black rounded-lg'
      >
        <div className='flex flex-col gap-[5px]'>
          <label className='font-semibold text-sm text-white' htmlFor='login'>
            Email
          </label>
          <input
            className='rounded-md px-[10px] py-[5px] text-sm font-semibold outline-none'
            id='email'
            name='email'
            type='text'
          />
        </div>
        <div className='flex flex-col gap-[5px]'>
          <label className='font-semibold text-sm text-white' htmlFor='password'>
            Password
          </label>
          <input
            className='rounded-md px-[10px] py-[5px] text-sm outline-none'
            id='password'
            name='password'
            type='password'
          />
        </div>
        <button
          className='bg-red-800 p-[8px_20px] w-fit rounded-lg text-sm text-white font-semibold'
          type='submit'
        >
          Submit
        </button>
      </form>
    </main>
  );
}
