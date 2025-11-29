import React, { useState } from 'react';
import { FormField, FormFieldEntity } from '@/types/form';

type Props = {
  name: string;
  field: FormField;
  fieldConfig: FormFieldEntity;
  className: string;
  customWrapperClass?: string;
  onChange: (e: React.BaseSyntheticEvent<object, any, any>) => void;
};
const Input = ({
  name,
  field,
  className,
  onChange,
  fieldConfig,
  customWrapperClass,
}: Props) => {
  const { label, placeholder, pattern, message, type } = fieldConfig;
  const [touched, setTouched] = useState(false);
  const onBlur = () => {
    setTouched(true);
  };
  const showError = touched && !field.valid;
  const inputClassName = `${className} ${showError ? '!border-red-500' : ''}`;
  const wrapperClassName = `flex flex-col ${customWrapperClass ?? ''} ${
    showError ? 'text-red-500' : ''
  }`;
  return (
    <div className={wrapperClassName}>
      <span className="mb-2 text-xs font-bold tracking-wider text-zinc-400 uppercase">
        {label}
      </span>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={field.value}
          onChange={onChange}
          onFocus={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`${inputClassName} resize-none`}
        />
      ) : (
        <input
          name={name}
          value={field.value}
          onChange={onChange}
          onFocus={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          type={type || 'text'}
          pattern={pattern}
          className={inputClassName}
        />
      )}
      {showError && <span className="text-xs text-red-500">{message}</span>}
    </div>
  );
};

export default Input;
