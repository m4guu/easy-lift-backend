import { UserDto } from 'src/common/interfaces';

export const defaultNewUserProps: Omit<
  UserDto,
  'id' | 'email' | 'role' | 'password'
> = {
  isConfigured: false,
  name: '',
  image: '',
  expirationDate: '',
};
