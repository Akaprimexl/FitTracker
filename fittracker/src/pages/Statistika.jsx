import {
  Activity,
  Clock,
  Flame,
  CalendarRange,
} from "lucide-react";
import StatKart from "../components/StatKart";
import useStatistika from "../hooks/useStatistika";

const categoryNames = {
  kardio: "Kardio",
  guc: "Güc",
  yoga: "Yoga",
  gezinti: "Gəzinti",
};

export default function Statistika() {
  const {
    totalCount,
    totalDuration,
    categoryStats,
    weeklyDuration,
  } = useStatistika();

  const categories = Object.entries(categoryStats);

  return (
    <main className="page">
      <div className="container">
        <section className="page-heading">
          <div>
            <span className="eyebrow">
              <Flame size={16} />
              Performans
            </span>

            <h1>Statistika</h1>

            <p>
              Məşq məlumatlarını analiz et və inkişafını
              rəqəmlərlə izlə.
            </p>
          </div>
        </section>

        <section className="stats-grid">
          <StatKart
            icon={<Activity size={23} />}
            value={totalCount}
            label="Ümumi məşq"
            description="Bütün qeyd olunan məşqlər"
          />

          <StatKart
            icon={<Clock size={23} />}
            value={totalDuration}
            label="Ümumi dəqiqə"
            description="Bütün məşqlərin müddəti"
          />

          <StatKart
            icon={<CalendarRange size={23} />}
            value={weeklyDuration}
            label="Bu həftə"
            description="Cari həftənin müddəti"
          />
        </section>

        <section className="statistics-section">
          <div className="section-heading">
            <div>
              <h2>Kateqoriyalar</h2>
              <p>Kateqoriya üzrə məşq bölgüsü</p>
            </div>
          </div>

          {categories.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <Activity size={30} />
              </div>

              <h3>Statistika üçün məlumat yoxdur</h3>

              <p>
                Məşq əlavə etdikdən sonra statistikalar
                burada görünəcək.
              </p>
            </div>
          ) : (
            <div className="category-stat-list">
              {categories.map(([category, data]) => {
                const percentage =
                  totalDuration > 0
                    ? Math.round(
                        (data.duration / totalDuration) * 100
                      )
                    : 0;

                return (
                  <div
                    className="category-stat"
                    key={category}
                  >
                    <div className="category-stat-top">
                      <div>
                        <span className="category-stat-name">
                          {categoryNames[category]}
                        </span>

                        <span className="category-stat-count">
                          {data.count} məşq · {data.duration} dəq.
                        </span>
                      </div>

                      <strong>{percentage}%</strong>
                    </div>

                    <div className="progress-bar">
                      <div
                        className={`progress-fill progress-${category}`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
