import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import SearchStudent from './components/SearchStudent';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api/students';

const initialFormState = {
  id: '',
  name: '',
  email: '',
  branch: '',
  semester: '',
  mobile: ''
};

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  // Show a message that automatically disappears after 4 seconds
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 4000);
  };

  // Fetch all students from backend
  const fetchStudents = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
      showMessage('Could not connect to backend server', 'error');
    }
  };

  // Load students on initial component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle form submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side quick validation checks
    if (!formData.name.trim() || !formData.email.trim() || !formData.branch || !formData.semester || !formData.mobile.trim()) {
      showMessage('Please fill all fields', 'error');
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile.trim())) {
      showMessage('Mobile number must be exactly 10 digits', 'error');
      return;
    }

    if (isEditing) {
      // UPDATE student (PUT)
      try {
        const response = await fetch(`${API_BASE_URL}/${currentEditId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
          showMessage(result.message || 'Student updated successfully', 'success');
          handleCancelEdit();
          fetchStudents();
        } else {
          showMessage(result.message || 'Failed to update student', 'error');
        }
      } catch (error) {
        console.error('Update error:', error);
        showMessage('Error updating student', 'error');
      }
    } else {
      // ADD student (POST)
      if (!formData.id) {
        showMessage('Please enter a Student ID', 'error');
        return;
      }

      try {
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
          showMessage(result.message || 'Student added successfully', 'success');
          setFormData(initialFormState);
          fetchStudents();
        } else {
          showMessage(result.message || 'Failed to add student', 'error');
        }
      } catch (error) {
        console.error('Add error:', error);
        showMessage('Error adding student', 'error');
      }
    }
  };

  // Start editing a student
  const handleEdit = (student) => {
    setFormData({
      id: student.id,
      name: student.name,
      email: student.email,
      branch: student.branch,
      semester: student.semester,
      mobile: student.mobile
    });
    setIsEditing(true);
    setCurrentEditId(student.id);
    setMessage({ text: '', type: '' });
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    setFormData(initialFormState);
  };

  // Delete a student (DELETE)
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (response.ok) {
        showMessage(result.message || 'Student deleted successfully', 'success');
        if (isEditing && currentEditId === id) {
          handleCancelEdit();
        }
        fetchStudents();
      } else {
        showMessage(result.message || 'Failed to delete student', 'error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      showMessage('Error deleting student', 'error');
    }
  };

  // Filter students based on search input (ID or Name case-insensitive)
  const filteredStudents = students.filter((student) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    const idMatch = String(student.id).includes(term);
    const nameMatch = student.name.toLowerCase().includes(term);

    return idMatch || nameMatch;
  });

  return (
    <div className="container">
      <h1>Student Management System</h1>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <StudentForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isEditing={isEditing}
        onCancel={handleCancelEdit}
      />

      <SearchStudent
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <StudentList
        students={filteredStudents}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
