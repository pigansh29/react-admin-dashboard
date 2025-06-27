const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: "12,345", change: "+12%", trend: "up" },
    { title: "Revenue", value: "$45,678", change: "+8%", trend: "up" },
    { title: "Orders", value: "1,234", change: "-3%", trend: "down" },
    { title: "Conversion", value: "3.45%", change: "+15%", trend: "up" },
  ]

  const recentActivities = [
    { user: "Rohit Sharma", action: "Created new project", time: "2 hours ago" },
    { user: "Virat Kohli", action: "Updated user profile", time: "4 hours ago" },
    { user: "Tanmay Jain", action: "Completed task #123", time: "6 hours ago" },
    { user: "Shreyas Lyer", action: "Added new comment", time: "8 hours ago" },
  ]
  return (
    <div className="dashboard-container">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <h3 className="stat-title">{stat.title}</h3>
              <span className={`stat-trend ${stat.trend}`}>{stat.change}</span>
            </div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3 className="card-title">Recent Activities</h3>
          <div className="activity-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-content">
                  <strong className="activity-user">{activity.user}</strong>
                  <span className="activity-action">{activity.action}</span>
                </div>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="card-title">Quick Actions</h3>
          <div className="quick-actions">
            <button className="action-button primary">Add New User</button>
            <button className="action-button secondary">Generate Report</button>
            <button className="action-button secondary">Export Data</button>
            <button className="action-button secondary">Send Newsletter</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
