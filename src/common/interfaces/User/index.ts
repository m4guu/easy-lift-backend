import { Role } from 'src/common/enums';
import BodyWeight from '../BodyWeight';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isConfigured: boolean;
  image: File | null; // DUMMY DATA
  description?: string;
  gyms?: string[];
  bodyWeights?: BodyWeight[];
  height?: number;
  expirationDate: string;
}
export default User;
