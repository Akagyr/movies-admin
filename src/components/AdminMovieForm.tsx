'use client';

import { Movie, Rate } from '../../types';
import CustomInput from './custom/CustomInput';
import {
  addDBMovie,
  getDBElement,
  updateDBMovie,
} from '../database/databaseServices';
import slugify from 'slugify';
import { useState, ChangeEvent } from 'react';
import { collection, doc } from 'firebase/firestore';
import { db } from '../database/firebase';

type MovieForm = {
  image: {
    text: string;
    error: string | null;
  };
  name: {
    text: string;
    error: string | null;
  };
  // rates: {
  //   text: string | Rate[];
  // };
  category: {
    text: string;
    error: string | null;
  };
  duration: {
    text: string;
    error: string | null;
  };
  age: {
    text: string;
    error: string | null;
  };
  release_date: {
    text: string;
    error: string | null;
  };
  country: {
    text: string;
    error: string | null;
  };
  trailer: {
    text: string;
    error: string | null;
  };
};

export default function AdminMovieForm({
  movie,
  setIsOpenModal,
  setMovies,
}: {
  movie?: Movie;
  setIsOpenModal: (value: boolean) => void;
  setMovies: (value: Movie[]) => void;
}) {
  const initialState = {
    image: {
      text: movie ? movie.image : '',
      error: null,
    },
    name: {
      text: movie ? movie.name : '',
      error: null,
    },
    // rates: {
    //   text: movie ? movie.rates : '',
    // },
    category: {
      text: movie ? movie.category : '',
      error: null,
    },
    duration: {
      text: movie ? movie.duration : '',
      error: null,
    },
    age: {
      text: movie ? movie.age : '',
      error: null,
    },
    release_date: {
      text: movie ? movie.release_date : '',
      error: null,
    },
    country: {
      text: movie ? movie.country : '',
      error: null,
    },
    trailer: {
      text: movie ? movie.trailer : '',
      error: null,
    },
  };
  const [formData, setFormData] = useState<MovieForm>(initialState);

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
    const { image, name, category, duration, age, release_date, country, trailer } = formData;
    const urlPattern = /^https:\/\/static\.hdrezka\.ac\/(.*)$/;
    const isValidImageURL = urlPattern.test(image.text);

    if (
      image.text.trim() === '' ||
      !isValidImageURL ||
      name.text.trim() === '' ||
      category.text.trim() === '' ||
      duration.text.trim() === '' ||
      age.text.trim() === '' ||
      release_date.text.trim() === '' ||
      country.text.trim() === '' ||
      trailer.text.trim() === ''
    ) {
      setFormData((prevState) => ({
        ...prevState,
        image: {
          ...prevState.image,
          error:
            image.text.trim() === ''
              ? 'Поле не може бути пустим'
              : !isValidImageURL
              ? 'Поле должно быть ссылкой и начинатся с "https://static.hdrezka.ac/"'
              : image.error,
        },
        name: {
          ...prevState.name,
          error: name.text.trim() === '' ? 'Поле не може бути пустим' : name.error,
        },
        category: {
          ...prevState.category,
          error: category.text.trim() === '' ? 'Поле не може бути пустим' : category.error,
        },
        duration: {
          ...prevState.duration,
          error: duration.text.trim() === '' ? 'Поле не може бути пустим' : duration.error,
        },
        age: {
          ...prevState.age,
          error: age.text.trim() === '' ? 'Поле не може бути пустим' : age.error,
        },
        release_date: {
          ...prevState.release_date,
          error: release_date.text.trim() === '' ? 'Поле не може бути пустим' : release_date.error,
        },
        country: {
          ...prevState.country,
          error: country.text.trim() === '' ? 'Поле не може бути пустим' : country.error,
        },
        trailer: {
          ...prevState.trailer,
          error: trailer.text.trim() === '' ? 'Поле не може бути пустим' : trailer.error,
        },
      }));
      return;
    }

    if (movie) {
      await updateDBMovie({
        movieData: {
          slug: movie.slug,
          image: formData.image.text.trim() ? formData.image.text.trim() : movie.image,
          name: formData.name.text.trim() ? formData.name.text.trim() : movie.name,
          // rates: formData.rates.text ? formData.rates.text.toString() : movie.rates,
          category: formData.category.text.trim() ? formData.category.text.trim() : movie.category,
          duration: formData.duration.text.trim() ? formData.duration.text.trim() : movie.duration,
          age: formData.age.text.trim() ? formData.age.text.trim() : movie.age,
          release_date: formData.release_date.text.trim()
            ? formData.release_date.text.trim()
            : movie.release_date,
          country: formData.country.text.trim() ? formData.country.text.trim() : movie.country,
          trailer: formData.trailer.text.trim() ? formData.trailer.text.trim() : movie.trailer,
          added_date: movie.added_date,
        },
      });
      // setMovies((await getDBCollection(collection(db, 'movies'))) as Movie[]);
    } else {
      const slug = slugify(formData.name.text, {
        replacement: '-',
        lower: true,
        strict: true,
        locale: 'vi',
      });

      // const moviesDB = await getDBCollection(collection(db, 'movies'));
      // const isCreatedQuestion = moviesDB!.find((el) => el.slug === slug);
      // if (isCreatedQuestion) {
      //   // setAlertMessageType('error');
      //   // setAlertMessageText('Таке питання вже існує!');
      //   return;
      // }

      await addDBMovie({
        movie: {
          slug: slug,
          image: formData.image.text.trim(),
          name: formData.name.text.trim(),
          // rates: formData.rates.text ? formData.rates.text.toString() : '0',
          category: formData.category.text.trim(),
          duration: formData.duration.text.trim(),
          age: formData.age.text.trim(),
          release_date: formData.release_date.text.trim(),
          country: formData.country.text.trim(),
          trailer: formData.trailer.text.trim(),
          added_date: Date.now().toString(),
        },
      });

      const movieDB = await getDBElement(doc(db, 'movies', slug));
      if (movieDB) {
        // setMovies((await getDBCollection(collection(db, 'movies'))) as Movie[]);
        setFormData(initialState);
      } else {
        console.log('Error');
      }
    }
    setIsOpenModal(false);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className='w-[700px] p-[30px]'>
      <div className='mb-4'>
        <label htmlFor='image' className='block mb-1 ml-1 text-xs font-medium text-white'>
          Ccылка картинки
        </label>
        <CustomInput
          name='image'
          value={formData.image.text}
          onChange={handleChange}
          placeholder='https://static.hdrezka.ac/i/2021/11/4/id7b054718efbfy26j56t.jpeg'
          required={true}
          error={formData.image.error}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='name' className='block mb-1 ml-1 text-xs font-medium text-white'>
          Имя
        </label>
        <CustomInput
          name='name'
          value={formData.name.text}
          onChange={handleChange}
          placeholder='Дэдпул'
          required={true}
          error={formData.name.error}
        />
      </div>
      {/* <div className='mb-4'>
        <label htmlFor='rate' className='block mb-1 ml-1 text-xs font-medium text-white'>
          Рейтинг (не обязательно)
        </label>
        <CustomInput
          type='number'
          name='rate'
          value={formData.rate.text}
          onChange={handleChange}
          minValue={0}
          maxValue={10}
          placeholder='0-10'
        />
      </div> */}
      <div className='mb-4'>
        <label htmlFor='release_date' className='block mb-1 ml-1 text-xs font-medium text-white'>
          Дата выхода
        </label>
        <CustomInput
          name='release_date'
          value={formData.release_date.text}
          onChange={handleChange}
          placeholder='21 января 2016 года'
          required={true}
          error={formData.release_date.error}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='category' className='block mb-1 ml-1 text-xs font-medium text-white'>
          Категория
        </label>
        <CustomInput
          name='category'
          value={formData.category.text}
          onChange={handleChange}
          placeholder='	Фантастика, Боевики, Комедии, Приключения, Зарубежные'
          required={true}
          error={formData.category.error}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='country' className='block mb-1 ml-1 text-xs font-medium text-white'>
          Страна
        </label>
        <CustomInput
          name='country'
          value={formData.country.text}
          onChange={handleChange}
          placeholder='США'
          required={true}
          error={formData.country.error}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='duration' className='block mb-1 ml-1 text-xs font-medium text-white'>
          Длительность
        </label>
        <CustomInput
          name='duration'
          value={formData.duration.text}
          onChange={handleChange}
          placeholder='108 мин.'
          required={true}
          error={formData.duration.error}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='age' className='block mb-1 ml-1 text-xs font-medium text-white'>
          Возраст
        </label>
        <CustomInput
          name='age'
          value={formData.age.text}
          onChange={handleChange}
          placeholder='18+ только для взрослых'
          required={true}
          error={formData.age.error}
        />
      </div>
      <div className='mb-7'>
        <label htmlFor='trailer' className='block mb-1 ml-1 text-xs font-medium text-white'>
          Идентификатор трейлера (Youtube)
        </label>
        <CustomInput
          name='trailer'
          value={formData.trailer.text}
          onChange={handleChange}
          placeholder='EmH6VNG8QEE'
          required={true}
          error={formData.trailer.error}
        />
      </div>
      <button
        type='submit'
        className='mr-3 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700'
      >
        {movie ? 'Обновить' : 'Добавить'}
      </button>
      <button
        type='button'
        onClick={() => setIsOpenModal(false)}
        className='text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700'
      >
        Отмена
      </button>
    </form>
  );
}
