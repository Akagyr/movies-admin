import { ChangeEventHandler } from 'react';

export default function CustomInput({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  styles,
  required = false,
  error,
  minValue,
  maxValue,
}: {
  type?: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  styles?: string;
  required?: boolean;
  error?: string | null;
  minValue?: number;
  maxValue?: number;
}) {
  return (
    <>
      {type === 'number' ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          min={minValue}
          max={maxValue}
          placeholder={placeholder}
          required={required}
          className={`${styles ? `${styles} ` : ''}${
            error ? `border-[1px] border-red-600` : 'border-none'
          } text-sm rounded-lg block w-full py-2 px-3 bg-neutral-800 placeholder-gray-400 text-white`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${styles ? `${styles} ` : ''}${
            error ? `border-[1px] border-red-600` : 'border-none'
          } text-sm rounded-lg block w-full py-2 px-3 bg-neutral-800 placeholder-gray-400 text-white`}
        />
      )}
      <div className='text-red-600 text-sm mt-[5px] pl-[15px]'>{error ? error : ''}</div>
    </>
  );
}
