import React from 'react';

function StudentForm({ formData, setFormData, onSubmit, isEditing, onCancel }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form className="student-form" onSubmit={onSubmit}>
      <h3>{isEditing ? 'Edit Student' : 'Add New Student'}</h3>

      <div className="form-group">
        <label htmlFor="id">Student ID:</label>
        <input
          type="number"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="e.g. 101"
          disabled={isEditing}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Rahul Sharma"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. rahul@gmail.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="branch">Branch:</label>
        <select
          id="branch"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Branch --</option>
          <option value="CSE">CSE</option>
          <option value="CS">CS</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="semester">Semester:</label>
        <input
          type="number"
          id="semester"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          placeholder="1 to 8"
          min="1"
          max="8"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="mobile">Mobile Number:</label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="10 digit mobile number"
          maxLength="10"
          required
        />
      </div>

      <div className="form-buttons">
        <button type="submit">
          {isEditing ? 'Update Student' : 'Add Student'}
        </button>
        {isEditing && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;
