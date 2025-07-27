import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';

export default function Registration() {
  return (
    <div 
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{
        backgroundImage: 'url("/image/fonmain1.png")', 
      }}
    >
      <Navbar />
      
      {/* Hero Section with Torch Logo, Title and Tiger Mascot */}
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
                style={{width: "300px"}}
              />
            </div>
            
            {/* Center - Title and Description */}
            <div className="md:w-2/4 text-center my-8 md:my-0">
              <h1 className="text-5xl font-bold text-orange-600 mb-6">
                Registration
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Join the International Tigers Olympiad and showcase your talents on a global stage
              </p>
            </div>
            
            {/* Right - Tiger Mascot with Flag */}
            <div className="md:w-1/4">
              <img 
                src="/image/registration-tiger.png" 
                alt="Tigers Olympiad Mascot with Flag" 
                width="350"
                height="350"
                style={{width: "350px"}}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Section */}
      <div className="px-4 pb-16">
        <div className="container mx-auto max-w-6xl">
          {/* Registration Info with Student Image */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Left Content - Centered text aligned with image */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <p className="text-xl mb-6 text-gray-800">
                To participate in the International Tigers Olympiad, students 
                must register through an official Country Representative in 
                their home country.
              </p>
              
              <p className="text-xl mb-6 text-gray-800">
                Each participating country is supported by a designated representative 
                organization. These trusted partners manage local registration, provide 
                guidance, and coordinate the National Round in your region.
              </p>
            </div>
            
            {/* Right Content - Student Image */}
            <div className="lg:w-1/2 relative">
              <div className="bg-yellow-300 rounded-2xl overflow-hidden">
                <img 
                  src="/image/people-reg.png" 
                  alt="Student with Books" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Tiger paw */}
              <img 
                src="/image/lapa.png" 
                alt="Tiger Paw" 
                className="absolute -bottom-10 -left-15 w-40 h-40"
              />
            </div>
          </div>
          
          {/* How to Register Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-orange-600 mb-6">How to register:</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              {/* Step 1 */}
              <div className="bg-pink-400 p-6 text-white rounded-tl-lg rounded-bl-lg">
                <div className="text-4xl font-bold mb-4">01</div>
                <p>
                  Visit the Representatives section on this website to find 
                  your country's official representative.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="bg-pink-400 p-6 text-white">
                <div className="text-4xl font-bold mb-4">02</div>
                <p>
                  Contact the representative directly to receive details on 
                  registration steps, deadlines, participation fees, and 
                  local venue information.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="bg-pink-400 p-6 text-white rounded-tr-lg rounded-br-lg">
                <div className="text-4xl font-bold mb-4">03</div>
                <p>
                  Complete your registration through the official local process.
                </p>
              </div>
            </div>
          </div>
          
          {/* Important Notes Section */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4">🛑 Important Notes:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              <div className="bg-orange-600 p-6 text-white rounded-tl-lg rounded-bl-lg">
                <p>
                  Registration is not available through the international website.
                </p>
              </div>
              
              <div className="bg-orange-600 p-6 text-white">
                <p>
                  Each Country Representative follows local guidelines for 
                  registration and participation.
                </p>
              </div>
              
              <div className="bg-orange-600 p-6 text-white rounded-tr-lg rounded-br-lg">
                <p>
                  All students must participate in the Olympiad in English, 
                  regardless of location.
                </p>
              </div>
            </div>
          </div>
          
          {/* Take the First Step Section */}
{/* Take the First Step Section - исправленная версия для мобильных */}
<div className="bg-white p-8 rounded-lg text-center mb-8">
            <h2 className="text-2xl font-bold text-orange-700 mb-4">Take the First Step</h2>
            <p className="text-lg mb-6">
              If your country is not yet represented or you have general questions, 
              please reach out to the International Coordination Team — we're here to help!
            </p>
            <p className="text-lg mb-6">
              Join the Olympiad by registering today — and begin your journey toward 
              representing your school and your country on the international academic stage.
            </p>
            
            {/* Исправленные кнопки - вертикально на мобильных, горизонтально на десктопе */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/representatives" 
                className="w-full sm:w-auto bg-orange-500 text-white py-3 px-6 md:px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors text-center"
              >
                Find Your Country Representative
              </Link>
              
              <Link 
                href="/contacts" 
                className="w-full sm:w-auto bg-gray-500 text-white py-3 px-6 md:px-8 rounded-full text-lg font-semibold hover:bg-gray-600 transition-colors text-center"
              >
                Contact International Team
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