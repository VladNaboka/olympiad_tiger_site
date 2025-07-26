'use client';

import { useState, useEffect } from 'react';
import { getArtWorksByCountryAndCategory } from '../../api/student_art_works';
import { COUNTRIES, CATEGORIES, getCategoryName } from '../../utils/constants';

export default function GlobalGalleryTab({ filters }) {
  const [allArtworks, setAllArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const loadGlobalArtworks = async () => {
    setLoading(true);
    try {
      const countriesToLoad = filters.country ? [filters.country] : COUNTRIES;
      
      const promises = countriesToLoad.map(async (country) => {
        try {
          const categoryPromises = CATEGORIES.map(category => 
            getArtWorksByCountryAndCategory(country, category.id).catch(() => [])
          );
          const categoryResults = await Promise.all(categoryPromises);
          const countryArtworks = categoryResults.flat();
          
          return countryArtworks.map(artwork => ({
            ...artwork,
            country
          }));
        } catch {
          return [];
        }
      });

      const results = await Promise.all(promises);
      const globalArtworks = results.flat();
      
      setAllArtworks(globalArtworks);
    } catch (error) {
      console.error('Error loading global artworks:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadGlobalArtworks();
  }, [filters.country]);

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

  const getScoreColor = (score) => {
    if (!score) return 'bg-gray-100 text-gray-600';
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Группировка по странам
  const artworksByCountry = allArtworks.reduce((acc, artwork) => {
    const country = artwork.country;
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(artwork);
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
            onClick={loadGlobalArtworks}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
          >
            <span className="mr-2">🔄</span>
            Refresh
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading global gallery...</p>
        </div>
      )}

      {!loading && (
        <div className="space-y-8">
          {Object.entries(artworksByCountry).map(([country, artworks]) => (
            <div key={country} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">{getCountryFlag(country)}</span>
                {country}
                <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                  {artworks.length} artwork{artworks.length !== 1 ? 's' : ''}
                </span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {artworks.map((artwork) => (
                  <div 
                    key={artwork.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedArtwork(artwork)}
                  >
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
                      <h4 className="font-semibold text-gray-800 mb-2 truncate">{artwork.title}</h4>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>👤 Student: {artwork.student_id}</p>
                        <p>📊 {getCategoryName(artwork.category_id)}</p>
                      </div>
                      
                      {/* Score */}
                      <div className="mt-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(artwork.score)}`}>
                          {artwork.score ? `Score: ${artwork.score}` : 'Not scored'}
                        </span>
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
      {!loading && allArtworks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="text-lg font-semibold mb-2">No artworks found</h3>
          <p>
            {filters.country 
              ? `No artwork submissions found for ${filters.country}`
              : 'No artwork submissions have been uploaded yet'
            }
          </p>
        </div>
      )}

      {/* Artwork Detail Modal */}
      {selectedArtwork && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">{selectedArtwork.title}</h3>
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image */}
                <div>
                  {selectedArtwork.file_url ? (
                    <img 
                      src={selectedArtwork.file_url} 
                      alt={selectedArtwork.title}
                      className="w-full h-auto rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <div className="text-6xl mb-4">🎨</div>
                        <p>Artwork Preview</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Participant Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Student ID:</strong> {selectedArtwork.student_id}</p>
                      <p><strong>Country:</strong> {getCountryFlag(selectedArtwork.country)} {selectedArtwork.country}</p>
                      <p><strong>Category:</strong> {getCategoryName(selectedArtwork.category_id)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Evaluation</h4>
                    <div className="space-y-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(selectedArtwork.score)}`}>
                        {selectedArtwork.score ? `Score: ${selectedArtwork.score}/100` : 'Not scored yet'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}