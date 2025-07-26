'use client';

import { useState } from 'react';
import { deleteUser, updateUserName } from '../../api/auth_api';

export default function RepresentativesTab({ representatives, onAddNew, onRefresh }) {
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditName(user.full_name);
  };

  const handleSaveEdit = async (userId) => {
    if (!editName.trim()) return;
    
    setLoading(true);
    try {
      await updateUserName(userId, editName);
      setEditingUser(null);
      onRefresh();
    } catch (error) {
      alert('Error updating name: ' + error.message);
    }
    setLoading(false);
  };

  const handleDelete = async (userId, userName) => {
    if (!confirm(`Are you sure you want to delete representative "${userName}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    try {
      await deleteUser(userId);
      onRefresh();
      alert('Representative deleted successfully');
    } catch (error) {
      alert('Error deleting representative: ' + error.message);
    }
    setLoading(false);
  };

  const getCountryFlag = (country) => {
    const flagMap = {
      'Kazakhstan': '🇰🇿',
      'Russia': '🇷🇺',
      'United States': '🇺🇸',
      'India': '🇮🇳',
      'China': '🇨🇳',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'United Kingdom': '🇬🇧',
      'Japan': '🇯🇵',
      'South Korea': '🇰🇷'
    };
    return flagMap[country] || '🌍';
  };

  const groupedReps = representatives.reduce((acc, rep) => {
    const country = rep.country || 'Unknown';
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(rep);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Regional Representatives</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage representatives from different countries
          </p>
        </div>
        <button
          onClick={onAddNew}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center"
        >
          <span className="mr-2">+</span>
          Add Representative
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{representatives.length}</div>
          <div className="text-sm text-blue-800">Total Representatives</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{Object.keys(groupedReps).length}</div>
          <div className="text-sm text-green-800">Countries Covered</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {representatives.filter(rep => rep.role === 'admin').length}
          </div>
          <div className="text-sm text-purple-800">Active Admins</div>
        </div>
      </div>

      {/* Representatives by Country */}
      <div className="space-y-6">
        {Object.entries(groupedReps).map(([country, reps]) => (
          <div key={country} className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <span className="text-2xl mr-2">{getCountryFlag(country)}</span>
              {country}
              <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                {reps.length} representative{reps.length !== 1 ? 's' : ''}
              </span>
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {reps.map((rep) => (
                <div key={rep.id} className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-grow">
                      {editingUser === rep.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="flex-grow px-2 py-1 border border-gray-300 rounded text-sm"
                            disabled={loading}
                          />
                          <button
                            onClick={() => handleSaveEdit(rep.id)}
                            disabled={loading}
                            className="text-green-600 hover:text-green-800 text-sm"
                          >
                            ✅
                          </button>
                          <button
                            onClick={() => setEditingUser(null)}
                            disabled={loading}
                            className="text-gray-600 hover:text-gray-800 text-sm"
                          >
                            ❌
                          </button>
                        </div>
                      ) : (
                        <h4 className="font-semibold text-gray-800">{rep.full_name}</h4>
                      )}
                      <p className="text-sm text-gray-600">{rep.email}</p>
                      {rep.city && (
                        <p className="text-sm text-gray-500">📍 {rep.city}</p>
                      )}
                      {rep.school && (
                        <p className="text-sm text-gray-500">🏫 {rep.school}</p>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                        {rep.role === 'admin' ? 'Regional Admin' : rep.role}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      ID: {rep.id}
                    </div>
                    <div className="flex space-x-2">
                      {editingUser !== rep.id && (
                        <button
                          onClick={() => handleEdit(rep)}
                          disabled={loading}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          ✏️ Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(rep.id, rep.full_name)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {representatives.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-4">🌍</div>
          <h3 className="text-lg font-semibold mb-2">No representatives yet</h3>
          <p>Start by adding regional representatives to manage different countries</p>
        </div>
      )}
    </div>
  );
}