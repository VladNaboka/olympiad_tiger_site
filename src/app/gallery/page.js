import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';
import Image from 'next/image';

// Updated gallery data with new content and terminology
const galleryItems = [
  {
    id: 1,
    image: '/image/artwork-sample.png',
    title: 'Global Finals artwork exhibition in Prague',
    category: 'Art Exhibition',
    description: 'Professional artworks evaluated by international panel'
  },
  {
    id: 2,
    image: '/image/artwork-sample.png', 
    title: 'Mathematics competition at National Round',
    category: 'Mathematics',
    description: 'Students solving challenging problems under exam conditions'
  },
  {
    id: 3,
    image: '/image/artwork-sample.png',
    title: 'Cultural exchange during Global Finals',
    category: 'Cultural Exchange',
    description: 'Students from different countries connecting and sharing experiences'
  },
  {
    id: 4,
    image: '/image/artwork-sample.png',
    title: 'Award ceremony in Prague',
    category: 'Awards Ceremony',
    description: 'Recognition of top performers and achievements'
  },
  {
    id: 5,
    image: '/image/artwork-sample.png',
    title: 'Creative art workshops',
    category: 'Art Workshop',
    description: 'Students exploring different artistic techniques and styles'
  },
  {
    id: 6,
    image: '/image/artwork-sample.png',
    title: 'International finalists celebration',
    category: 'Global Finals',
    description: 'Celebrating academic and artistic excellence from around the world'
  },
  {
    id: 7,
    image: '/image/artwork-sample.png',
    title: 'Mathematical problem-solving session',
    category: 'Mathematics',
    description: 'Analytical thinking and creativity in action'
  },
  {
    id: 8,
    image: '/image/artwork-sample.png',
    title: 'Art exhibition opening',
    category: 'Art Exhibition',
    description: 'Showcasing creativity and unique perspectives from young artists'
  },
  {
    id: 9,
    image: '/image/artwork-sample.png',
    title: 'Tigers community gathering',
    category: 'Community',
    description: 'Building lifelong friendships and global connections'
  }
];

export default function Gallery() {
  return (
    <div 
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{
        backgroundImage: 'url("/image/fonmain1.png")', 
      }}
    >
      <Navbar />
      
      {/* Hero Section with Pink Torch and Tiger Eye */}
      <div className="py-16 px-4 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left - Pink Torch Logo */}
            <div className="md:w-1/4">
              <img 
                src="/image/pinkfakel.png" 
                alt="Tigers Olympiad Pink Torch Logo" 
                width="300"
                height="400"
                style={{width: "300px"}}
              />
            </div>
            
            {/* Center - Title and Description */}
            <div className="md:w-2/4 text-center my-8 md:my-0">
              <h1 className="text-5xl font-bold text-orange-600 mb-6">
                📸 Tigers Gallery
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                The Tigers Olympiad brings together some of the most inspiring young minds from around the world. 
                Our Photo Gallery captures the essence of this unique global event — from intense competition and 
                creative breakthroughs to cultural exchanges and joyful award ceremonies.
              </p>
            </div>
            
            {/* Right - Tiger Eye */}
            <div className="md:w-1/4">
              <img 
                src="/image/tiger3.png" 
                alt="Tiger Eye" 
                width="300"
                height="300"
                style={{width: "300px"}}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Inspiration Message */}
      <div className="px-4 mb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">🌟 Explore a World of Inspiration</h2>
            <p className="text-lg">
              Explore a world of inspiration, unity, and achievement through images that reflect 
              the heart of the Tigers experience. From mathematical breakthroughs to artistic masterpieces, 
              witness the journey of young minds pushing boundaries and celebrating excellence.
            </p>
          </div>
        </div>
      </div>
      
      {/* Gallery Grid */}
      <div className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-white border-2 border-gray-300"
                      style={{ 
                        color: 'black',
                        backgroundColor: 'white',
                        border: '2px solid #ccc'
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  
                  {/* Action buttons */}
                  <div className="flex justify-between items-center">
                    <button className="text-orange-500 hover:text-orange-600 font-medium text-sm">
                      View Details
                    </button>
                    <div className="flex space-x-2">
                      {item.category === 'Art Exhibition' && (
                        <span className="text-2xl">🎨</span>
                      )}
                      {item.category === 'Mathematics' && (
                        <span className="text-2xl">📐</span>
                      )}
                      {item.category === 'Global Finals' && (
                        <span className="text-2xl">🏆</span>
                      )}
                      {item.category === 'Cultural Exchange' && (
                        <span className="text-2xl">🌍</span>
                      )}
                      {item.category === 'Awards Ceremony' && (
                        <span className="text-2xl">🏅</span>
                      )}
                      {item.category === 'Art Workshop' && (
                        <span className="text-2xl">✨</span>
                      )}
                      {item.category === 'Community' && (
                        <span className="text-2xl">🤝</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Categories Legend */}
      <div className="px-4 pb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#000000' }}>Gallery Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-pink-500 rounded-full mr-2"></div>
                <span style={{ color: '#000000' }}>🎨 Art Exhibition</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                <span style={{ color: '#000000' }}>📐 Mathematics</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
                <span style={{ color: '#000000' }}>🏆 Global Finals</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span style={{ color: '#000000' }}>🌍 Cultural Exchange</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                <span style={{ color: '#000000' }}>🏅 Awards Ceremony</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-pink-400 rounded-full mr-2"></div>
                <span style={{ color: '#000000' }}>✨ Art Workshop</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                <span style={{ color: '#000000' }}>🤝 Community</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gray-100 p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Join the Tigers Experience?</h3>
            <p className="text-gray-600 mb-6">
              Be part of the next generation of Tigers Olympiad participants and create your own inspiring moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register" 
                className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Register Now
              </Link>
              <Link 
                href="/representatives" 
                className="inline-block bg-gray-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Find Your Representative
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}