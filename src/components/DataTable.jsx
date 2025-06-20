"use client"

import { useState, useMemo } from "react"

const DataTable = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const sampleData = [
    {
      id: 1,
      name: "Amit Sharma",
      email: "amit.sharma@example.in",
      role: "Admin",
      status: "Active",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya.singh@example.in",
      role: "User",
      status: "Active",
      joinDate: "2023-02-20",
    },
    {
      id: 3,
      name: "Rahul Verma",
      email: "rahul.verma@example.in",
      role: "Editor",
      status: "Inactive",
      joinDate: "2023-03-10",
    },
    {
      id: 4,
      name: "Sneha Patel",
      email: "sneha.patel@example.in",
      role: "User",
      status: "Active",
      joinDate: "2023-04-05",
    },
    {
      id: 5,
      name: "Vikram Mehta",
      email: "vikram.mehta@example.in",
      role: "Admin",
      status: "Active",
      joinDate: "2023-05-12",
    },
    {
      id: 6,
      name: "Anjali Nair",
      email: "anjali.nair@example.in",
      role: "Editor",
      status: "Active",
      joinDate: "2023-06-18",
    },
    {
      id: 7,
      name: "Rohan Iyer",
      email: "rohan.iyer@example.in",
      role: "User",
      status: "Inactive",
      joinDate: "2023-07-22",
    },
    {
      id: 8,
      name: "Kavita Joshi",
      email: "kavita.joshi@example.in",
      role: "User",
      status: "Active",
      joinDate: "2023-08-30",
    },
  ]
  

  const filteredAndSortedData = useMemo(() => {
    const filtered = sampleData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (sortField) {
      filtered.sort((a, b) => {
        const aVal = a[sortField]
        const bVal = b[sortField]
        if (sortDirection === "asc") {
          return aVal > bVal ? 1 : -1
        } else {
          return aVal < bVal ? 1 : -1
        }
      })
    }

    return filtered
  }, [searchTerm, sortField, sortDirection])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedData, currentPage])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  return (
    <div className="data-table-container">
      <div className="table-header">
        <h2 className="section-title">User Management</h2>
        <div className="table-controls">
          <input
            type="text"
            placeholder="Search users..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add-button">Add New User</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")} className="sortable-header">
                Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("email")} className="sortable-header">
                Email {sortField === "email" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("role")} className="sortable-header">
                Role {sortField === "role" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("status")} className="sortable-header">
                Status {sortField === "status" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("joinDate")} className="sortable-header">
                Join Date {sortField === "joinDate" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((user) => (
              <tr key={user.id}>
                <td className="user-name">{user.name}</td>
                <td className="user-email">{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span>
                </td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span>
                </td>
                <td className="join-date">{user.joinDate}</td>
                <td className="table-actions">
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default DataTable
