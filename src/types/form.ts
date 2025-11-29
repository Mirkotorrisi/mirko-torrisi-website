import { HTMLInputTypeAttribute } from "react";

export type FormFieldEntity = {
  pattern: string;
  message: string;
  placeholder: string;
  label: string;
  type?: HTMLInputTypeAttribute;
};

export type FormState = Record<string, FormField>;
export type FormField = { value: string; valid: boolean };
