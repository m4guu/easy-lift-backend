import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

import { WorkoutExercise } from 'src/common/interfaces';

@Entity()
class Workouts {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  creator: string;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column()
  isDraft: boolean;

  @Column()
  exercises: WorkoutExercise[];
}

export default Workouts;
