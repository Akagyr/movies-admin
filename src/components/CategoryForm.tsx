import CustomInput from './custom/CustomInput';
import { createDBCategory, getDBElement } from '../database/databaseServices';
import { useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { doc } from 'firebase/firestore';
import { db } from '../database/firebase';
import { slugCreate } from '../helpers/slugHelper';

type CategoryFormType = {
  name: {
    text: string;
    error: string | null;
  };
};

const initialState = {
  name: {
    text: '',
    error: null,
  },
};

export default function CategoryForm({
  setIsOpenModal,
}: {
  setIsOpenModal: (value: boolean) => void;
}) {
  const [formData, setFormData] = useState<CategoryFormType>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error: string | null = null;

    if (value.trim() === '') {
      error = 'Поле не может быть пустым';
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        text: value,
        error,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name } = formData;

    if (name.text.trim() === '') {
      setFormData((prevState) => ({
        ...prevState,
        name: {
          ...prevState.name,
          error: 'Поле не может быть пустым',
        },
      }));
      return;
    }

    const slug = slugCreate(formData.name.text);

    const dbCategory = await getDBElement(doc(db, 'categories', slug));
    if (dbCategory) {
      toast.error('Такая категория уже создана!');
    } else {
      const request = await createDBCategory({
        slug: slug,
        name: formData.name.text.trim(),
      });

      request
        ? toast.success('Категория успешно создана!')
        : toast.error('Ошибка создания категории!');

      setIsOpenModal(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className='w-[500px]'>
      <div>
        <CustomInput
          name='name'
          value={formData.name.text}
          onChange={handleChange}
          placeholder='Имя категории'
          required={true}
          error={formData.name.error}
        />
      </div>
      <div className='flex gap-[20px] justify-end items-center'>
        <button type='submit' className='rounded-lg px-[15px] py-[10px] mt-[10px] bg-green-800'>
          Добавить
        </button>
        <button
          type='button'
          onClick={() => setIsOpenModal(false)}
          className='rounded-lg px-[15px] py-[10px] mt-[10px] bg-red-800'
        >
          Отменить
        </button>
      </div>
    </form>
  );
}
