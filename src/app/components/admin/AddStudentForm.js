'use client';

import { useState } from 'react';
import { addStudent } from '../../api/students_api';
import { uploadArtWork } from '../../api/student_art_works';
import { createMathWork, setMathWorkScore } from '../../api/student_math_works';
import { CATEGORIES, SUBJECTS, COUNTRIES, generateStudentId, calculateCategory } from '../../utils/constants';

export default function AddStudentForm({ onClose, onSuccess, userCountry }) {
  const [formData, setFormData] = useState({
    full_name: '',
    birth_date: '',
    grade: '',
    school: '',
    email: '',
    phone: '',
    country: userCountry || '',
    city: '',
    category_id: '',
    course_id: ''
  });
  const [artworkFile, setArtworkFile] = useState(null);
  const [mathScore, setMathScore] = useState('');
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Генерируем ID для студента
      const newStudentId = generateStudentId();
      setStudentId(newStudentId);

      // Определяем категорию по дате рождения
      const categoryId = calculateCategory(formData.birth_date);

      // Добавляем студента
      const studentData = {
        ...formData,
        id: newStudentId,
        category_id: categoryId
      };

      const addedStudent = await addStudent(studentData);

      // Если рисование и есть файл, загружаем artwork
      if (artworkFile && formData.course_id === '1') {
        const artFormData = new FormData();
        artFormData.append('student_id', newStudentId);
        artFormData.append('title', `Artwork by ${formData.full_name}`);
        artFormData.append('country', formData.country);
        artFormData.append('category_id', categoryId);
        artFormData.append('file', artworkFile);

        await uploadArtWork(artFormData);
      }

      // Если математика, создаем math work с оценкой
      if (formData.course_id === '2') {
        const mathWork = await createMathWork({
          student_id: newStudentId,
          title: `Math Result for ${formData.full_name}`,
          country: formData.country,
          category_id: categoryId
        });

        // Если указана оценка, сразу ставим её
        if (mathScore) {
          await setMathWorkScore(mathWork.id, parseInt(mathScore));
        }
      }

      onSuccess(newStudentId);
    } catch (error) {
      alert('Error adding student: ' + error.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-orange-600">Add Participant</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {studentId && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            ✅ Student successfully added! ID: <span className="font-mono font-bold">{studentId}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                value={formData.birth_date}
                onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Grade *
              </label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({...formData, grade: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., 7"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                School *
              </label>
              <input
                type="text"
                value={formData.school}
                onChange={(e) => setFormData({...formData, school: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {!userCountry && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Country *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select country</option>
                  {COUNTRIES.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Subject *
              </label>
              <select
                value={formData.course_id}
                onChange={(e) => setFormData({...formData, course_id: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select subject</option>
                {SUBJECTS.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>

            {formData.course_id === '1' && (
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Artwork *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setArtworkFile(e.target.files[0])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Supported formats: JPG, PNG, GIF (max 10MB)
                </p>
              </div>
            )}

            {formData.course_id === '2' && (
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Math Score (points)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={mathScore}
                  onChange={(e) => setMathScore(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter score (0-100)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Can be left empty and added later
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Participant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}