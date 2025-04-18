import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';

// Данные о представителях - обновлены до 4 представителей
const representatives = [
  {
    id: 1,
    name: "Janegizova Ulsaya",
    role: "National Coordinator",
    email: "tigers@example.kz",
    phone: "+7 700 022 0880"
  },
  {
    id: 2,
    name: "John Smith",
    role: "Country Representative",
    email: "tigers@example.us",
    phone: "+1 800 555 0100"
  },
  {
    id: 3,
    name: "Ravi Kumar",
    role: "Country Representative",
    email: "tigers@example.in",
    phone: "+91 98765 43210"
  },
  {
    id: 4,
    name: "Anna Petrova",
    role: "Country Representative",
    email: "tigers@example.ru",
    phone: "+7 495 123 4567"
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
      
      {/* Header Section с логотипом */}
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
              Country Representatives
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
            {/* Декоративные круги */}
            <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-0 right-0 w-32 h-32 border-2 border-white rounded-full opacity-20 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 border-2 border-white rounded-full opacity-20 -translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-2 border-white rounded-full opacity-20 translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10 text-center">
              <p className="text-lg mb-4">
                The International Tigers Olympiad has a network of regional representatives and coordinators around the globe.
              </p>
              <p className="text-lg">
                These representatives serve as local points of contact for schools and students, helping to promote the Olympiad and assist participants in their region. You can reach out to them for country-specific queries, guidance on registration, or information about any local meet-ups or training sessions.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Representatives Grid - обновлено до 2x2 сетки */}
      <div className="px-4 mb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {representatives.map((rep) => (
              <div key={rep.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-orange-600 mb-2">{rep.name}</h3>
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
              If your country is not listed and you're interested in becoming a Tigers Olympiad representative, we'd love to hear from you! Help us bring this enriching experience to students in your region.
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
          <p className="text-center text-gray-700">
            Together, through our representatives and participants, we are building a global community that celebrates knowledge, curiosity, and academic excellence. Reach out to your local representative today — they are here to help you on your Tigers Olympiad journey!
          </p>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}