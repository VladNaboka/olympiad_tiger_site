import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/image/logo.png';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fffbf2]">
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <div className="relative overflow-hidden">
        {/* Background image with school elements */}
        <div className="absolute z-0 w-full h-full max-w-6xl mx-auto left-0 right-0">
          <Image
            src="/image/fonmain1.png"
            alt="Background with school elements"
            fill
            className="object-contain opacity-30"
          />
        </div>
        
        {/* Main hero content */}
        <div className="container mx-auto px-4 py-8 md:py-24 flex flex-col lg:flex-row items-center relative z-10">
          <div className="lg:w-1/2 mb-4 lg:mb-0">
            <h1 className="text-5xl font-bold mb-6 text-black">
              International <span className="text-orange-500">Tigers</span><br />
              Olympiad
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              Where the world's brightest young minds meet innovation, 
              creativity, and challenge.
            </p>
            <Link 
              href="/register" 
              className="inline-block bg-orange-500 text-white py-2 px-16 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Register
            </Link>
          </div>
          <div className="lg:w-1/2 hidden lg:flex justify-center items-center">
            <div className="relative h-[550px] w-full">
              <Image 
                src="/image/main1.png" 
                alt="Tigers Mascot" 
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Orange info block - Updated content */}
      <div className="px-4 pb-8">
        <div className="container mx-auto max-w-6xl bg-orange-600 text-white py-12 px-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Welcome to the International Tigers Olympiad</h2>
          <p className="text-2xl text-center">
            A prestigious global event where the brightest young minds meet challenge, 
            creativity, and innovation. Open to students aged 6 to 17 from all countries, 
            the Olympiad offers a unique opportunity to shine in Mathematics and Art — 
            two disciplines that together reflect the full spectrum of human intelligence and expression.
          </p>
        </div>
      </div>
      
      {/* Empowerment Section - Updated content */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="flex space-x-4">
              <div className="relative w-48 h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/image/main2-2.png" 
                  alt="Math Student" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative mt-12 w-48 h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/image/main2-1.png" 
                  alt="Art Students" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative -mt-24 -ml-8">
              <Image 
                src="/image/lapa.png" 
                alt="Tiger Paw" 
                width={120} 
                height={120}
              />
            </div>
          </div>
          
          <div className="lg:w-1/2 order-1 lg:order-2">
            <h2 className="text-4xl font-bold mb-4 text-black">
              At Tigers every student<br />
              <span className="text-orange-500">chooses their own path</span>
            </h2>
            <ul className="text-lg text-gray-700 mb-8 list-disc pl-6">
              <li>Compete in Mathematics</li>
              <li>Compete in Art</li>
              <li>Or embrace both!</li>
            </ul>
            <p className="text-lg text-gray-700 mb-8">
              Participation in either or both categories is entirely optional — and warmly encouraged. 
              This flexible format lets students build on their strengths, try something new, 
              and experience the Olympiad in a way that's truly their own.
            </p>
            <Link 
              href="/register" 
              className="inline-block bg-amber-400 text-white py-3 px-12 rounded-full text-lg font-semibold hover:bg-amber-500 transition-colors"
            >
              Join Us
            </Link>
          </div>
        </div>
      </section>
      
      {/* Global Stage Section - Updated content */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-4 text-black">
              But Tigers is more than<br />
              just a competition —<br />
              <span className="text-orange-500">it's a global stage</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              for discovery and connection. Held entirely in English, the Olympiad brings 
              together ambitious students from every corner of the world — 
              to think, create, and grow together.
            </p>
            <Link 
              href="/register" 
              className="inline-block bg-amber-400 text-white py-3 px-12 rounded-full text-lg font-semibold hover:bg-amber-500 transition-colors"
            >
              Join the Movement
            </Link>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative h-80 w-full rounded-lg overflow-hidden">
              <Image 
                src="/image/peoplesmain.png" 
                alt="Students Celebrating" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section - Updated content */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
              <Image 
                src="/image/people1.png" 
                alt="Mathematics" 
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Mathematics</h3>
            <p className="text-gray-700 mb-4">
              Challenge your analytical thinking with our comprehensive mathematics 
              competition that tests problem-solving abilities and creativity.
            </p>
            <Link href="/tasks" className="text-orange-500 font-semibold hover:underline flex items-center">
              View sample tasks
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
              <Image 
                src="/image/people3.png" 
                alt="Art" 
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Art</h3>
            <p className="text-gray-700 mb-4">
              Express your creativity and artistic vision through themed artwork that 
              showcases your unique perspective and technical skills.
            </p>
            <Link href="/gallery" className="text-orange-500 font-semibold hover:underline flex items-center">
              View gallery
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
              <Image 
                src="/image/people2.png" 
                alt="Global Finals" 
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Global Finals</h3>
            <p className="text-gray-700 mb-4">
              Compete on a global stage at our prestigious Global Finals in Prague, 
              connecting with talented peers from around the world and celebrating 
              academic and artistic excellence.
            </p>
            <Link href="/rules" className="text-orange-500 font-semibold hover:underline flex items-center">
              Learn more
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Join Movement Section - Updated content */}
      <section className="container mx-auto px-4 py-24 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Image 
              src="/image/go_tigers.png" 
              alt="GO Tigers" 
              width={371} 
              height={247}
              className="mx-auto"
            />
          </div>
          
          <div className="relative bg-pink-400 py-16 px-8 rounded-2xl overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="100" stroke="white" strokeWidth="1" strokeOpacity="0.3" fill="none"/>
                <circle cx="80" cy="80" r="150" stroke="white" strokeWidth="1" strokeOpacity="0.3" fill="none"/>
              </svg>
            </div>
            
            <div className="absolute bottom-0 right-0">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="150" cy="150" r="100" stroke="white" strokeWidth="1" strokeOpacity="0.3" fill="none"/>
                <circle cx="120" cy="120" r="150" stroke="white" strokeWidth="1" strokeOpacity="0.3" fill="none"/>
              </svg>
            </div>
            
            {/* Decorative arrow */}
            <div className="absolute bottom-10 left-16">
              <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 20C20 5 40 35 75 15" stroke="#FFC107" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            
            {/* Decorative lightbulb */}
            <div className="absolute bottom-10 right-16">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5C14.5 5 10 9.5 10 15C10 18.5 11.5 21.5 14 23.5V27C14 28.1 14.9 29 16 29H24C25.1 29 26 28.1 26 27V23.5C28.5 21.5 30 18.5 30 15C30 9.5 25.5 5 20 5Z" fill="white" fillOpacity="0.8"/>
                <path d="M16 32C16 33.1 17.3 34 19 34H21C22.7 34 24 33.1 24 32V31H16V32Z" fill="white" fillOpacity="0.8"/>
              </svg>
            </div>
            
            {/* Block content */}
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <h2 className="text-4xl font-bold text-white mb-6">Join the movement</h2>
              <p className="text-xl text-white mb-8">
                Challenge your mind. Express your vision. 
                And become part of a global community that celebrates your creativity — 
                and showcases your talent to the world.
              </p>
              
              <div className="flex bg-white rounded-full overflow-hidden max-w-lg mx-auto text-black">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="flex-grow py-3 px-6 focus:outline-none"
                />
                <button className="bg-orange-500 text-white py-3 px-8 font-semibold hover:bg-orange-600 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}