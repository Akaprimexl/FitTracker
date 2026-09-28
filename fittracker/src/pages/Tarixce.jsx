import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { CalendarDays, Filter, History } from "lucide-react";
import useWorkoutStore from "../store/useWorkoutStore";
import MesqKart from "../components/MesqKart";

const categoryNames = {
  hamisi: "Bütün kateqoriyalar",
  kardio: "Kardio",
  guc: "Güc",
  yoga: "Yoga",
  gezinti: "Gəzinti",
};

export default function Tarixce() {
  const workouts = useWorkoutStore(
    (state) => state.workouts
  );

  const [searchParams, setSearchParams] =
    useSearchParams();

  const selectedCategory =
    searchParams.get("kateqoriya") || "hamisi";

  const filteredWorkouts = useMemo(() => {
    const result =
      selectedCategory === "hamisi"
        ? workouts
        : workouts.filter(
            (workout) =>
              workout.kateqoriya === selectedCategory
          );

    return [...result].sort(
      (a, b) => b.tarix.localeCompare(a.tarix)
    );
  }, [workouts, selectedCategory]);

  const groupedWorkouts = useMemo(() => {
    return filteredWorkouts.reduce((groups, workout) => {
      if (!groups[workout.tarix]) {
        groups[workout.tarix] = [];
      }

      groups[workout.tarix].push(workout);

      return groups;
    }, {});
  }, [filteredWorkouts]);

  const handleFilterChange = (event) => {
    const value = event.target.value;

    if (value === "hamisi") {
      setSearchParams({});
    } else {
      setSearchParams({
        kateqoriya: value,
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(`${dateString}T00:00:00`);

    return new Intl.DateTimeFormat("az-AZ", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <main className="page">
      <div className="container">
        <section className="page-heading history-heading">
          <div>
            <span className="eyebrow">
              <History size={16} />
              Keçmiş məşqlər
            </span>

            <h1>Tarixçə</h1>

            <p>
              Bütün məşqlərinə tarix və kateqoriya üzrə
              bax.
            </p>
          </div>

          <div className="filter-box">
            <Filter size={18} />

            <select
              value={selectedCategory}
              onChange={handleFilterChange}
              aria-label="Kateqoriya filtri"
            >
              {Object.entries(categoryNames).map(
                ([value, label]) => (
                  <option value={value} key={value}>
                    {label}
                  </option>
                )
              )}
            </select>
          </div>
        </section>

        {filteredWorkouts.length === 0 ? (
          <div className="empty-state large-empty">
            <div className="empty-icon">
              <CalendarDays size={32} />
            </div>

            <h3>Məşq tapılmadı</h3>

            <p>
              Seçilmiş filtr üzrə göstəriləcək məşq yoxdur.
            </p>
          </div>
        ) : (
          <div className="history-list">
            {Object.entries(groupedWorkouts).map(
              ([date, dayWorkouts]) => (
                <section className="history-day" key={date}>
                  <div className="history-date">
                    <div className="history-date-icon">
                      <CalendarDays size={18} />
                    </div>

                    <div>
                      <h2>{formatDate(date)}</h2>
                      <span>
                        {dayWorkouts.length} məşq
                      </span>
                    </div>
                  </div>

                  <div className="workout-list">
                    {dayWorkouts.map((workout) => (
                      <MesqKart
                        key={workout.id}
                        workout={workout}
                      />
                    ))}
                  </div>
                </section>
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
}
