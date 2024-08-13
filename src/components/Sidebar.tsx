import { Link } from "react-router-dom";

export function LinkSidebar({ text, link }: { text: string; link: string }) {
  return (
    <Link
      to={link}
      className='block w-[60%] mx-auto px-1 py-2.5 rounded-lg hover:bg-red-800 font-medium text-sm cursor-pointer'
    >
      {text}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className='h-full lg:flex flex-col gap-[10px] bg-[#141313] text-center py-[20px]'>
      <LinkSidebar text='Фильмы' link='/' />
      <LinkSidebar text='Пользователи' link='users' />
      <LinkSidebar text='Категории' link='categories' />
    </aside>
  );
}
