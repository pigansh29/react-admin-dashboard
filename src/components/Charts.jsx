"use client"

import { useState } from "react"

const Charts = () => {
  const [activeChart, setActiveChart] = useState("bar")

  const salesData = [
    { month: "Jan", sales: 4000, revenue: 2400 },
    { month: "Feb", sales: 3000, revenue: 1398 },
    { month: "Mar", sales: 2000, revenue: 9800 },
    { month: "Apr", sales: 2780, revenue: 3908 },
    { month: "May", sales: 1890, revenue: 4800 },
    { month: "Jun", sales: 2390, revenue: 3800 },
  ]

  const BarChart = ({ data }) => {
    const maxValue = Math.max(...data.map((d) => Math.max(d.sales, d.revenue)))

    return (
      <div className="chart-container">
        <div className="chart-bars">
          {data.map((item, index) => (
            <div key={index} className="bar-group">
              <div className="bar-container">
                <div
                  className="chart-bar sales-bar"
                  style={{ height: `${(item.sales / maxValue) * 200}px` }}
                  title={`Sales: ${item.sales}`}
                />
                <div
                  className="chart-bar revenue-bar"
                  style={{ height: `${(item.revenue / maxValue) * 200}px` }}
                  title={`Revenue: ${item.revenue}`}
                />
              </div>
              <span className="bar-label">{item.month}</span>
            </div>
          ))}
        </div>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-color sales-color"></span>
            <span>Sales</span>
          </div>
          <div className="legend-item">
            <span className="legend-color revenue-color"></span>
            <span>Revenue</span>
          </div>
        </div>
      </div>
    )
  }

  const LineChart = ({ data }) => {
    const maxValue = Math.max(...data.map((d) => Math.max(d.sales, d.revenue)))
    const chartWidth = 400
    const chartHeight = 200

    const getPoints = (values) => {
      return values
        .map((value, index) => {
          const x = (index / (values.length - 1)) * chartWidth
          const y = chartHeight - (value / maxValue) * chartHeight
          return `${x},${y}`
        })
        .join(" ")
    }

    return (
      <div className="chart-container">
        <svg width={chartWidth} height={chartHeight} className="line-chart">
          <polyline points={getPoints(data.map((d) => d.sales))} className="chart-line sales-line" />
          <polyline points={getPoints(data.map((d) => d.revenue))} className="chart-line revenue-line" />
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * chartWidth
            const salesY = chartHeight - (item.sales / maxValue) * chartHeight
            const revenueY = chartHeight - (item.revenue / maxValue) * chartHeight
            return (
              <g key={index}>
                <circle cx={x} cy={salesY} r="4" className="chart-point sales-point" />
                <circle cx={x} cy={revenueY} r="4" className="chart-point revenue-point" />
              </g>
            )
          })}
        </svg>
        <div className="chart-labels">
          {data.map((item, index) => (
            <span key={index} className="chart-label">
              {item.month}
            </span>
          ))}
        </div>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-color sales-color"></span>
            <span>Sales</span>
          </div>
          <div className="legend-item">
            <span className="legend-color revenue-color"></span>
            <span>Revenue</span>
          </div>
        </div>
      </div>
    )
  }

  const PieChart = () => {
    const pieData = [
      { label: "Desktop", value: 45, color: "#3b82f6" },
      { label: "Mobile", value: 35, color: "#ef4444" },
      { label: "Tablet", value: 20, color: "#10b981" },
    ]

    const total = pieData.reduce((sum, item) => sum + item.value, 0)
    let currentAngle = 0

    return (
      <div className="chart-container">
        <svg width="300" height="300" className="pie-chart">
          {pieData.map((item, index) => {
            const angle = (item.value / total) * 360
            const startAngle = currentAngle
            const endAngle = currentAngle + angle
            currentAngle += angle

            const startAngleRad = (startAngle * Math.PI) / 180
            const endAngleRad = (endAngle * Math.PI) / 180

            const x1 = 150 + 100 * Math.cos(startAngleRad)
            const y1 = 150 + 100 * Math.sin(startAngleRad)
            const x2 = 150 + 100 * Math.cos(endAngleRad)
            const y2 = 150 + 100 * Math.sin(endAngleRad)

            const largeArcFlag = angle > 180 ? 1 : 0

            const pathData = [`M 150 150`, `L ${x1} ${y1}`, `A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2}`, "Z"].join(" ")

            return <path key={index} d={pathData} fill={item.color} className="pie-slice" />
          })}
        </svg>
        <div className="chart-legend">
          {pieData.map((item, index) => (
            <div key={index} className="legend-item">
              <span className="legend-color" style={{ backgroundColor: item.color }}></span>
              <span>
                {item.label}: {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="charts-container">
      <div className="charts-header">
        <h2 className="section-title">Analytics Charts</h2>
        <div className="chart-tabs">
          <button
            className={`chart-tab ${activeChart === "bar" ? "active" : ""}`}
            onClick={() => setActiveChart("bar")}
          >
            Bar Chart
          </button>
          <button
            className={`chart-tab ${activeChart === "line" ? "active" : ""}`}
            onClick={() => setActiveChart("line")}
          >
            Line Chart
          </button>
          <button
            className={`chart-tab ${activeChart === "pie" ? "active" : ""}`}
            onClick={() => setActiveChart("pie")}
          >
            Pie Chart
          </button>
        </div>
      </div>

      <div className="chart-content">
        {activeChart === "bar" && <BarChart data={salesData} />}
        {activeChart === "line" && <LineChart data={salesData} />}
        {activeChart === "pie" && <PieChart />}
      </div>
    </div>
  )
}

export default Charts
