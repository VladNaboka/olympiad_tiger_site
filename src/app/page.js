'use client';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Image from 'next/image';
import Link from 'next/link'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import logo from '../../public/image/logo.png';

export default function Home() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSendClick = () => {
    if (!email.trim()) {
      alert('Please enter your email address.');
      return;
    }
    router.push(`/contacts?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffbf2]">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute z-0 w-full h-full max-w-6xl mx-auto left-0 right-0">
          <Image
            src="/image/fonmain1.png"
            alt="Background with school elements"
            fill
            className="object-contain opacity-30"
          />
        </div>

        <div className="container mx-auto px-4 py-8 md:py-24 flex flex-col lg:flex-row items-center relative z-10">
          <div className="lg:w-1/2 mb-4 lg:mb-0">
            <h1 className="text-5xl font-bold mb-6 text-black">
              International <span className="text-orange-500">Tigers</span>
              <br />
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

      {/* Orange info block */}
      <div className="px-4 pb-8">
        <div className="container mx-auto max-w-6xl bg-orange-600 text-white py-12 px-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Welcome to the International Tigers Olympiad
          </h2>
          <p className="text-2xl text-center">
            A prestigious global event where the brightest young minds meet
            challenge, creativity, and innovation. Open to students aged 6 to
            17 from all countries, the Olympiad offers a unique opportunity to
            shine in Mathematics and Art — two disciplines that together
            reflect the full spectrum of human intelligence and expression.
          </p>
        </div>
      </div>

      {/* Empowerment Section */}
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
              At Tigers every student
              <br />
              <span className="text-orange-500">chooses their own path</span>
            </h2>
            <ul className="text-lg text-gray-700 mb-8 list-disc pl-6">
              <li>Compete in Mathematics</li>
              <li>Compete in Art</li>
              <li>Or embrace both!</li>
            </ul>
            <p className="text-lg text-gray-700 mb-8">
              Participation in either or both categories is entirely optional —
              and warmly encouraged. This flexible format lets students build
              on their strengths, try something new, and experience the
              Olympiad in a way that's truly their own.
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

      {/* Global Stage Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-4 text-black">
              But Tigers is more than
              <br />
              just a competition —
              <br />
              <span className="text-orange-500">it's a global stage</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              for discovery and connection. Held entirely in English, the
              Olympiad brings together ambitious students from every corner of
              the world — to think, create, and grow together.
            </p>
            <Link
              href="/register"
              className="inline-block bg-amber-400 text-white py-3 px-12 rounded-full text-lg font-semibold hover:bg-amber-500 transition-colors"
            >
              Join the Movement
            </Link>
          </div>

          <div className="lg:w-1/2">
            <div className="relative h-10 md:h-64 lg:h-80 w-full rounded-lg overflow-hidden">
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

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature cards here... */}
        </div>
      </section>

      {/* Join Movement Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <Image
              src="/image/go_tigers.png"
              alt="GO Tigers"
              width={371}
              height={247}
              className="mx-auto"
            />
          </div>

          <div className="relative bg-pink-400 py-16 px-8 rounded-2xl overflow-hidden">
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <h2 className="text-4xl font-bold text-white mb-6">
                Join the movement
              </h2>
              <p className="text-xl text-white mb-8">
                Challenge your mind. Express your vision. And become part of a
                global community that celebrates your creativity — and showcases
                your talent to the world.
              </p>

              <div className="flex bg-white rounded-full overflow-hidden max-w-lg mx-auto text-black shadow-lg">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow py-3 md:py-4 px-5 md:px-6 focus:outline-none text-gray-800 placeholder-gray-500 text-base md:text-lg"
                />
                <button
                  onClick={handleSendClick}
                  className="bg-orange-500 text-white py-3 md:py-4 pl-5 pr-9 md:pl-8 md:pr-8 font-semibold hover:bg-orange-600 transition-colors text-base md:text-lg flex items-center justify-center"
                >
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
