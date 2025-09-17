import { v4, validate } from 'uuid';

export const generateUuid = () => {
  return v4();
};

export const isUuid = (value: string) => {
  return validate(value);
};
