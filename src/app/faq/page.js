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
    answer: "Any student aged 6–17 from anywhere in the world is welcome! Whether you're a creative soul with a passion for Art 🎨, a problem solver who loves Mathematics 🧠, or both — the Tigers Olympiad is your gateway to shine on an international stage."
  },
  {
    id: 2,
    question: "How can I register, and what are the deadlines?",
    answer: "Registration is handled exclusively through official Country Representatives. Visit the “Representatives” section on our website, find your country, and connect with your local coordinator. They’ll guide you through every step — from deadlines to payment and participation. <br /><br />Please note: registration is not available directly through the international website, and timelines may differ by country."
  },
  {
    id: 3,
    question: "What language is the Olympiad conducted in?",
    answer: "All aspects of the Olympiad — tests, themes, instructions, and communication — are conducted entirely in English. No translations or alternate versions are provided. This is your chance to use English in a real-world, inspiring context!"
  },
  {
    id: 4,
    question: "Is there a participation fee?",
    answer: "Yes. Each country sets its own participation fee based on local conditions and services. Please contact your Country Representative for exact pricing and payment instructions."
  },
  {
    id: 5,
    question: "What subjects can I compete in? Do I have to choose both?",
    answer: `You can choose to participate in: <br />📐 Mathematics <br />🎨 Art <br />...or both! <br /><br />The schedule is designed to ensure that students choosing both tracks can complete each part without conflict.`
  },
  {
    id: 6,
    question: "What does the competition format look like?",
    answer: `📐 Mathematics:<br />
• National Round: Offline, paper-based test with up to 30 questions in 60 minutes, held under exam conditions.<br />
• Global Final: Advanced paper-based assessment conducted in person during the final event.<br /><br />
🎨 Art:<br />
• National Round: Participants create their artwork independently at home or school and submit it online to their Country Representative.<br />
• Global Final: Finalist artworks are exhibited at the international finals in Prague, where they are evaluated by a panel of professional artists.<br /><br />
All tasks and themes are in English.<br />
Judging focuses on creativity, originality, clarity, and problem-solving.`
  },
  {
    id: 7,
    question: "Will I receive a certificate or award if I don’t win?",
    answer: `Absolutely!<br />
• All participants in the National Round receive a Certificate of Participation.<br />
• 🏆 All Global Finalists receive a Certificate of Achievement.<br /><br />
Top performers will win exciting prizes such as:<br />
o Tablets<br />
o Art kits<br />
o Summer camp experiences<br />
o And more!`
  },
  {
    id: 8,
    question: "How should I prepare?",
    answer: `For Mathematics: review your school curriculum, study the topics listed in our Syllabus section, and practice time management during timed tests.<br />
For Art: explore different creative styles, practice themed drawings, and work on expressing your unique vision.<br /><br />
And don’t forget — the entire Olympiad is in English, so practicing subject-specific vocabulary is a great idea!<br />
Above all — stay curious, stay inspired, and enjoy the journey!`
  },
  {
    id: 9,
    question: "When and how will I receive my results?",
    answer: `• National Round results are announced by your Country Representative and also published on our website.<br />
• Global Final results are revealed during the Awards Ceremony and shared on our website and official social media platforms.`
  },
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
          <p
            className="text-gray-800"
            dangerouslySetInnerHTML={{ __html: item.answer }}
          />

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
              No problem — we’re here for you!<br />
              Reach out through the Contacts page or your local representative.<br />
              We’ll be happy to help you take the next step toward your Tigers adventure.
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