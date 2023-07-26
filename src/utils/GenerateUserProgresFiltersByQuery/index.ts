import { FindOptionsWhere } from 'typeorm';

import { GetUserProgressQueryDto } from '../../user-progress/dto/GetUserProgressQueryDto';

import { UserProgres } from '../../common/entities';

const generateUserProgresFiltersByQuery = (query: GetUserProgressQueryDto) => {
  const filter:
    | FindOptionsWhere<UserProgres>
    | FindOptionsWhere<UserProgres>[] = {};
  if (query.userId) {
    filter.userId = query.userId;
  }
  if (query.exerciseId) {
    filter.exerciseId = query.exerciseId;
  }

  return filter;
};

export default generateUserProgresFiltersByQuery;
