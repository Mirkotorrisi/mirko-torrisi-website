import React, { useState } from 'react';
import Loader from '@/components/Loader';
import Input from '@/components/Input';
import useForm from '@/hooks/useForm';
import { FormField, FormFieldEntity } from '@/types/form';

type Props = {
  thankYouMsg: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => any;
  formConfig: Record<string, FormFieldEntity>;
  submitLabel: string;
  formClassNames: {
    container: string;
    input: string;
    submit: string;
    [key: string]: string;
  };
};

const Form = ({
  handleSubmit,
  formConfig,
  submitLabel,
  formClassNames,
  thankYouMsg,
}: Props) => {
  const { form, handleChange } = useForm(formConfig);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const hasErrors = Object.values(form as FormData).some(
    (v: FormField) => !v.valid
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    await handleSubmit(e);
    setLoading(false);
    setSuccess(true);
  };

  return (
    <form onSubmit={onSubmit} className={formClassNames.container}>
      {Object.entries(form).map(([key, field]) => (
        <Input
          name={key}
          key={key}
          field={field as FormField}
          className={formClassNames.input}
          onChange={handleChange}
          fieldConfig={formConfig[key]}
          customWrapperClass={formClassNames[key]}
        />
      ))}
      <div className={formClassNames.submitContainer}>
        <input
          type="submit"
          className={formClassNames.submit}
          value={submitLabel}
          disabled={hasErrors}
        />
        {loading && <Loader />}
      </div>
      {success && <p className={formClassNames.thankYouMsg}>{thankYouMsg}</p>}
    </form>
  );
};

export default Form;
