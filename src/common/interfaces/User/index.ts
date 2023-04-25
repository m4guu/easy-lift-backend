import { ObjectId } from 'typeorm';
import { Role } from 'src/common/enums';
import BodyWeight from '../BodyWeight';

interface UserDto {
  id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role;
  isConfigured: boolean;
  image: string;
  description?: string;
  gyms?: string[];
  bodyWeights?: BodyWeight[];
  height?: number;
  expirationDate: string;
}

export default UserDto;
