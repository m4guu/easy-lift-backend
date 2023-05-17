import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

import { Role } from 'src/common/enums';
import { BodyWeight } from 'src/common/interfaces';

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
  description: string;

  @Column()
  gyms?: string[];

  @Column()
  bodyWeights: BodyWeight[];

  @Column()
  height: number;

  @Column()
  expirationDate: string;
}
export default User;
