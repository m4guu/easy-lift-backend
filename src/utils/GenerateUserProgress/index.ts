import { format } from 'date-fns';

import { UserProgres, Workouts } from '../../common/entities';

const generateUserProgress = (workout: Workouts): Omit<UserProgres, 'id'>[] => {
  return workout.exercises.map((exercise) => {
    const { id, name, sets } = exercise;
    // generate best rep max from sets
    const repMax = Math.max(...sets.map((set) => set.repMax));

    return {
      workoutId: workout.id.toString(),
      userId: workout.creator,
      exerciseId: id.toString(),
      exerciseName: name,
      date: format(workout.date, 'yyyy-MM-dd'),
      repMax,
      sets,
    };
  });
};

export default generateUserProgress;
