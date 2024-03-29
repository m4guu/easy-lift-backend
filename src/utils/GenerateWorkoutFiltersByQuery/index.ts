import { GetWorkoutsQueryDto } from '../../workouts/dto/GetWorkoutsQueryDto';

const generateWorkoutFiltersByQuery = (query: GetWorkoutsQueryDto) => {
  const filter: any = {};

  if (query.creator) {
    filter.creator = query.creator;
  }
  if (query.monthNumber) {
    const year = new Date().getFullYear();
    const startOfMonth = new Date(year, +query.monthNumber - 1, 1);
    const endOfMonth = new Date(year, +query.monthNumber, 0, 23, 59, 59);
    filter.date = {
      $gte: startOfMonth,
      $lte: endOfMonth,
    };
  }
  if (query.name) {
    filter.title = new RegExp(`^${query.name}`);
  }

  return filter;
};

export default generateWorkoutFiltersByQuery;
