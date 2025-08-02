'use client';

import { useState, useEffect } from 'react';
import { getArtWorksByCountryAndCategory, deleteArtWork, setArtWorkScore } from '../../api/student_art_works';
import { COUNTRIES, CATEGORIES, getCategoryName } from '../../utils/constants';

export default function GlobalGalleryTab({ filters }) {
  const [allArtworks, setAllArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  // Для добавления
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWork, setNewWork] = useState({
    student_id: '',
    title: '',
    country: '',
    category_id: '',
    file: null
  });
  const [uploading, setUploading] = useState(false);

  const loadGlobalArtworks = async () => {
    setLoading(true);
    try {
      const countriesToLoad = filters.country ? [filters.country] : COUNTRIES;
      const results = [];

      for (const country of countriesToLoad) {
        const countryResults = await Promise.all(
          CATEGORIES.map(category =>
            getArtWorksByCountryAndCategory(country, category.id).catch(() => [])
          )
        );

        const artworksWithImages = countryResults
          .flat()
          .filter(a => a && a.file_path && a.file_path.trim() !== '');

        if (artworksWithImages.length > 0) {
          results.push(...artworksWithImages.map(a => ({ ...a, country })));
        }
      }

      setAllArtworks(results);
    } catch (error) {
      console.error('Error loading global artworks:', error);
    }
    setLoading(false);
  };

  const handleAddArtwork = async (e) => {
    e.preventDefault();
    if (!newWork.student_id || !newWork.title || !newWork.country || !newWork.category_id || !newWork.file) {
      alert('Please fill in all fields and select a file.');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('student_id', newWork.student_id);
      formData.append('title', newWork.title);
      formData.append('country', newWork.country);
      formData.append('category_id', newWork.category_id);
      formData.append('file', newWork.file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artworks`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);

      await res.json();
      setShowAddModal(false);
      setNewWork({ student_id: '', title: '', country: '', category_id: '', file: null });
      loadGlobalArtworks();
    } catch (err) {
      console.error('Error uploading artwork:', err);
      alert('Failed to upload artwork');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    loadGlobalArtworks();
  }, [filters.country]);

  const getCountryFlag = country => {
    const flagMap = {
      Kazakhstan: '🇰🇿',
      Russia: '🇷🇺',
      'United States': '🇺🇸',
      India: '🇮🇳',
      China: '🇨🇳',
      Germany: '🇩🇪',
      France: '🇫🇷',
      'United Kingdom': '🇬🇧',
      Japan: '🇯🇵',
      'South Korea': '🇰🇷',
    };
    return flagMap[country] || '🌍';
  };

  const getScoreColor = score => {
    if (!score) return 'bg-gray-100 text-gray-600';
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const artworksByCountry = allArtworks.reduce((acc, artwork) => {
    if (!acc[artwork.country]) acc[artwork.country] = [];
    acc[artwork.country].push(artwork);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Global Gallery</h2>
          <p className="text-sm text-gray-600 mt-1">
            Artwork submissions from all participating countries
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Total artworks: {allArtworks.length}
          </span>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            ➕ Add Artwork
          </button>
          <button
            onClick={loadGlobalArtworks}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* список */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading global gallery...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(artworksByCountry)
            .filter(([, artworks]) => artworks.length > 0)
            .map(([country, artworks]) => (
              <div key={country} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">{getCountryFlag(country)}</span>
                  {country}
                  <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                    {artworks.length} artwork{artworks.length !== 1 ? 's' : ''}
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {artworks.map((artwork, index) => (
                    <div
                      key={`${artwork.id || 'no-id'}-${index}`}
                      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedArtwork(artwork)}
                    >
                      <img
                        src={artwork.file_path}
                        alt={artwork.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 mb-2 truncate">
                          {artwork.title}
                        </h4>
                        <p className="text-sm text-gray-600">{getCategoryName(artwork.category_id)}</p>
                        <span className={`px-2 py-1 mt-2 inline-block rounded-full text-xs font-medium ${getScoreColor(artwork.score)}`}>
                          {artwork.score ? `Score: ${artwork.score}` : 'Not scored'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* модалка добавления */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h3 className="text-xl font-bold mb-4">Add New Artwork</h3>
            <form onSubmit={handleAddArtwork} className="space-y-4">
              <input
                type="number"
                placeholder="Student ID"
                value={newWork.student_id}
                onChange={(e) => setNewWork({ ...newWork, student_id: e.target.value })}
                className="border p-2 w-full rounded"
              />
              <input
                type="text"
                placeholder="Title"
                value={newWork.title}
                onChange={(e) => setNewWork({ ...newWork, title: e.target.value })}
                className="border p-2 w-full rounded"
              />
              <select
                value={newWork.country}
                onChange={(e) => setNewWork({ ...newWork, country: e.target.value })}
                className="border p-2 w-full rounded"
              >
                <option value="">Select Country</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select
                value={newWork.category_id}
                onChange={(e) => setNewWork({ ...newWork, category_id: e.target.value })}
                className="border p-2 w-full rounded"
              >
                <option value="">Select Category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <input
                type="file"
                onChange={(e) => setNewWork({ ...newWork, file: e.target.files[0] })}
                className="border p-2 w-full rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  {uploading ? 'Uploading...' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
