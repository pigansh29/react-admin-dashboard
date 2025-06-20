"use client"

import { useState } from "react"

const KanbanBoard = () => {
  const [columns, setColumns] = useState([
    {
      id: "todo",
      title: "To Do",
      tasks: [
        { id: 1, title: "Design new homepage", description: "Create wireframes and mockups", priority: "high" },
        {
          id: 2,
          title: "Update user documentation",
          description: "Review and update all user guides",
          priority: "medium",
        },
      ],
    },
    {
      id: "inprogress",
      title: "In Progress",
      tasks: [
        {
          id: 3,
          title: "Implement authentication",
          description: "Add login and registration functionality",
          priority: "high",
        },
        { id: 4, title: "Fix responsive issues", description: "Resolve mobile layout problems", priority: "medium" },
      ],
    },
    {
      id: "review",
      title: "Review",
      tasks: [
        {
          id: 5,
          title: "Code review for API endpoints",
          description: "Review new REST API implementation",
          priority: "low",
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        { id: 6, title: "Setup CI/CD pipeline", description: "Configure automated deployment", priority: "high" },
        { id: 7, title: "Database optimization", description: "Improve query performance", priority: "medium" },
      ],
    },
  ])

  const [draggedTask, setDraggedTask] = useState(null)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [selectedColumn, setSelectedColumn] = useState("")
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "medium" })

  const handleDragStart = (e, task, columnId) => {
    setDraggedTask({ task, sourceColumnId: columnId })
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault()

    if (!draggedTask || draggedTask.sourceColumnId === targetColumnId) {
      setDraggedTask(null)
      return
    }

    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => {
        if (column.id === draggedTask.sourceColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== draggedTask.task.id),
          }
        }
        if (column.id === targetColumnId) {
          return {
            ...column,
            tasks: [...column.tasks, draggedTask.task],
          }
        }
        return column
      })
      return newColumns
    })

    setDraggedTask(null)
  }

  const handleAddTask = () => {
    if (newTask.title && selectedColumn) {
      const task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
      }

      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.id === selectedColumn ? { ...column, tasks: [...column.tasks, task] } : column
        )
      )

      setNewTask({ title: "", description: "", priority: "medium" })
      setShowTaskForm(false)
      setSelectedColumn("")
    }
  }

  const openTaskForm = (columnId) => {
    setSelectedColumn(columnId)
    setShowTaskForm(true)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ef4444"
      case "medium":
        return "#f59e0b"
      case "low":
        return "#10b981"
      default:
        return "#6b7280"
    }
  }

  return (
    <div className="kanban-container">
      <div className="kanban-header">
        <h2 className="section-title">Project Board</h2>
        <button className="add-task-button" onClick={() => setShowTaskForm(true)}>
          Add New Task
        </button>
      </div>

      <div className="kanban-board">
        {columns.map((column) => (
          <div
            key={column.id}
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="column-header">
              <h3 className="column-title">{column.title}</h3>
              <span className="task-count">{column.tasks.length}</span>
              <button className="add-column-task" onClick={() => openTaskForm(column.id)}>
                +
              </button>
            </div>

            <div className="column-tasks">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className="task-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, column.id)}
                >
                  <div className="task-header">
                    <h4 className="task-title">{task.title}</h4>
                    <div
                      className="priority-indicator"
                      style={{ backgroundColor: getPriorityColor(task.priority) }}
                      title={`Priority: ${task.priority}`}
                    />
                  </div>
                  <p className="task-description">{task.description}</p>
                  <div className="task-footer">
                    <span className="task-priority">{task.priority} priority</span>
                    <div className="task-actions">
                      <button className="edit-task">✏️</button>
                      <button className="delete-task">🗑️</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showTaskForm && (
        <div className="task-modal">
          <div className="modal-content">
            <h3 className="modal-title">
              {selectedColumn ? `Add Task to ${columns.find((c) => c.id === selectedColumn)?.title}` : "Add New Task"}
            </h3>

            {!selectedColumn && (
              <div className="form-group">
                <label className="form-label">Column:</label>
                <select
                  className="form-select"
                  value={selectedColumn}
                  onChange={(e) => setSelectedColumn(e.target.value)}
                >
                  <option value="">Select a column</option>
                  {columns.map((column) => (
                    <option key={column.id} value={column.id}>
                      {column.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Task Title:</label>
              <input
                type="text"
                className="form-input"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Enter task title"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description:</label>
              <textarea
                className="form-textarea"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Enter task description"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Priority:</label>
              <select
                className="form-select"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => {
                  setShowTaskForm(false)
                  setSelectedColumn("")
                  setNewTask({ title: "", description: "", priority: "medium" })
                }}
              >
                Cancel
              </button>
              <button className="save-button" onClick={handleAddTask}>
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default KanbanBoard
