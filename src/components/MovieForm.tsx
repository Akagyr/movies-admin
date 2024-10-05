import { Movie } from '../../types';
import CustomInput from './custom/CustomInput';
import { createDBMovie, getDBElement, updateDBMovie } from '../database/databaseServices';
import { useState, ChangeEvent, useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { db } from '../database/firebase';
import { slugCreate } from '../helpers/slugHelper';
import { toast } from 'react-toastify';

type MovieForm = {
  image: {
    text: string;
    error: string | null;
  };
  name: {
    text: string;
    error: string | null;
  };
  category: {
    text: string;
    error: string | null;
  };
  director: {
    text: string;
    error: string | null;
  };
  actors: {
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
  brief_plot: {
    text: string;
    error: string | null;
  };
};

const initialState = {
  image: {
    text: '',
    error: null,
  },
  name: {
    text: '',
    error: null,
  },
  category: {
    text: '',
    error: null,
  },
  director: {
    text: '',
    error: null,
  },
  actors: {
    text: '',
    error: null,
  },
  duration: {
    text: '',
    error: null,
  },
  age: {
    text: '',
    error: null,
  },
  release_date: {
    text: '',
    error: null,
  },
  country: {
    text: '',
    error: null,
  },
  trailer: {
    text: '',
    error: null,
  },
  brief_plot: {
    text: '',
    error: null,
  },
};

export default function MovieForm({
  movie,
  setIsOpenModal,
  setCurrentMovie,
}: {
  movie: Movie | null;
  setIsOpenModal: (value: boolean) => void;
  setCurrentMovie: (value: Movie | null) => void;
}) {
  const [formData, setFormData] = useState<MovieForm>(initialState);

  useEffect(() => {
    if (movie) {
      setFormData((prevState) => ({
        ...prevState,
        image: {
          ...prevState.image,
          text: movie.image,
        },
        name: {
          ...prevState.name,
          text: movie.name,
        },
        category: {
          ...prevState.category,
          text: movie.category,
        },
        director: {
          ...prevState.director,
          text: movie.director,
        },
        actors: {
          ...prevState.actors,
          text: movie.actors,
        },
        duration: {
          ...prevState.duration,
          text: movie.duration,
        },
        age: {
          ...prevState.age,
          text: movie.age,
        },
        release_date: {
          ...prevState.release_date,
          text: movie.release_date.toString(),
        },
        country: {
          ...prevState.country,
          text: movie.country,
        },
        trailer: {
          ...prevState.trailer,
          text: movie.trailer,
        },
        brief_plot: {
          ...prevState.brief_plot,
          text: movie.brief_plot,
        },
      }));
    }
  }, [movie]);

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
    const {
      image,
      name,
      category,
      duration,
      age,
      release_date,
      country,
      trailer,
      director,
      actors,
      brief_plot,
    } = formData;
    const urlPattern = /^https:\/\/static\.hdrezka\.ac\/.*\.(jpg|jpeg)$/i;
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
      trailer.text.trim() === '' ||
      director.text.trim() === '' ||
      actors.text.trim() === '' ||
      brief_plot.text.trim() === ''
    ) {
      setFormData((prevState) => ({
        ...prevState,
        image: {
          ...prevState.image,
          error:
            image.text.trim() === ''
              ? 'Поле не может быть пустым'
              : !isValidImageURL
              ? 'Ссылка должна начинатся с "https://static.hdrezka.ac/" и иметь расширение .jpg или .jpeg'
              : image.error,
        },
        name: {
          ...prevState.name,
          error: name.text.trim() === '' ? 'Поле не может быть пустым' : name.error,
        },
        category: {
          ...prevState.category,
          error: category.text.trim() === '' ? 'Поле не может быть пустым' : category.error,
        },
        duration: {
          ...prevState.duration,
          error: duration.text.trim() === '' ? 'Поле не может быть пустым' : duration.error,
        },
        age: {
          ...prevState.age,
          error: age.text.trim() === '' ? 'Поле не может быть пустым' : age.error,
        },
        release_date: {
          ...prevState.release_date,
          error: release_date.text.trim() === '' ? 'Поле не может быть пустым' : release_date.error,
        },
        country: {
          ...prevState.country,
          error: country.text.trim() === '' ? 'Поле не может быть пустым' : country.error,
        },
        trailer: {
          ...prevState.trailer,
          error: trailer.text.trim() === '' ? 'Поле не может быть пустым' : trailer.error,
        },
        director: {
          ...prevState.director,
          error: director.text.trim() === '' ? 'Поле не может быть пустым' : director.error,
        },
        actors: {
          ...prevState.actors,
          error: actors.text.trim() === '' ? 'Поле не может быть пустым' : actors.error,
        },
        brief_plot: {
          ...prevState.brief_plot,
          error: brief_plot.text.trim() === '' ? 'Поле не может быть пустым' : brief_plot.error,
        },
      }));
      return;
    }

    if (movie) {
      if (
        image.text.trim() === movie.image &&
        name.text.trim() === movie.name &&
        category.text.trim() === movie.category &&
        duration.text.trim() === movie.duration &&
        age.text.trim() === movie.age &&
        release_date.text.trim() === movie.release_date.toString() &&
        country.text.trim() === movie.country &&
        trailer.text.trim() === movie.trailer &&
        director.text.trim() === movie.director &&
        actors.text.trim() === movie.actors &&
        brief_plot.text.trim() === movie.brief_plot
      ) {
        toast.error(`У фильма не изменились данные!`);
        return;
      } else {
        const request = await updateDBMovie({
          slug: movie.slug,
          image: formData.image.text.trim() ? formData.image.text.trim() : movie.image,
          name: formData.name.text.trim() ? formData.name.text.trim() : movie.name,
          rates: movie.rates,
          category: formData.category.text.trim() ? formData.category.text.trim() : movie.category,
          duration: formData.duration.text.trim() ? formData.duration.text.trim() : movie.duration,
          age: formData.age.text.trim() ? formData.age.text.trim() : movie.age,
          release_date: formData.release_date.text.trim()
            ? formData.release_date.text.trim()
            : movie.release_date,
          country: formData.country.text.trim() ? formData.country.text.trim() : movie.country,
          trailer: formData.trailer.text.trim() ? formData.trailer.text.trim() : movie.trailer,
          added_date: movie.added_date,
          comments: movie.comments,
          director: formData.director.text.trim() ? formData.director.text.trim() : movie.director,
          actors: formData.actors.text.trim() ? formData.actors.text.trim() : movie.actors,
          brief_plot: formData.brief_plot.text.trim()
            ? formData.brief_plot.text.trim()
            : movie.brief_plot,
        });

        request
          ? toast.success('Данные пользователя успешно обновлены!')
          : toast.error('Ошибка обновления данных пользователя!');
      }
    } else {
      const slug = slugCreate(formData.name.text);
      const dbMovie = await getDBElement(doc(db, 'movies', slug));

      if (dbMovie) {
        toast.error('Такой фильм уже создан!');
        return;
      } else {
        const request = await createDBMovie({
          slug: slug,
          image: formData.image.text.trim(),
          name: formData.name.text.trim(),
          rates: [],
          category: formData.category.text.trim(),
          duration: formData.duration.text.trim(),
          age: formData.age.text.trim(),
          release_date: formData.release_date.text.trim(),
          country: formData.country.text.trim(),
          trailer: formData.trailer.text.trim(),
          added_date: Date.now(),
          comments: [],
          director: formData.director.text.trim(),
          actors: formData.actors.text.trim(),
          brief_plot: formData.brief_plot.text.trim(),
        });

        request ? toast.success('Фильм успешно создан!') : toast.error('Ошибка создания фильма!');
      }
    }
    setIsOpenModal(false);
  };

  const handleCancelSubmit = () => {
    setIsOpenModal(false);
    setCurrentMovie(null);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className='w-[600px] flex flex-col gap-[20px]'>
      <div>
        <label htmlFor='image' className='block mb-1 ml-1 text-xs font-medium text-white'>
          Ccылка картинки
        </label>
        <CustomInput
          id='image'
          name='image'
          value={formData.image.text}
          onChange={handleChange}
          placeholder='https://static.hdrezka.ac/i/2021/11/4/id7b054718efbfy26j56t.jpeg'
          required={true}
          error={formData.image.error}
        />
      </div>
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
        <label htmlFor='director' className='block mb-1 ml-1 text-xs font-medium text-white'>
          Режиссер
        </label>
        <CustomInput
          name='director'
          value={formData.director.text}
          onChange={handleChange}
          placeholder='Джеймс Уоткинс'
          required={true}
          error={formData.director.error}
        />
      </div>
      <div>
        <label htmlFor='category' className='block mb-1 ml-1 text-xs font-medium text-white'>
          Категория
        </label>
        <CustomInput
          name='category'
          value={formData.category.text}
          onChange={handleChange}
          placeholder='Фантастика, Боевики, Комедии, Приключения, Зарубежные'
          required={true}
          error={formData.category.error}
        />
      </div>
      <div>
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
      <div>
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
      <div>
        <label htmlFor='actors' className='block mb-1 ml-1 text-xs font-medium text-white'>
          Актеры
        </label>
        <CustomInput
          name='actors'
          value={formData.actors.text}
          onChange={handleChange}
          placeholder='Райан Рейнольдс, ...'
          required={true}
          error={formData.actors.error}
        />
      </div>
      <div>
        <label htmlFor='brief_plot' className='block mb-1 ml-1 text-xs font-medium text-white'>
          Краткий сюжет
        </label>
        <CustomInput
          name='brief_plot'
          value={formData.brief_plot.text}
          onChange={handleChange}
          placeholder='Про что фильм...'
          required={true}
          error={formData.brief_plot.error}
        />
      </div>
      <div className='flex gap-[20px] justify-end items-center'>
        <button type='submit' className='rounded-lg px-[15px] py-[10px] bg-green-800'>
          {movie ? 'Обновить' : 'Добавить'}
        </button>
        <button
          type='button'
          onClick={() => handleCancelSubmit()}
          className='rounded-lg px-[15px] py-[10px] bg-red-800'
        >
          Отменить
        </button>
      </div>
    </form>
  );
}
