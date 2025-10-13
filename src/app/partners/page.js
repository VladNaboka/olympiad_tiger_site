import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';

// Partners data - можно будет легко добавить реальных партнеров
const partners = [
  {
    id: 1,
    name: "Owlwin Educational Company",
    description: "A trusted international educational company with over 10 years of experience in organizing academic camps and Olympiads abroad.",
    category: "Educational Partner",
    website: "https://www.owlwinexchange.com",
    logo: "/image/logo-owlwin.jpeg"
  },
  {
    id: 2,
    name: "SIL Olympiad",
    description: "SiL Subject Tests, a rigorously designed, research-backed language assessment for Years 1-9. STEM and English Tests, developed by graduates from the University of Oxford’s Department of Education and marked by a team of Oxford and Cambridge (Oxbridge) specialists. Our test is aligned with the British National Curriculum and designed to challenge students while identifying high achievers both nationally and internationally.",
    category: "Art Partner",
    website: "https://sharingislearning.com/",
    logo: "/image/sil-olympiad.jpeg"
  },
  {
    id: 3,
    name: "Global Art Foundation",
    description: "Promoting artistic excellence and cultural exchange among young artists internationally.",
    category: "Cultural Partner",
    website: "#",
    logo: "/image/partner-placeholder.png"
  },
  {
    id: 4,
    name: "Prague Cultural Center",
    description: "Hosting international events and exhibitions in the beautiful city of Prague.",
    category: "Venue Partner",
    website: "#",
    logo: "/image/partner-placeholder.png"
  },
  {
    id: 5,
    name: "Youth Development Initiative",
    description: "Dedicated to fostering creativity and innovation in young minds across borders.",
    category: "Development Partner",
    website: "#",
    logo: "/image/partner-placeholder.png"
  },
  {
    id: 6,
    name: "Digital Art Academy",
    description: "Leading provider of digital art education and technological innovation in creative fields.",
    category: "Technology Partner",
    website: "#",
    logo: "/image/partner-placeholder.png"
  }
];

// Category colors
const getCategoryColor = (category) => {
  switch (category) {
    case 'Educational Partner':
      return 'bg-blue-100 text-blue-800';
    case 'Cultural Partner':
      return 'bg-purple-100 text-purple-800';
    case 'Art Partner':
      return 'bg-orange-100 text-orange-800';
    case 'Venue Partner':
      return 'bg-green-100 text-green-800';
    case 'Development Partner':
      return 'bg-orange-100 text-orange-800';
    case 'Technology Partner':
      return 'bg-pink-100 text-pink-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function OurPartners() {
  return (
    <div
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{
        backgroundImage: 'url("/image/fonmain1.png")',
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <div className="py-16 px-4 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left - Torch Logo */}
            <div className="md:w-1/4">
              <img
                src="/image/rulesfakel.png"
                alt="Tigers Olympiad Torch Logo"
                width="300"
                height="400"
                style={{ width: "300px" }}
              />
            </div>

            {/* Center - Title and Description */}
            <div className="md:w-2/4 text-center my-8 md:my-0">
              <h1 className="text-5xl font-bold text-orange-600 mb-6">
                🤝 Our Partners
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Together with our trusted partners, we create inspiring opportunities
                for young talents around the world
              </p>
            </div>

            {/* Right - Tiger Mascot */}
            <div className="md:w-1/4">
              <img
                src="/image/rules1.png"
                alt="Tigers Olympiad Mascot"
                width="350"
                height="350"
                style={{ width: "350px" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Philosophy */}
      <div className="px-4 mb-12">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-8 rounded-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-2 border-white rounded-full opacity-20 translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold mb-6">Building a Global Community</h2>
              <p className="text-xl mb-4">
                TIGERS operates under the umbrella of Owlwin, a trusted international educational
                company with over 10 years of experience in organizing academic camps and Olympiads abroad.
              </p>
              <p className="text-lg">
                Together with our partners, we aim to create inspiring opportunities for young talents,
                fostering creativity, cultural exchange, and academic excellence across borders.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="px-4 pb-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
            Meet Our Partners
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Partner Logo */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  {partner.logo && partner.logo !== "/image/partner-placeholder.png" ? (
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">🏢</div>
                      <p className="text-sm">Partner Logo</p>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(partner.category)}`}>
                      {partner.category}
                    </span>
                  </div>

                  {/* Partner Info */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{partner.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{partner.description}</p>

                  {/* Action Button */}
                  <div className="flex justify-between items-center">
                    <a
                      href={partner.website}
                      className="text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors"
                    >
                      Learn More →
                    </a>
                    <div className="text-2xl">🌟</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Become a Partner */}
      <div className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gray-100 p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Become Our Partner</h3>
            <p className="text-gray-600 mb-6">
              Join us in creating inspiring opportunities for young talents worldwide.
              Together, we can make a meaningful impact on the future of education and creativity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacts"
                className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Contact Us
              </Link>
              <a
                href="mailto:yuliya@tigersedu.com"
                className="inline-block bg-gray-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Email Partnership Team
              </a>
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