import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';

// Representatives data - automatically sorted alphabetically by country
const representativesData = [
  {
    id: 1,
    country: "Cameroon",
    name: "",
    role: "Global Dominium Services",
    email: "info@gdiglobalinstitute.com",
    phone: "+237694445032",
  },
  {
    id: 2,
    country: "Chad",
    name: "Dr Njamen Njanke Albert",
    role: "Global Dominium Services",
    email: "info@gdiglobalinstitute.com",
    phone: "+237694445032",
  },
  {
    id: 3,
    country: "Estonia",
    name: "Fatma Ince",
    role: "Lumora Foundation",
    email: "info@lumorafoundation.com",
    phone: "+905365516820",
  },
  {
    id: 4,
    country: "Ethiopia",
    name: "Lamesgin Aylew Desta",
    role: "One Stop Solution",
    email: "Info@onestoptravelagent.com",
    phone: "+0911888469",
  },
  {
    id: 5,
    country: "Ghana",
    name: "Sarah Akutey Kwamefio",
    role: "Tourify",
    email: "info@tourifygh.com",
    phone: "+233207385788",
  },
  {
    id: 6,
    country: "Guinea",
    name: "Dr Njamen Njanke Albert",
    role: "Global Dominium Services",
    email: "info@gdiglobalinstitute.com",
    phone: "+237695484321",
  },
  {
    id: 7,
    country: "Hungary",
    name: "Tsovoo Enkhzaya",
    role: "Oner Education",
    email: "admissions@onereducation.eu",
    phone: "+36702039596",
  },
  {
    id: 8,
    country: "Iran",
    name: "Mehdi Aghaei",
    role: "Nirvana Immigration Holding",
    email: "mehdiaghaei01@gmail.com",
    phone: "+989126484541",
  },
  {
    id: 9,
    country: "Ireland",
    name: "Joseph Ogun",
    role: "Linkproconsult Integrated Limited",
    email: "joseph.ogun@linkproconsult.com",
    phone: "+353877442271",
  },
  {
    id: 10,
    country: "Kazakhstan",
    name: "Yuliya Ovdiichuk",
    role: "National Coordinator",
    email: "yuliya@tigersedu.com",
    phone: "+7 700 595 1000",
    isMain: true
  },
  {
    id: 11,
    country: "Kenya",
    name: "Dr. Noah Migudo Winja",
    role: "Wmeir-Winja & Partners",
    email: "winjapartners@consultant.com",
    phone: "+254726372941",
  },
  {
    id: 12,
    country: "Malawi",
    name: "Doreen Dalitso Kayoyo",
    role: "Discom Communications",
    email: "info@discomcommunications.com",
    phone: "+14256489813",
  },
  {
    id: 13,
    country: "Mali",
    name: "Dr Njamen Njanke Albert",
    role: "Global Dominium Services",
    email: "info@gdiglobalinstitute.com",
    phone: "+237695484321",
  },
  {
    id: 14,
    country: "Mongolia",
    name: "Temuujin Naidandorj",
    role: "Oner Vision Academy",
    email: "temuujin@onervisionacademy.com",
    phone: "+97686964264",
  },
  {
    id: 15,
    country: "Nigeria",
    name: "Dr. Daniel OLA",
    role: "The WorldXplorers Ltd.",
    email: "info@worldxplorer.co",
    phone: "+2348032073056",
  },
  {
    id: 16,
    country: "Rwanda",
    name: "Dr. Noah Migudo Winja",
    role: "Wmeir-Winja & Partners",
    email: "winjapartners@consultant.com",
    phone: "+254726372941",
  },
  {
    id: 17,
    country: "South Africa",
    name: "Joseph Ogun",
    role: "Linkproconsult Integrated Limited",
    email: "joseph.ogun@linkproconsult.com",
    phone: "+353877442271",
  },
  {
    id: 18,
    country: "Tanzania",
    name: "Sarfraz Kassam",
    role: "EduKwanza",
    email: "sarfraz.kassam@edukwanza.com",
    phone: "+255787001786",
  },
  {
    id: 19,
    country: "Togo",
    name: "Dr Njamen Njanke Albert",
    role: "Global Dominium Services",
    email: "info@gdiglobalinstitute.com",
    phone: "+237657385562",
  },
  {
    id: 20,
    country: "Turkey",
    name: "Fatma Ince",
    role: "YELS International Education and Consultancy",
    email: "info@yelsdanismanlik.com",
    phone: "+905365516820",
  },
  {
    id: 21,
    country: "Uganda",
    name: "Dr. Noah Migudo Winja",
    role: "Wmeir-Winja & Partners",
    email: "winjapartners@consultant.com",
    phone: "+254726372941",
  },
  {
    id: 22,
    country: "Japan",
    name: "Temuulen Batgerel",
    role: "Oner International",
    email: "temuulen@onereducation.eu",
    phone: "+8107091397202",
  },
];

// Automatically sort by country name alphabetically
const representatives = representativesData.sort((a, b) =>
  a.country.localeCompare(b.country)
);

export default function Representatives() {
  // Filter out the main representative for the grid
  const otherReps = representatives.filter(rep => !rep.isMain);
  const mainRep = representatives.find(rep => rep.isMain);

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
              REPRESENTATIVES
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl text-center mb-8">
              Connect with the Tigers Olympiad representatives in your country
            </p>
          </div>
        </div>
      </div>

      {/* Info Block */}
      <div className="px-4 mb-12">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-[#d686b7] text-white p-8 rounded-2xl relative overflow-hidden">
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
                to local events and support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* All Representatives - Alphabetical Grid */}
      <div className="px-4 mb-16">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Country Representatives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherReps.map((rep) => (
              <div
                key={rep.id}
                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="text-lg font-bold text-orange-600 mb-1">{rep.country}</h4>
                {rep.name && <p className="font-medium text-gray-800">{rep.name}</p>}
                <p className="text-gray-600 text-sm mb-3">{rep.role}</p>

                <div className="space-y-1 text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <span className="truncate">{rep.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <span>{rep.phone}</span>
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
              today — and start your Tigers journey!
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
