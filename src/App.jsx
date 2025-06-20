import { useState } from "react"
import "./styles/app.css"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import DataTable from "./components/DataTable"
import Charts from "./components/Charts"
import Calendar from "./components/Calendar"
import KanbanBoard from "./components/KanbanBoard"
import { ThemeProvider } from "./context/ThemeContext"

function App() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "tables":
        return <DataTable />
      case "charts":
        return <Charts />
      case "calendar":
        return <Calendar />
      case "kanban":
        return <KanbanBoard />
      default:
        return <Dashboard />
    }
  }

  return (
    <ThemeProvider>
      <div className="admin-layout">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <div className="main-content">
          <Header />
          <div className="content-area">{renderContent()}</div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
