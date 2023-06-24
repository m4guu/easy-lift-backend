import { FindOptionsWhere } from 'typeorm';

import { GetProgramsQueryDto } from 'src/programs/dto/GetProgramsQueryDto';
import { Programs } from 'src/common/entities';

const generateTrainerFiltersByQuery = (query: GetProgramsQueryDto) => {
  const filter: FindOptionsWhere<Programs> | FindOptionsWhere<Programs>[] = {};

  if (query.creator) {
    filter.creator = query.creator;
  }
  if (query.name) {
    filter.title = new RegExp(`^${query.name}`);
  }
  if (query.programLevel) {
    filter.level = query.programLevel;
  }
  if (query.maxPrice) {
    filter.price = { $lt: +query.maxPrice };
  }
  if (query.minPrice) {
    filter.price = { $gt: +query.minPrice - 1 };
  }
  if (query.maxFreqTraining) {
    filter.frequencyPerWeek = { $lt: +query.maxFreqTraining };
  }
  if (query.minFreqTraining) {
    filter.frequencyPerWeek = { $gt: +query.minFreqTraining - 1 };
  }
  if (query.maxProgramLength) {
    filter.programLength = { $lt: +query.maxProgramLength };
  }
  if (query.minProgramLength) {
    filter.programLength = { $gt: +query.minProgramLength - 1 };
  }
  return filter;
};

export default generateTrainerFiltersByQuery;
