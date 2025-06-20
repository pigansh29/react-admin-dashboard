"use client"

const Sidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "tables", label: "Data Tables", icon: "📋" },
    { id: "charts", label: "Charts", icon: "📈" },
    { id: "calendar", label: "Calendar", icon: "📅" },
    { id: "kanban", label: "Kanban Board", icon: "📌" },
  ]

  return (
    <aside className="navigation-sidebar">
      <div className="sidebar-header">
        <h2 className="brand-title">AdminPro</h2>
      </div>
      <nav className="sidebar-navigation">
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => onSectionChange(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
