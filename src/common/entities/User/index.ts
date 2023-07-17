import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

import { Role } from '../../enums';

@Entity()
class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @Column()
  isConfigured: boolean;

  @Column()
  image: string;

  @Column()
  currentWeight?: number;

  @Column()
  height?: number;

  @Column()
  description?: string;

  @Column()
  gyms?: string[];
}
export default User;
