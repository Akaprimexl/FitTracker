import { useMemo } from "react";
import {
  Activity,
  CalendarDays,
  Clock3,
} from "lucide-react";
import useWorkoutStore from "../store/useWorkoutStore";
import MesqForma from "../components/MesqForma";
import MesqKart from "../components/MesqKart";

export default function BuGun() {
  const workouts = useWorkoutStore(
    (state) => state.workouts
  );

  const today = new Date().toISOString().split("T")[0];

  const todayWorkouts = useMemo(
    () =>
      workouts.filter(
        (workout) => workout.tarix === today
      ),
    [workouts, today]
  );

  const totalDuration = todayWorkouts.reduce(
    (total, workout) => total + Number(workout.muddet),
    0
  );

  const formattedDate = new Intl.DateTimeFormat("az-AZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <main className="page">
      <div className="container">
        <section className="page-heading">
          <div>
            <span className="eyebrow">
              <CalendarDays size={16} />
              {formattedDate}
            </span>

            <h1>Bugünkü məşqlərin</h1>

            <p>
              Gün ərzində etdiyin məşqləri qeyd et və
              inkişafını izlə.
            </p>
          </div>

          <div className="today-summary">
            <div className="summary-icon">
              <Clock3 size={22} />
            </div>

            <div>
              <strong>{totalDuration}</strong>
              <span>dəqiqə</span>
            </div>
          </div>
        </section>

        <div className="dashboard-grid">
          <section>
            <MesqForma />
          </section>

          <section className="today-workouts">
            <div className="section-heading">
              <div>
                <h2>Bugünkü məşqlər</h2>

                <p>
                  {todayWorkouts.length} məşq qeyd olunub
                </p>
              </div>

              <Activity size={23} />
            </div>

            {todayWorkouts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <Activity size={30} />
                </div>

                <h3>Hələ məşq yoxdur</h3>

                <p>
                  İlk məşqini əlavə et və gününü izləməyə
                  başla.
                </p>
              </div>
            ) : (
              <div className="workout-list">
                {todayWorkouts.map((workout) => (
                  <MesqKart
                    key={workout.id}
                    workout={workout}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

