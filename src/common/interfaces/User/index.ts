import { ObjectId } from 'typeorm';
import { Role } from 'src/common/enums';
import BodyWeight from '../BodyWeight';

interface User {
  id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role;
  isConfigured: boolean;
  image: string | File;
  expirationDate: string;
  description?: string;
  gyms?: string[];
  bodyWeights?: BodyWeight[];
  height?: number;
}

export default User;
