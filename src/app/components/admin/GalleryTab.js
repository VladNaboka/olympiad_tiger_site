'use client';

import { useState, useEffect } from 'react';
import { getArtWorksByCountryAndCategory, setArtWorkScore, deleteArtWork } from '../../api/student_art_works';
import { CATEGORIES, getCategoryName } from '../../utils/constants';

export default function GalleryTab({ userRole, userCountry, filters }) {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [scoreModal, setScoreModal] = useState(false);
  const [newScore, setNewScore] = useState('');

  const loadArtworks = async () => {
    if (!filters.country && userRole === 'owner') {
      setArtworks([]);
      return;
    }

    setLoading(true);
    try {
      const country = userRole === 'owner' ? filters.country : userCountry;
      const category = filters.category || null;
      
      if (country) {
        let allArtworks = [];
        
        if (category) {
          // Загружаем для конкретной категории
          const data = await getArtWorksByCountryAndCategory(country, parseInt(category));
          allArtworks = data || [];
        } else {
          // Загружаем для всех категорий
          const promises = CATEGORIES.map(cat => 
            getArtWorksByCountryAndCategory(country, cat.id).catch(() => [])
          );
          const results = await Promise.all(promises);
          allArtworks = results.flat();
        }
        
        setArtworks(allArtworks);
      }
    } catch (error) {
      console.error('Error loading artworks:', error);
      setArtworks([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadArtworks();
  }, [userRole, userCountry, filters]);

  const handleSetScore = async () => {
    if (!selectedArtwork || !newScore) return;

    try {
      await setArtWorkScore(selectedArtwork.id, parseInt(newScore));
      setScoreModal(false);
      setSelectedArtwork(null);
      setNewScore('');
      loadArtworks();
      alert('Score set successfully!');
    } catch (error) {
      alert('Error setting score: ' + error.message);
    }
  };

  const handleDeleteArtwork = async (artwork) => {
    if (!confirm(`Are you sure you want to delete the artwork "${artwork.title}"?`)) {
      return;
    }

    try {
      await deleteArtWork(artwork.id);
      loadArtworks();
      alert('Artwork deleted successfully!');
    } catch (error) {
      alert('Error deleting artwork: ' + error.message);
    }
  };

  const openScoreModal = (artwork) => {
    setSelectedArtwork(artwork);
    setNewScore(artwork.score || '');
    setScoreModal(true);
  };

  const getScoreColor = (score) => {
    if (!score) return 'bg-gray-100 text-gray-600';
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Группировка по категориям
  const groupedArtworks = artworks.reduce((acc, artwork) => {
    const categoryId = artwork.category_id;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(artwork);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Art Gallery</h2>
          <p className="text-sm text-gray-600 mt-1">
            View and manage artwork submissions
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Total artworks: {artworks.length}
        </div>
      </div>

      {/* Info message for main admin */}
      {userRole === 'owner' && !filters.country && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="text-blue-500 mr-3">ℹ️</div>
            <div>
              <h3 className="text-blue-800 font-medium">Select a country to view artworks</h3>
              <p className="text-blue-600 text-sm">Use the country filter above to see artwork submissions from a specific region.</p>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading artworks...</p>
        </div>
      )}

      {/* Artworks by Category */}
      {!loading && Object.keys(groupedArtworks).length > 0 && (
        <div className="space-y-8">
          {Object.entries(groupedArtworks).map(([categoryId, categoryArtworks]) => (
            <div key={categoryId} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">🎨</span>
                {getCategoryName(parseInt(categoryId))}
                <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                  {categoryArtworks.length} artwork{categoryArtworks.length !== 1 ? 's' : ''}
                </span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryArtworks.map((artwork) => (
                  <div key={artwork.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {/* Artwork Image */}
                    <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                      {artwork.file_url ? (
                        <img 
                          src={artwork.file_url} 
                          alt={artwork.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                          <div className="text-center text-gray-600">
                            <div className="text-4xl mb-2">🎨</div>
                            <p className="text-sm">Artwork</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Artwork Info */}
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">{artwork.title}</h4>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>👤 Student ID: {artwork.student_id}</p>
                        <p>🌍 Country: {artwork.country}</p>
                        <p>📊 Category: {getCategoryName(artwork.category_id)}</p>
                      </div>
                      
                      {/* Score */}
                      <div className="mt-3 flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(artwork.score)}`}>
                          {artwork.score ? `Score: ${artwork.score}` : 'Not scored'}
                        </span>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openScoreModal(artwork)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            ⭐ Score
                          </button>
                          <button
                            onClick={() => handleDeleteArtwork(artwork)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No artworks message */}
      {!loading && artworks.length === 0 && filters.country && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="text-lg font-semibold mb-2">No artworks found</h3>
          <p>No artwork submissions have been uploaded for the selected filters.</p>
        </div>
      )}

      {/* Score Modal */}
      {scoreModal && selectedArtwork && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Set Score for Artwork</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Artwork:</strong> {selectedArtwork.title}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Student ID:</strong> {selectedArtwork.student_id}
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Score (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter score"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setScoreModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSetScore}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Set Score
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}