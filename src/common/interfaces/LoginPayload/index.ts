import { Role } from 'src/common/enums';

interface LoginPayload {
  email: string;
  sub: string;
  role: Role;
}

export default LoginPayload;
