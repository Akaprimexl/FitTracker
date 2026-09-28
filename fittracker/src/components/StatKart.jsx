export default function StatKart({
  icon,
  value,
  label,
  description,
}) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon">{icon}</div>

      <div className="stat-card-content">
        <span className="stat-value">{value}</span>
        <span className="stat-label">{label}</span>

        {description && (
          <span className="stat-description">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}
