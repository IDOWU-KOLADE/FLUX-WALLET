export function StatCard({ icon, label, value, onClick,iconClassName='' }) {
  const Wrapper = onClick ? "button" : "div";
  return (
    <Wrapper className="stat-card" onClick={onClick}>
      <div className={`stat-card-icon ${iconClassName}`}>{icon}</div>
      <div className="stat-card-text">
        <span className="stat-card-label">{label}</span>
        <span className="stat-card-value">{value}</span>
      </div>
    </Wrapper>
  );
}