import Navbar from '../../components/navbar.js';
import Footer from '../../components/footer.js';
import Link from 'next/link';

export default function Registration() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-pink-500 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold">Registration</h1>
          <p className="mt-4 text-xl max-w-3xl mx-auto">
            Join the International Tigers Olympiad and showcase your talents on a global stage
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-8">
            To participate in the International Tigers Olympiad, students must register through 
            an official national representative in their country.
          </p>
          
          <p className="text-lg mb-8">
            Each country has a designated representative organization that manages registration, 
            provides information, and coordinates the National Round locally.
          </p>
          
          <div className="bg-orange-50 p-8 rounded-lg mb-10">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">How to register:</h2>
            
            <ol className="space-y-6">
              <li className="flex">
                <div className="flex-shrink-0 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">1</div>
                <div>
                  <p className="text-lg">
                    Find your country's representative in the{' '}
                    <Link href="/representatives" className="text-pink-500 hover:underline">
                      Representatives
                    </Link>{' '}
                    section of this website.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">2</div>
                <div>
                  <p className="text-lg">
                    Contact the representative directly to receive detailed registration instructions, 
                    local deadlines, participation fees and venue information.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">3</div>
                <div>
                  <p className="text-lg">
                    Complete your registration through the representative's official process.
                  </p>
                </div>
              </li>
            </ol>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg mb-10">
            <h3 className="text-xl font-bold mb-4">Please note:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Registration is not available through the international website.</li>
              <li>Each national representative sets registration procedures based on local context.</li>
              <li>All participants must take the Olympiad in English.</li>
            </ul>
          </div>
          
          <p className="text-lg mb-6">
            For general questions or if your country does not yet have a representative, 
            contact the international team at{' '}
            <a href="mailto:info@tigers-olympiad.org" className="text-pink-500 hover:underline">
              info@tigers-olympiad.org
            </a>
          </p>
          
          <div className="text-center mt-12">
            <Link 
              href="/representatives" 
              className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-pink-500 transition-colors"
            >
              Find Your Country Representative
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}