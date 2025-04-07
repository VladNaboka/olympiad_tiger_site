import Navbar from '../../components/navbar.js';
import Footer from '../../components/footer.js';
import Link from 'next/link';

// Representatives data
const representatives = [
  {
    id: 1,
    country: "Kazakhstan",
    name: "Janegizova Ulsaya",
    role: "National Coordinator",
    phone: "+7 700 022 0880",
    email: "tigers@example.kz",
    hasDetails: true
  },
  {
    id: 2,
    country: "United States",
    name: "John Smith",
    role: "Country Representative",
    phone: "+1 800 555 0100",
    email: "tigers@example.us",
    hasDetails: true
  },
  {
    id: 3,
    country: "India",
    name: "Ravi Kumar",
    role: "Country Representative",
    phone: "+91 98765 43210",
    email: "tigers@example.in",
    hasDetails: true
  },
  {
    id: 4,
    country: "Russia",
    name: "Anna Petrova",
    role: "Country Representative",
    phone: "+7 495 123 4567",
    email: "tigers@example.ru",
    hasDetails: true
  },
  {
    id: 5,
    country: "China",
    name: "Coming Soon",
    role: "",
    phone: "",
    email: "",
    hasDetails: false
  },
  {
    id: 6,
    country: "United Kingdom",
    name: "Coming Soon",
    role: "",
    phone: "",
    email: "",
    hasDetails: false
  },
  {
    id: 7,
    country: "Canada",
    name: "Coming Soon",
    role: "",
    phone: "",
    email: "",
    hasDetails: false
  },
  {
    id: 8,
    country: "Australia",
    name: "Coming Soon",
    role: "",
    phone: "",
    email: "",
    hasDetails: false
  }
];

export default function Representatives() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold text-orange-400">Country Representatives</h1>
          <p className="mt-4 text-xl max-w-3xl mx-auto">
            Connect with the Tigers Olympiad representatives in your country
          </p>
        </div>
      </div>
      
      {/* Representatives Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <p className="text-lg text-center mb-12">
            The International Tigers Olympiad has a network of regional representatives and 
            coordinators around the globe. These representatives serve as local points of contact 
            for schools and students, helping to promote the Olympiad and assist participants 
            in their region. You can reach out to them for country-specific queries, guidance 
            on registration, or information about any local meet-ups or training sessions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {representatives.map((rep) => (
              <div key={rep.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-orange-500 text-white p-4">
                  <h3 className="text-xl font-bold">{rep.country}</h3>
                </div>
                
                <div className="p-6">
                  {rep.hasDetails ? (
                    <>
                      <p className="font-bold text-lg mb-2">{rep.name}</p>
                      <p className="text-gray-600 mb-1">{rep.role}</p>
                      
                      <div className="mt-4 space-y-2">
                        <p className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                          <span>{rep.phone}</span>
                        </p>
                        <p className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                          <span>{rep.email}</span>
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-lg text-gray-500">{rep.name}</p>
                      <p className="mt-2 text-sm text-gray-400">
                        We're expanding to this country soon.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-orange-50 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-orange-500 mb-4">Become a Representative</h3>
            <p className="mb-6">
              If your country is not listed and you're interested in becoming a Tigers Olympiad 
              representative, we'd love to hear from you! Help us bring this enriching 
              experience to students in your region.
            </p>
            <Link 
              href="/contacts" 
              className="inline-block bg-pink-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-orange-500 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg">
              Together, through our representatives and participants, we are building a global community 
              that celebrates knowledge, curiosity, and academic excellence. Reach out to your local 
              representative today — they are here to help you on your Tigers Olympiad journey!
            </p>
          </div>
        </div>
      </section>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}