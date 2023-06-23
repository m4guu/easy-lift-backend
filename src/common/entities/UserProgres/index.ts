import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

import { Set } from 'src/common/interfaces';

@Entity()
class UserProgres {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  workoutId: string;

  @Column()
  userId: string;

  @Column()
  exerciseId: string;

  @Column()
  exerciseName: string;

  @Column()
  date: string;

  @Column()
  sets: Set[];

  @Column()
  repMax: number;
}

export default UserProgres;
