'use client';

import { useState, useEffect } from 'react';
import {
    getMathWorksByCountryAndCategory,
    deleteMathWork,
    setMathWorkScore,
    createMathWork
} from '../../api/student_math_works';
import { COUNTRIES, CATEGORIES, getCategoryName } from '../../utils/constants';

export default function GlobalMathWorksTab({ filters }) {
    const [allWorks, setAllWorks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedWork, setSelectedWork] = useState(null);
    const [scoreInput, setScoreInput] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newWork, setNewWork] = useState({
        student_id: '',
        title: '',
        country: '',
        category_id: ''
    });

    const loadGlobalMathWorks = async () => {
        setLoading(true);
        try {
            const countriesToLoad = filters.country ? [filters.country] : COUNTRIES;

            const promises = countriesToLoad.map(async (country) => {
                try {
                    const categoryPromises = CATEGORIES.map(category =>
                        getMathWorksByCountryAndCategory(country, category.id).catch(() => [])
                    );
                    const categoryResults = await Promise.all(categoryPromises);
                    const countryWorks = categoryResults.flat().filter(w => w && w.title);

                    return countryWorks.length > 0
                        ? countryWorks.map(work => ({ ...work, country }))
                        : [];
                } catch {
                    return [];
                }
            });

            const results = await Promise.all(promises);
            const globalWorks = results.flat();

            setAllWorks(globalWorks);
        } catch (error) {
            console.error('Error loading global math works:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadGlobalMathWorks();
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

    const artworksByCountry = allWorks.reduce((acc, work) => {
        if (!work) return acc;
        const country = work.country;
        if (!acc[country]) {
            acc[country] = [];
        }
        acc[country].push(work);
        return acc;
    }, {});

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this math work?')) return;
        try {
            await deleteMathWork(id);
            setSelectedWork(null);
            loadGlobalMathWorks();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleScoreSave = async (id) => {
        if (scoreInput === '') return;
        try {
            await setMathWorkScore(id, parseInt(scoreInput));
            setSelectedWork({ ...selectedWork, score: parseInt(scoreInput) });
            loadGlobalMathWorks();
        } catch (error) {
            console.error('Score update error:', error);
        }
    };

    const [formError, setFormError] = useState('');

    const handleAddWork = async () => {
        // Валидация
        if (!newWork.student_id || !newWork.title || !newWork.country || !newWork.category_id) {
            setFormError('Please fill in all fields before adding.');
            return;
        }

        try {
            setFormError('');
            await createMathWork(newWork);
            setShowAddModal(false);
            setNewWork({ student_id: '', title: '', country: '', category_id: '' });
            loadGlobalMathWorks();
        } catch (error) {
            console.error('Create math work error:', error);
            setFormError('Failed to create math work. Please try again.');
        }
    };


    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Global Math Works</h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Math problem submissions from all participating countries
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                        Total works: {allWorks.length}
                    </span>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center"
                    >
                        ➕ Add Math Work
                    </button>
                    <button
                        onClick={loadGlobalMathWorks}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
                    >
                        🔄 Refresh
                    </button>
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading math works...</p>
                </div>
            )}

            {/* Works by country */}
            {!loading && (
                <div className="space-y-8">
                    {Object.entries(artworksByCountry)
                        .filter(([_, works]) => works.length > 0)
                        .map(([country, works]) => (
                            <div key={country} className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                                    <span className="text-2xl mr-2">{getCountryFlag(country)}</span>
                                    {country}
                                    <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                                        {works.length} work{works.length !== 1 ? 's' : ''}
                                    </span>
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {works.map((work) => (
                                        <div
                                            key={`math-${work.id}`}
                                            className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                                            onClick={() => {
                                                setSelectedWork(work);
                                                setScoreInput(work.score || '');
                                            }}
                                        >
                                            <div className="p-4">
                                                <h4 className="font-semibold text-gray-800 mb-2 truncate">{work.title}</h4>

                                                <div className="space-y-1 text-sm text-gray-600">
                                                    <p>👤 Student: {work.student_id}</p>
                                                    <p>📊 {getCategoryName(work.category_id)}</p>
                                                </div>

                                                <div className="mt-3">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(work.score)}`}
                                                    >
                                                        {work.score ? `Score: ${work.score}` : 'Not scored'}
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

            {/* No works */}
            {!loading && allWorks.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-4">📐</div>
                    <h3 className="text-lg font-semibold mb-2">No math works found</h3>
                    <p>
                        {filters.country
                            ? `No math works found for ${filters.country}`
                            : 'No math works have been uploaded yet'}
                    </p>
                </div>
            )}

            {/* View work modal */}
            {selectedWork && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">{selectedWork.title}</h3>
                                <button
                                    onClick={() => setSelectedWork(null)}
                                    className="text-gray-500 hover:text-gray-700 text-2xl"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Participant Details</h4>
                                    <p><strong>Student ID:</strong> {selectedWork.student_id}</p>
                                    <p><strong>Country:</strong> {getCountryFlag(selectedWork.country)} {selectedWork.country}</p>
                                    <p><strong>Category:</strong> {getCategoryName(selectedWork.category_id)}</p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Evaluation</h4>
                                    <input
                                        type="number"
                                        placeholder="Enter score"
                                        value={scoreInput}
                                        onChange={(e) => setScoreInput(e.target.value)}
                                        className="border px-2 py-1 rounded w-32"
                                    />
                                    <button
                                        onClick={() => handleScoreSave(selectedWork.id)}
                                        className="ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        Save Score
                                    </button>
                                </div>

                                <div className="pt-4 border-t">
                                    <button
                                        onClick={() => handleDelete(selectedWork.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Delete Work
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add work modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-lg w-full p-6">
                        <h3 className="text-xl font-bold mb-4">Add Math Work</h3>

                        {formError && (
                            <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">
                                {formError}
                            </div>
                        )}

                        <input
                            type="number"
                            placeholder="Student ID"
                            value={newWork.student_id}
                            onChange={(e) => setNewWork({ ...newWork, student_id: e.target.value })}
                            className={`border w-full p-2 rounded mb-3 ${!newWork.student_id && formError ? 'border-red-500' : ''}`}
                        />

                        <input
                            type="text"
                            placeholder="Title"
                            value={newWork.title}
                            onChange={(e) => setNewWork({ ...newWork, title: e.target.value })}
                            className={`border w-full p-2 rounded mb-3 ${!newWork.title && formError ? 'border-red-500' : ''}`}
                        />

                        <select
                            value={newWork.country}
                            onChange={(e) => setNewWork({ ...newWork, country: e.target.value })}
                            className={`border w-full p-2 rounded mb-3 ${!newWork.country && formError ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select Country</option>
                            {COUNTRIES.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>

                        <select
                            value={newWork.category_id}
                            onChange={(e) => setNewWork({ ...newWork, category_id: e.target.value })}
                            className={`border w-full p-2 rounded mb-4 ${!newWork.category_id && formError ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select Category</option>
                            {CATEGORIES.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddWork}
                                disabled={!newWork.student_id || !newWork.title || !newWork.country || !newWork.category_id}
                                className={`px-4 py-2 rounded text-white ${!newWork.student_id || !newWork.title || !newWork.country || !newWork.category_id
                                    ? 'bg-green-300 cursor-not-allowed'
                                    : 'bg-green-500 hover:bg-green-600'
                                    }`}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
