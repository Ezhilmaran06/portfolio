import '../styles/home.css';

/**
 * StatCard — F1 telemetry-style stat display card
 */
export function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-label">{label}</div>
      <div className="stat-card-value">{value}</div>
    </div>
  );
}
