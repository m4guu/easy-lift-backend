import { ObjectId } from 'typeorm';
import { Role } from '../../enums';

interface User {
  id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role;
  isConfigured: boolean;
  image: string | File;
  currentWeight?: number;
  description?: string;
  gyms?: string[];
  height?: number;
}

export default User;
