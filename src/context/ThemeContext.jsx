import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light")
  const [primaryColor, setPrimaryColor] = useState("#3b82f6")

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    document.documentElement.style.setProperty("--primary-color", primaryColor)
  }, [theme, primaryColor])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const updatePrimaryColor = (color) => {
    setPrimaryColor(color)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        primaryColor,
        toggleTheme,
        updatePrimaryColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
