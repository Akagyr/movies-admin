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
            error ? `border-[1px] border-red-700` : 'border-none'
          } rounded-lg block w-full py-[10px] px-[15px] bg-neutral-800 placeholder-gray-400 text-white`}
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
            error ? `border-[1px] border-red-700` : 'border-none'
          } rounded-lg block w-full py-[10px] px-[15px] bg-neutral-800 placeholder-gray-400 text-white`}
        />
      )}
      <div className='text-red-600 font-medium text-sm mt-[5px] pl-[10px]'>{error ? error : ''}</div>
    </>
  );
}
