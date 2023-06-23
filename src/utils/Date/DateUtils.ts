import { format } from 'date-fns';

export const getTodayDate = () => {
  return format(new Date(), 'yyyy-MM-dd');
};
