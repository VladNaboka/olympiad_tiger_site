import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';

// Updated representatives data - now focused on Julia Ovdiichuk as main representative
const representatives = [
  {
    id: 1,
    country: "Kazakhstan",
    name: "Yuliya Ovdiichuk",
    role: "National Coordinator",
    email: "yuliya@tigersedu.com",
    phone: "+7 700 595 1000"
  },
  {
    id: 2,
    country: "Malawi",
    name: "Doreen Dalitso Kayoyo",
    role: "Country Representative",
    email: "info@discomcommunications.com",
    phone: "+1 (425) 648-9813"
  },
  {
    id: 3,
    country: "Ghana", 
    name: "SARAH AKUTEY KWAMEFIO",
    role: "Country Representative",
    email: "info@tourifygh.com",
    phone: "+233 20 738 5788"
  },
  {
    id: 4,
    country: "Kyrgyzstan",
    name: "Mamiraliyeva Nurida Alibekovna",
    role: "Country Representative",
    email: "selfvisakg@gmail.com",
    phone: "+996555349685"
  },
  {
    id: 5,
    country: "Uzbekistan",
    name: "Mamiraliyeva Nurida Alibekovna",
    role: "Country Representative",
    email: "selfvisakg@gmail.com",
    phone: "+996555349685"
  }
];

export default function Representatives() {
  return (
    <div 
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{
        backgroundImage: 'url("/image/fonmain1.png")', 
      }}
    >
      <Navbar />
      
      {/* Header Section with logo */}
      <div className="py-12 px-2 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-6">
              <div className="flex flex-col items-center">
                <img
                  src="/image/representativesimg.png"
                  alt="Tigers Logo"
                  width={300}
                  height={300}
                  className="mb-4"
                />
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-orange-600 mb-5 text-center">
              🌍 REPRESENTATIVES
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl text-center mb-12">
              Connect with the Tigers Olympiad representatives in your country
            </p>
          </div>
        </div>
      </div>
      
      {/* Info Block */}
      <div className="px-4 mb-12">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-[#d686b7] text-white p-8 rounded-2xl relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-0 right-0 w-32 h-32 border-2 border-white rounded-full opacity-20 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 border-2 border-white rounded-full opacity-20 -translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-2 border-white rounded-full opacity-20 translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10 text-center">
              <p className="text-lg mb-4">
                The Tigers Olympiad is supported by a global team of passionate coordinators and educators 
                who guide students in their home countries.
              </p>
              <p className="text-lg">
                These representatives are your personal connection to everything Tigers — from registration 
                to local events and support. They help grow the spirit of academic excellence and creativity 
                in every corner of the world.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Representative Highlight - Julia Ovdiichuk */}
      <div className="px-4 mb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-orange-600 text-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center">📍 Key Representative</h3>
            <div className="bg-white text-gray-800 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-grow">
                  <h4 className="text-xl font-bold text-orange-600 mb-2">🇰🇿 Kazakhstan</h4>
                  <h5 className="text-lg font-semibold mb-2">Yuliya Ovdiichuk</h5>
                  <p className="text-gray-600 mb-4">National Coordinator</p>
                  
                  <div className="flex items-center mb-2">
                    <span className="flex-shrink-0 text-orange-500 mr-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </span>
                    <span className="text-gray-700">📞 +7700 595 1000</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="flex-shrink-0 text-orange-500 mr-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </span>
                    <span className="text-gray-700">📧 yuliya@tigersedu.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Representatives Grid - updated to 2x2 grid */}
      <div className="px-4 mb-16">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Other Country Representatives</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {representatives.slice(1).map((rep) => (
              <div key={rep.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-orange-600 mb-2">🌍 {rep.country}</h3>
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">{rep.name}</h4>
                  <p className="text-gray-700 mb-4">{rep.role}</p>
                  
                  <div className="flex items-center mb-2">
                    <span className="flex-shrink-0 text-orange-500 mr-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </span>
                    <span className="text-gray-700">{rep.email}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="flex-shrink-0 text-orange-500 mr-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </span>
                    <span className="text-gray-700">{rep.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Become a Representative */}
      <div className="px-4 mb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <h2 className="text-3xl font-bold text-orange-600 mb-6">Become a Representative</h2>
            <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
              If your country is not listed and you're interested in becoming a Tigers Olympiad representative, 
              we'd love to hear from you! Help us bring this enriching experience to students in your region.
            </p>
            <Link 
              href="/contacts" 
              className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
      
      {/* Final Message */}
      <div className="px-4 mb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-yellow-50 p-8 rounded-xl text-center">
            <p className="text-gray-700 text-lg">
              Through this network of representatives and brilliant participants like you, we're building 
              a global community of dreamers, thinkers, and creators. Connect with your representative 
              today — and start your Tigers journey! 🐯🌟
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}