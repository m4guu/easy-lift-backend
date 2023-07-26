import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

import { WorkoutExercise } from '../../interfaces';

@Entity()
class Workouts {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  creator: string;

  @Column()
  title: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  isDraft: boolean;

  @Column()
  exercises: WorkoutExercise[];
}

export default Workouts;
