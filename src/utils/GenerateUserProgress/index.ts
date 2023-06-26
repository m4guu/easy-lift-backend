import { getTodayDate } from '../Date/DateUtils';

import { UserProgres, Workouts } from 'src/common/entities';

const generateUserProgress = (workout: Workouts): Omit<UserProgres, 'id'>[] => {
  return workout.exercises.map((exercise) => {
    const { id, name, sets } = exercise;
    // generate best rep max from sets
    const repMax = Math.max(...sets.map((set) => set.repMax));

    return {
      workoutId: workout.id.toString(),
      userId: workout.creator,
      exerciseId: id,
      exerciseName: name,
      date: getTodayDate(),
      repMax,
      sets,
    };
  });
};

export default generateUserProgress;
