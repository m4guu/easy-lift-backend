import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

import { ProgramLevels } from 'src/common/enums';
import { ProgramItem } from 'src/common/interfaces';

@Entity()
class Programs {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  creator: string;

  @Column()
  title: string;

  @Column()
  level: ProgramLevels;

  @Column()
  frequencyPerWeek: number;

  @Column()
  programLength: number;

  @Column()
  program: ProgramItem[];

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  description: string;
}

export default Programs;
