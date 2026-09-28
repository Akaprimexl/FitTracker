import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWorkoutStore = create(
  persist(
    (set) => ({
      workouts: [],

      addWorkout: (workout) =>
        set((state) => ({
          workouts: [
            ...state.workouts,
            {
              ...workout,
              id: crypto.randomUUID(),
              tarix: new Date().toISOString().split("T")[0],
            },
          ],
        })),

      removeWorkout: (id) =>
        set((state) => ({
          workouts: state.workouts.filter(
            (workout) => workout.id !== id
          ),
        })),
    }),
    {
      name: "fittracker-workouts",
    }
  )
);

export default useWorkoutStore;
