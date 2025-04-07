import Navbar from '../../components/navbar.js';
import Footer from '../../components/footer.js';
import Image from 'next/image';

// Mock gallery data - in a real implementation, this would come from an API or CMS
const galleryItems = [
  {
    id: 1,
    title: "Mathematics Competition",
    description: "Students participating in the Mathematics round of the Tigers Olympiad",
    imagePath: "/api/placeholder/600/400",
    category: "competition"
  },
  {
    id: 2,
    title: "Drawing Exhibition",
    description: "Final artworks on display during the international exhibition",
    imagePath: "/api/placeholder/600/400",
    category: "exhibition"
  },
  {
    id: 3,
    title: "Award Ceremony",
    description: "Winners receiving their medals at the closing ceremony",
    imagePath: "/api/placeholder/600/400",
    category: "ceremony"
  },
  {
    id: 4,
    title: "Cultural Exchange",
    description: "Participants from different countries sharing experiences",
    imagePath: "/api/placeholder/600/400",
    category: "cultural"
  },
  {
    id: 5,
    title: "Student Artwork - Nature Theme",
    description: "Winning artwork from junior division, exploring themes of nature",
    imagePath: "/api/placeholder/600/400",
    category: "artwork"
  },
  {
    id: 6,
    title: "Team Collaboration",
    description: "Students working together during group activities",
    imagePath: "/api/placeholder/600/400",
    category: "competition"
  },
  {
    id: 7,
    title: "USA Final Event",
    description: "Participants gathered at the international final in the United States",
    imagePath: "/api/placeholder/600/400",
    category: "ceremony"
  },
  {
    id: 8,
    title: "Student Artwork - Technology Theme",
    description: "Winning artwork from senior division, exploring themes of technology",
    imagePath: "/api/placeholder/600/400",
    category: "artwork"
  }
];

export default function Gallery() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold text-orange-400">Gallery</h1>
          <p className="mt-4 text-xl max-w-3xl mx-auto">
            Explore moments from Tigers Olympiad events around the world, 
            showcasing talented students and their creative achievements.
          </p>
        </div>
      </div>
      
      {/* Gallery Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <p className="text-lg text-center max-w-3xl mx-auto mb-12">
            International Olympiad events bring together talented students worldwide. 
            In our gallery, you will find inspiring moments captured from Tigers Olympiad 
            events over the years. This includes snapshots of participants in action, 
            cultural exchange activities, and triumphant award ceremonies that celebrate 
            our champions. These images showcase the excitement and camaraderie that define 
            the Tigers Olympiad experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
                <div className="relative h-64">
                  <Image 
                    src={item.imagePath}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-orange-500 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <div className="mt-3">
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}