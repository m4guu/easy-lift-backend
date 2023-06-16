import WorkoutExercise from '../WorkoutExercise';

interface Workout {
  id: string;
  creator: string;
  title: string;
  date: string;
  exercises: WorkoutExercise[];
  isDraft: boolean;
}

export default Workout;
