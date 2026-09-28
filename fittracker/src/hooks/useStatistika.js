import { useMemo } from "react";
import useWorkoutStore from "../store/useWorkoutStore";

function getStartOfWeek(date) {
  const currentDate = new Date(date);
  const day = currentDate.getDay();

  const difference = day === 0 ? 6 : day - 1;

  currentDate.setDate(currentDate.getDate() - difference);
  currentDate.setHours(0, 0, 0, 0);

  return currentDate;
}

export default function useStatistika() {
  const workouts = useWorkoutStore((state) => state.workouts);

  const statistika = useMemo(() => {
    const totalCount = workouts.reduce(
      (total, workout) => total + 1,
      0
    );

    const totalDuration = workouts.reduce(
      (total, workout) => total + Number(workout.muddet),
      0
    );

    const categoryStats = workouts.reduce((result, workout) => {
      const category = workout.kateqoriya;

      if (!result[category]) {
        result[category] = {
          count: 0,
          duration: 0,
        };
      }

      result[category].count += 1;
      result[category].duration += Number(workout.muddet);

      return result;
    }, {});

    const weekStart = getStartOfWeek(new Date());

    const weeklyDuration = workouts.reduce((total, workout) => {
      const workoutDate = new Date(`${workout.tarix}T00:00:00`);

      if (workoutDate >= weekStart) {
        return total + Number(workout.muddet);
      }

      return total;
    }, 0);

    const today = new Date().toISOString().split("T")[0];

    const todayDuration = workouts.reduce((total, workout) => {
      if (workout.tarix === today) {
        return total + Number(workout.muddet);
      }

      return total;
    }, 0);

    return {
      totalCount,
      totalDuration,
      categoryStats,
      weeklyDuration,
      todayDuration,
    };
  }, [workouts]);

  return statistika;
}
