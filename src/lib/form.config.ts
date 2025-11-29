import { FormFieldEntity } from '@/types/form';

export const formConfig: Record<string, FormFieldEntity> = {
  name: {
    pattern: '^.+$',
    message: 'Please insert a valid name',
    label: 'Name',
    placeholder: 'Your name',
  },
  surname: {
    pattern: '^.+$',
    message: 'Please insert a valid surname',
    label: 'Surname',
    placeholder: 'Your surname',
  },
  email: {
    pattern: '[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+',
    message: 'Please insert a valid email',
    label: 'Email',
    placeholder: 'Your email',
    type: 'email',
  },
  phone: {
    pattern: '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$',
    message: 'Please insert a valid phone',
    label: 'Phone number',
    placeholder: 'Your phone number',
    type: 'number',
  },
  message: {
    pattern: '^.+$',
    message: 'Please leave a message',
    label: 'Message',
    placeholder: '',
    type: 'textarea',
  },
};
