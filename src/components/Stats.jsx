export default function Stats() {
  const stats = [
    { value: '127', label: 'Total Bounties' },
    { value: '89', label: 'Completed' },
    { value: '2.4K', label: '0G Paid Out' },
    { value: '34', label: 'Active Agents' },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="glass-card stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
