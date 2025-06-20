"use client"

import { useState } from "react"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState([
    { id: 1, date: "2024-01-15", title: "Team Meeting", time: "10:00 AM" },
    { id: 2, date: "2024-01-20", title: "Project Deadline", time: "5:00 PM" },
    { id: 3, date: "2024-01-25", title: "Client Presentation", time: "2:00 PM" },
  ])
  const [showEventForm, setShowEventForm] = useState(false)
  const [newEvent, setNewEvent] = useState({ title: "", time: "" })

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const formatDateString = (date, day) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const dayStr = String(day).padStart(2, "0")
    return `${year}-${month}-${dayStr}`
  }

  const getEventsForDate = (dateString) => {
    return events.filter((event) => event.date === dateString)
  }

  const handleDateClick = (day) => {
    if (day) {
      const dateString = formatDateString(currentDate, day)
      setSelectedDate(dateString)
      setShowEventForm(true)
    }
  }

  const handleAddEvent = () => {
    if (newEvent.title && selectedDate) {
      const event = {
        id: Date.now(),
        date: selectedDate,
        title: newEvent.title,
        time: newEvent.time || "12:00 PM",
      }
      setEvents([...events, event])
      setNewEvent({ title: "", time: "" })
      setShowEventForm(false)
    }
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2 className="section-title">Calendar</h2>
        <div className="calendar-navigation">
          <button className="nav-button" onClick={() => navigateMonth(-1)}>
            ← Previous
          </button>
          <h3 className="current-month">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button className="nav-button" onClick={() => navigateMonth(1)}>
            Next →
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {daysOfWeek.map((day) => (
            <div key={day} className="weekday-header">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-days">
          {days.map((day, index) => {
            const dateString = day ? formatDateString(currentDate, day) : null
            const dayEvents = dateString ? getEventsForDate(dateString) : []
            const isToday =
              day &&
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear() &&
              day === new Date().getDate()

            return (
              <div
                key={index}
                className={`calendar-day ${day ? "valid-day" : "empty-day"} ${isToday ? "today" : ""}`}
                onClick={() => handleDateClick(day)}
              >
                {day && (
                  <>
                    <span className="day-number">{day}</span>
                    {dayEvents.length > 0 && (
                      <div className="day-events">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div key={event.id} className="event-dot" title={event.title}>
                            {event.title.substring(0, 10)}...
                          </div>
                        ))}
                        {dayEvents.length > 2 && <div className="more-events">+{dayEvents.length - 2} more</div>}
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {showEventForm && (
        <div className="event-modal">
          <div className="modal-content">
            <h3 className="modal-title">Add Event for {selectedDate}</h3>
            <div className="form-group">
              <label className="form-label">Event Title:</label>
              <input
                type="text"
                className="form-input"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Enter event title"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Time:</label>
              <input
                type="text"
                className="form-input"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                placeholder="e.g., 10:00 AM"
              />
            </div>
            <div className="modal-actions">
              <button className="cancel-button" onClick={() => setShowEventForm(false)}>
                Cancel
              </button>
              <button className="save-button" onClick={handleAddEvent}>
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="upcoming-events">
        <h3 className="events-title">Upcoming Events</h3>
        <div className="events-list">
          {events.slice(0, 5).map((event) => (
            <div key={event.id} className="event-item">
              <div className="event-date">{event.date}</div>
              <div className="event-details">
                <div className="event-title">{event.title}</div>
                <div className="event-time">{event.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calendar
