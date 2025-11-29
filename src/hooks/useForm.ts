import { BaseSyntheticEvent, useMemo, useReducer } from 'react';
import { FormField, FormFieldEntity, FormState } from '../types/form';

type Action = { key: string; payload: FormField };

const reducer = (state: FormState, action: Action) => ({
  ...state,
  [action.key]: action.payload,
});

const useForm = (fields: Record<string, FormFieldEntity>) => {
  const initialForm = useMemo(
    () =>
      Object.keys(fields).reduce(
        (acc, key) => ({
          ...acc,
          [key]: {
            value: '',
            valid: false,
          },
        }),
        {}
      ),
    [fields]
  );
  const [form, dispatch] = useReducer(reducer, initialForm);

  const handleChange = (e: BaseSyntheticEvent) => {
    dispatch({
      key: e.target.name,
      payload: {
        value: e.target.value,
        valid: e.target.validity.valid,
      },
    });
  };
  return { form, handleChange };
};

export default useForm;
