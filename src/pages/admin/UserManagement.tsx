import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaFilter,
  FaDownload
} from 'react-icons/fa';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    // TODO: Replace with actual API call
    setUsers([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'student',
        status: 'active',
        joinDate: '2023-01-15'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'teacher',
        status: 'active',
        joinDate: '2023-02-20'
      },
      // Add more mock data as needed
    ]);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // TODO: Implement search functionality
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      }
      return [...prev, userId];
    });
  };

  const handleBulkAction = (action) => {
    // TODO: Implement bulk actions
    console.log(`Performing ${action} on selected users:`, selectedUsers);
  };

  const renderUserTable = () => {
    return (
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(users.map(user => user.id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleUserSelect(user.id)}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.joinDate}</td>
                <td>
                  <button className="action-btn edit">
                    <FaEdit />
                  </button>
                  <button className="action-btn delete">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="user-management">
      <div className="page-header">
        <h1>User Management</h1>
        <div className="header-actions">
          <button className="btn primary" onClick={() => setShowAddModal(true)}>
            <FaUserPlus /> Add User
          </button>
          <button className="btn secondary">
            <FaDownload /> Export
          </button>
        </div>
      </div>

      <div className="management-tabs">
        <button
          className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
        <button
          className={`tab-btn ${activeTab === 'teachers' ? 'active' : ''}`}
          onClick={() => setActiveTab('teachers')}
        >
          Teachers
        </button>
        <button
          className={`tab-btn ${activeTab === 'parents' ? 'active' : ''}`}
          onClick={() => setActiveTab('parents')}
        >
          Parents
        </button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="filters">
          <button className="btn">
            <FaFilter /> Filters
          </button>
        </div>
      </div>

      {selectedUsers.length > 0 && (
        <div className="bulk-actions">
          <span>{selectedUsers.length} users selected</span>
          <div className="action-buttons">
            <button className="btn" onClick={() => handleBulkAction('activate')}>
              Activate
            </button>
            <button className="btn" onClick={() => handleBulkAction('deactivate')}>
              Deactivate
            </button>
            <button className="btn" onClick={() => handleBulkAction('delete')}>
              Delete
            </button>
          </div>
        </div>
      )}

      {renderUserTable()}

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New User</h2>
            {/* Add user form will go here */}
            <button className="btn" onClick={() => setShowAddModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement; 