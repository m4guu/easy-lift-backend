import { TrainersByQueryDto } from '../../users/dto/TrainersByQueryDto';

const generateTrainerFiltersByQuery = (query: TrainersByQueryDto) => {
  const filter: any = {};

  if (query.name) {
    filter.name = new RegExp(`^${query.name}`);
  }
  if (query.personalTraining === 'true') {
    filter.gyms = { $gt: [] };
  }

  return filter;
};

export default generateTrainerFiltersByQuery;
