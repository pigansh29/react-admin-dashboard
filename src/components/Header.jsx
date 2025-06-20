"use client"
import { useTheme } from "../context/ThemeContext"

const Header = () => {
  const { theme, toggleTheme, primaryColor, updatePrimaryColor } = useTheme()

  const colorOptions = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"]

  return (
    <header className="page-header">
      <div className="header-content">
        <h1 className="page-title">Admin Dashboard</h1>
        <div className="header-controls">
          <div className="theme-selector">
            <label className="color-label">Theme Color:</label>
            <div className="color-options">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  className={`color-option ${primaryColor === color ? "selected" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => updatePrimaryColor(color)}
                />
              ))}
            </div>
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <div className="user-profile">
            <img src="https://cdn-icons-png.flaticon.com/128/64/64572.png" alt="User" className="profile-avatar" />
            <span className="user-name">Pigansh Gaur</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
