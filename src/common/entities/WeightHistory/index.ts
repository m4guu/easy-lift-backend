import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

import { BodyWeight } from 'src/common/interfaces';

@Entity()
class WeightHistory {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  userId: string;

  @Column()
  bodyWeights: BodyWeight[];
}

export default WeightHistory;
