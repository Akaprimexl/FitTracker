import { Trash2, Clock } from "lucide-react";
import useWorkoutStore from "../store/useWorkoutStore";

const categoryNames = {
  kardio: "Kardio",
  guc: "Güc",
  yoga: "Yoga",
  gezinti: "Gəzinti",
};

export default function MesqKart({ workout }) {
  const removeWorkout = useWorkoutStore(
    (state) => state.removeWorkout
  );

  return (
    <article className={`workout-card category-${workout.kateqoriya}`}>
      <div className="workout-main">
        <div className="workout-category-dot" />

        <div>
          <h3>{workout.ad}</h3>

          <span className="category-label">
            {categoryNames[workout.kateqoriya]}
          </span>
        </div>
      </div>

      <div className="workout-actions">
        <div className="duration">
          <Clock size={17} />
          <strong>{workout.muddet}</strong>
          <span>dəq.</span>
        </div>

        <button
          type="button"
          className="delete-button"
          onClick={() => removeWorkout(workout.id)}
          aria-label={`${workout.ad} məşqini sil`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </article>
  );
}


