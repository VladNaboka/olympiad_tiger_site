'use client';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

// FAQ данные
const faqItems = [
  {
    id: 1,
    question: "Who can participate in the Tigers Olympiad?",
    answer: "The Tigers Olympiad is open to school students worldwide in grades 5-12. Students from any country may participate. Whether you are passionate about Mathematics, Drawing, or both, this Olympiad provides a platform to showcase your talents on an international level."
  },
  {
    id: 2,
    question: "How do I register and what is the deadline?",
    answer: "Registration is handled only through official national representatives in each participating country. To register, visit the Representatives section of our website and contact the representative in your country. They will provide you with all registration instructions, deadlines, and participation details. Please note: Registration is not available through the international website, and deadlines may vary by country."
  },
  {
    id: 3,
    question: "In what language is the Olympiad conducted?",
    answer: "The Olympiad is conducted entirely in English. All test materials, instructions, drawing themes, and communications are provided only in English. Participants are expected to complete all tasks in English. No other language versions are available."
  },
  {
    id: 4,
    question: "How do I register and what is the deadline?",
    answer: "Registration is handled only through official national representatives in each participating country. To register, visit the Representatives section of our website and contact the representative in your country. They will provide you with all registration instructions, deadlines, and participation details. Please note: Registration is not available through the international website, and deadlines may vary by country."
  },
  {
    id: 5,
    question: "Is there a participation fee?",
    answer: "Participation is paid. The exact fee is determined by the national representative in each country and may vary depending on local conditions and services. Please contact your country's representative for detailed information about registration fees and payment methods."
  },
  {
    id: 6,
    question: "What subjects can I compete in? Do I have to choose both?",
    answer: "You can choose to participate in one or both subject tracks: Mathematics or Drawing. Participation in both is optional. The schedule is arranged so that students who choose both can fully complete each part without overlap."
  },
  {
    id: 7,
    question: "What is the format of the competition?",
    answer: "Mathematics: National Round - Offline, on paper — 30 questions in 60 minutes, held under exam conditions at a local venue. Final Round: Offline, in the USA — advanced paper-based test during the final event. Drawing: National Round - Participants create their artwork independently at home or school and submit it online to their country's representative. Final Round: The same artworks are presented at an international exhibition during the final in the USA and are evaluated by a jury of artists and professionals. All tasks and themes are provided in English. Evaluation is based on creativity, problem-solving, originality, and clarity."
  },
  {
    id: 8,
    question: "Will I receive a certificate or award even if I don't win?",
    answer: "Yes. At the National Round, all participants receive a Certificate of Participation. Top performers are awarded Gold (top 10%), Silver (next 15%), and Bronze (next 20%) Certificates. At the Final Round, all finalists receive a Certificate of Achievement. The best performers receive international prizes — including university scholarships (Grades 10-12) and valuable prizes or global educational camp scholarships (Grades 5-9), as well as medals and international recognition."
  },
  {
    id: 9,
    question: "How should I prepare for the Olympiad?",
    answer: "For Mathematics: review your school curriculum, solve sample Olympiad questions, and practice time management for 60-minute tests. For Drawing: practice creating original artworks based on themes, develop your technique, and explore creative composition. Make sure you are comfortable working in English, especially with subject-specific vocabulary and instructions. Most importantly — stay inspired, curious, and enjoy the process!"
  },
  {
    id: 10,
    question: "How and when will I get the results?",
    answer: "Results of the National Round are announced by your country's representative. Final Round results and international winners are announced during the Awards Ceremony in the USA and published on our website and social media channels. Winners and their schools receive direct communication from the organizing team."
  }
];

// Компонент для одного FAQ вопроса с анимацией
const FaqItem = ({ item, isOpen, toggleQuestion }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  
  useEffect(() => {
    if (isOpen) {
      const contentEl = contentRef.current;
      setHeight(contentEl.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);
  
  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden mb-4">
      <button
        className="w-full p-6 text-left flex items-center justify-between focus:outline-none"
        onClick={toggleQuestion}
      >
        <h3 className="text-lg font-bold text-orange-700">{item.question}</h3>
        <span className={`text-orange-700 text-2xl transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      
      <div 
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={contentRef} className="px-6 pb-6">
          <p className="text-gray-800">{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default function FAQ() {
  // Состояние для открытых/закрытых вопросов
  const [openQuestionId, setOpenQuestionId] = useState(1);
  
  return (
    <div 
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{
        backgroundImage: 'url("/image/fonmain1.png")', 
      }}
    >
      <Navbar />
      
      {/* Hero Section - центрированный дизайн */}
      <div className="py-24 px-4 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left - Title and Description */}
            <div className="md:w-1/2 pr-8">
              <h1 className="text-5xl font-bold text-orange-700 mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600">
                Find answers to common questions about the International Tigers Olympiad
              </p>
            </div>
            
            {/* Right - Logo "WE ARE TIGERS" */}
            <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
              <div className="relative w-80 h-80">
                <div className="absolute w-full h-full rounded-full bg-yellow-100/60 z-0"></div>
                <div className="relative z-10 p-4">
                  <img
                    src="/image/wearetigers.png"
                    alt="Tigers Olympiad Logo"
                    width="400"
                    height="500"
                    style={{ width: "400px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Accordion */}
      <div className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div>
            {faqItems.map((item) => (
              <FaqItem 
                key={item.id}
                item={item}
                isOpen={openQuestionId === item.id}
                toggleQuestion={() => setOpenQuestionId(openQuestionId === item.id ? null : item.id)}
              />
            ))}
          </div>
          
          {/* Still have questions */}
          <div className="mt-16 bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-orange-700 mb-4">Still have questions?</h2>
            <p className="mb-6">
              Have more questions? Feel free to reach out to us via the Contacts provided. 
              We're happy to clarify any doubts.
              <br />Good luck, and we look forward to your participation!
            </p>
            <Link 
              href="/contacts" 
              className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Contact Us
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