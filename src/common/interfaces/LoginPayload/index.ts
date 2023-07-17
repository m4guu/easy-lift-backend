import { Role } from '../../enums';

interface LoginPayload {
  email: string;
  sub: string;
  role: Role;
}

export default LoginPayload;
