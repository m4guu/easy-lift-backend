import { User } from 'src/common/interfaces';

export const defaultNewUserProps: Omit<
  User,
  'id' | 'email' | 'role' | 'password'
> = {
  isConfigured: false,
  name: '',
  image: '',
  expirationDate: '',
};
