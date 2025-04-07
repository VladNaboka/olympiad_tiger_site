import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/image/logo.png';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-black text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <Image 
            src={logo} 
            alt="Tigers Logo" 
            width={180} 
            height={180} 
            className="mx-auto mb-6"
          />
          <h1 className="text-5xl font-bold text-orange-400 mb-6">
            International Tigers Olympiad
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Where the world's brightest young minds meet innovation, creativity, and challenge.
          </p>
          <Link 
            href="/register" 
            className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-pink-500 transition-colors"
          >
            Register now
          </Link>
        </div>
      </div>
      
      {/* About Section */}
      <section className="py-16 px-4 bg-white text-black">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-orange-500">Welcome to the International Tigers Olympiad</h2>
            <p className="text-lg mb-6">
              This elite academic competition is open to students in grades 5-12 from all countries and offers 
              a unique opportunity to showcase excellence in Mathematics and/or Drawing — two disciplines that 
              reflect the full spectrum of human intellect.
            </p>
            <p className="text-lg mb-6">
              At Tigers, students are empowered to choose their path: whether to compete in Mathematics, Drawing, 
              or both. Participation in one or both subject tracks is entirely optional — and fully encouraged. 
              This flexible format allows students to pursue their strengths, explore new skills, and experience 
              the Olympiad on their own terms.
            </p>
            <p className="text-lg mb-6">
              But Tigers is more than a competition — it's a global stage. Conducted exclusively in English, 
              the Olympiad brings together ambitious students from across the globe to think, create, and connect. 
              It culminates in an unforgettable final round in the United States, where national winners meet for 
              an inspiring celebration of talent, culture, and achievement.
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-orange-500">Mathematics</h3>
              <p className="mb-4">
                Challenge your analytical thinking with our comprehensive mathematics competition 
                that tests problem-solving abilities and creativity.
              </p>
              <Link href="/tasks" className="text-pink-500 font-semibold hover:underline">
                View sample tasks →
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-orange-500">Drawing</h3>
              <p className="mb-4">
                Express your creativity and artistic vision through themed artwork that showcases 
                your unique perspective and technical skills.
              </p>
              <Link href="/gallery" className="text-pink-500 font-semibold hover:underline">
                View gallery →
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-orange-500">International Final</h3>
              <p className="mb-4">
                Compete on a global stage at our prestigious final round in the United States, 
                connecting with talented peers from around the world.
              </p>
              <Link href="/rules" className="text-pink-500 font-semibold hover:underline">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-4 bg-black text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold mb-6 text-orange-400">Join the movement</h2>
          <p className="text-xl mb-8">
            Challenge your mind. Express your vision. And become part of an international 
            community that dares to think differently.
          </p>
          <Link 
            href="/register" 
            className="inline-block bg-pink-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-orange-500 transition-colors"
          >
            Register
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}