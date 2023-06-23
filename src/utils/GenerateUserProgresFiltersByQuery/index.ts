import { GetUserProgressQueryDto } from 'src/user-progress/dto/GetUserProgressQueryDto';

const generateUserProgresFiltersByQuery = (query: GetUserProgressQueryDto) => {
  const filter: any = {};
  if (query.userId) {
    filter.userId = query.userId;
  }
  if (query.exerciseId) {
    filter.exerciseId = query.exerciseId;
  }
};

export default generateUserProgresFiltersByQuery;
