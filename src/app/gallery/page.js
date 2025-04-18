import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';
import Image from 'next/image';

// Примеры данных для галереи
const galleryItems = [
  {
    id: 1,
    image: '/image/artwork-sample.png',
    title: 'Final artworks on display during the international exhibition',
    category: 'Exhibition'
  },
  {
    id: 2,
    image: '/image/artwork-sample.png',
    title: 'Final artworks on display during the international exhibition',
    category: 'Exhibition'
  },
  {
    id: 3,
    image: '/image/artwork-sample.png',
    title: 'Final artworks on display during the international exhibition',
    category: 'Exhibition'
  },
  {
    id: 4,
    image: '/image/artwork-sample.png',
    title: 'Final artworks on display during the international exhibition',
    category: 'Exhibition'
  },
  {
    id: 5,
    image: '/image/artwork-sample.png',
    title: 'Final artworks on display during the international exhibition',
    category: 'Exhibition'
  },
  {
    id: 6,
    image: '/image/artwork-sample.png',
    title: 'Final artworks on display during the international exhibition',
    category: 'Exhibition'
  },
  {
    id: 7,
    image: '/image/artwork-sample.png',
    title: 'Final artworks on display during the international exhibition',
    category: 'Exhibition'
  },
  {
    id: 8,
    image: '/image/artwork-sample.png',
    title: 'Final artworks on display during the international exhibition',
    category: 'Exhibition'
  },
  {
    id: 9,
    image: '/image/artwork-sample.png',
    title: 'Final artworks on display during the international exhibition',
    category: 'Exhibition'
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
                Gallery
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Explore moments from Tigers Olympiad events around the world, 
                showcasing talented students and their creative achievements.
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
      
      {/* Gallery Grid */}
      <div className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-800 font-medium mb-2">{item.title}</p>
                  <div>
                    <span className="inline-block bg-pink-400 text-white px-4 py-1 rounded-full text-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}