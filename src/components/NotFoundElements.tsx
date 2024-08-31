export default function NotFoundElements() {
  return (
    <div className='flex flex-col justify-center items-center gap-[5px] bg-[#141313] h-full rounded-2xl'>
      <img src='/images/notFoundElements.svg' alt='Not found' />
      <p className="text-xl font-bold">Записей не найдено</p>
    </div>
  );
}
