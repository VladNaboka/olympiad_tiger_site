'use client';

import { useState } from 'react';
import { updateStudent, deleteStudent } from '../../api/students_api';
import { getCategoryName, SUBJECTS } from '../../utils/constants';

export default function StudentsTab({ students, userRole, userCountry, onAddNew, onRefresh }) {
  const [editingStudent, setEditingStudent] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('id');
  const [filterSubject, setFilterSubject] = useState('');

  const handleEdit = (student) => {
    setEditingStudent(student.id);
    setEditData({ ...student });
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      await updateStudent(editData);
      setEditingStudent(null);
      onRefresh();
    } catch (error) {
      alert('Error updating student: ' + error.message);
    }
    setLoading(false);
  };

  const handleDelete = async (studentId, studentName) => {
    if (!confirm(`Are you sure you want to delete participant "${studentName}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    try {
      await deleteStudent(studentId);
      onRefresh();
      alert('Participant deleted successfully');
    } catch (error) {
      alert('Error deleting participant: ' + error.message);
    }
    setLoading(false);
  };

  // Фильтрация и сортировка
  const filteredStudents = students
    .filter(student => {
      if (filterSubject && student.course_id !== parseInt(filterSubject)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.full_name.localeCompare(b.full_name);
        case 'age':
          return new Date(a.birth_date) - new Date(b.birth_date);
        case 'school':
          return a.school.localeCompare(b.school);
        case 'category':
          return a.category_id - b.category_id;
        default:
          return a.id.localeCompare(b.id);
      }
    });

  const getSubjectName = (courseId) => {
    const subject = SUBJECTS.find(s => s.id === courseId?.toString());
    return subject ? subject.name : 'Unknown';
  };

  const getSubjectIcon = (courseId) => {
    return courseId === 1 || courseId === '1' ? '🎨' : '📐';
  };

  // Статистика
  const totalStudents = students.length;
  const mathStudents = students.filter(s => s.course_id === 2 || s.course_id === '2').length;
  const artStudents = students.filter(s => s.course_id === 1 || s.course_id === '1').length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Participants</h2>
          <p className="text-sm text-gray-600 mt-1">
            {userRole === 'owner' ? 'Manage all participants' : `Manage participants from ${userCountry}`}
          </p>
        </div>
        <button
          onClick={onAddNew}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center"
        >
          <span className="mr-2">+</span>
          Add Participant
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{totalStudents}</div>
          <div className="text-sm text-blue-800">Total Participants</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{mathStudents}</div>
          <div className="text-sm text-green-800">📐 Mathematics</div>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-pink-600">{artStudents}</div>
          <div className="text-sm text-pink-800">🎨 Art</div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Subject</label>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">All subjects</option>
            {SUBJECTS.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="school">School</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date of Birth
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                School
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-gray-900 bg-yellow-50">
                  {editingStudent === student.id ? (
                    <input
                      type="text"
                      value={editData.id}
                      onChange={(e) => setEditData({...editData, id: e.target.value})}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-xs"
                      disabled={loading}
                    />
                  ) : (
                    student.id
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingStudent === student.id ? (
                    <input
                      type="text"
                      value={editData.full_name}
                      onChange={(e) => setEditData({...editData, full_name: e.target.value})}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      disabled={loading}
                    />
                  ) : (
                    student.full_name
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingStudent === student.id ? (
                    <input
                      type="date"
                      value={editData.birth_date}
                      onChange={(e) => setEditData({...editData, birth_date: e.target.value})}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      disabled={loading}
                    />
                  ) : (
                    student.birth_date
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingStudent === student.id ? (
                    <input
                      type="text"
                      value={editData.school}
                      onChange={(e) => setEditData({...editData, school: e.target.value})}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      disabled={loading}
                    />
                  ) : (
                    student.school
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="flex items-center">
                    <span className="mr-1">{getSubjectIcon(student.course_id)}</span>
                    {getSubjectName(student.course_id)}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {getCategoryName(student.category_id)}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingStudent === student.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveEdit}
                        disabled={loading}
                        className="text-green-600 hover:text-green-800"
                      >
                        ✅
                      </button>
                      <button
                        onClick={() => setEditingStudent(null)}
                        disabled={loading}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        ❌
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(student)}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(student.id, student.full_name)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-semibold mb-2">No participants found</h3>
            <p>
              {filterSubject 
                ? 'Try changing the subject filter or add participants for this subject'
                : 'Start by adding participants to the competition'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}