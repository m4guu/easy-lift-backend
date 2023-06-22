import { FindOptionsWhere } from 'typeorm';

import { TrainersByQueryDto } from 'src/users/dto/TrainersByQueryDto';
import { User } from 'src/common/entities';

const generateTrainerFiltersByQuery = (query: TrainersByQueryDto) => {
  const filter: FindOptionsWhere<User> = {};

  if (query.name) {
    filter.name = new RegExp(`^${query.name}`);
  }
  if (query.personalTraining === 'true') {
    filter.gyms = { $gt: [] };
  }

  return filter;
};

export default generateTrainerFiltersByQuery;
