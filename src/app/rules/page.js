'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

// Art regulations data for collapsible sections
const artRegulations = [
  {
    id: 1,
    title: "📋 General Provisions",
    content: `These Regulations govern the organization and conduct of the international art Olympiad TIGERS, aimed at developing the creative potential of children and teenagers, expanding their cultural horizons, and forming an international art community.

The Olympiad is conducted as part of a global educational project by the Tigers company.`
  },
  {
    id: 2,
    title: "🏢 Organizer",
    content: `The Olympiad is organized by TIGERS, an independent educational initiative launched in 2025. Our team has extensive experience in international collaboration and previously worked with global partners on educational and cultural projects.

TIGERS operates under the umbrella of Owlwin, a trusted international educational company with over 10 years of experience in organizing academic camps and Olympiads abroad.

Together, we aim to create inspiring opportunities for young talents around the world.`
  },
  {
    id: 3,
    title: "🎯 Goals and Objectives",
    content: `• Identify and support gifted children in the field of visual arts
• Develop creative thinking and self-expression
• Form an international art space
• Strengthen cultural ties between schoolchildren from different countries
• Increase interest in art, visual thinking, and contemporary themes`
  },
  {
    id: 4,
    title: "👥 Participants",
    content: `Schoolchildren aged 6 to 17 years are invited to participate.

Age categories:
• Category I — 6–9 years
• Category II — 10–13 years
• Category III — 14–17 years

Participation is possible individually or through schools, studios, and clubs.`
  },
  {
    id: 5,
    title: "🏆 Olympiad Stages",
    content: `The Olympiad takes place in two stages:

5.1. Preliminary Round (remote)
• Format: online
• Deadline: by October 1, 2025
• Participants create an artwork on the theme "NeoWorld – The World of the Future"
• Works are submitted digitally via Tigers representative
• All participants receive certificates of participation
• Winners and prizewinners are invited to the finals

5.2. Final Round (in-person)
• Location: Prague, Czech Republic
• Dates: December 8–12, 2025
• Includes international exhibition and cultural program
• Finalists' works are evaluated by an international jury`
  },
  {
    id: 6,
    title: "🎨 Olympiad Theme",
    content: `Competition theme: "NeoWorld – The World of the Future"

Participants are invited to artistically express their vision of the future:
• How will the world change?
• What new cities, technologies, nature, or culture will emerge?
• What will be the core values of future humanity?

Any genre is welcome: utopia, dystopia, dreams, ecology, digital reality, etc.
All types of techniques are accepted.`
  },
  {
    id: 7,
    title: "📝 Registration",
    content: `Registration is carried out through official Tigers representatives. To participate, you must:
• Submit an application
• Pay the registration fee
• Submit your contest entry by the specified deadline`
  },
  {
    id: 8,
    title: "⭐ Evaluation Criteria",
    content: `Works are evaluated by the following criteria:
• Relevance to the theme
• Originality of idea
• Artistic execution
• Composition
• Expressiveness and depth
• Technical proficiency`
  },
  {
    id: 9,
    title: "🏅 Awards",
    content: `Based on the final results, winners and prizewinners receive:

🏆 1st place: Trip to a summer camp in Greece (summer 2026)
🥈 2nd place: Graphic tablet
🥉 3rd place: Professional art set

All finalists receive international certificates and invitations to future Tigers exhibitions.`
  },
  {
    id: 10,
    title: "©️ Copyright",
    content: `Participants retain copyright to their works.

Simultaneously, by submitting a work, the participant (or legal representative) grants the organizers the right to:
• Publish the work on the website and social networks
• Use the image in promotional and informational materials
• Exhibit the work at exhibitions and presentations related to the TIGERS project`
  },
  {
    id: 11,
    title: "👨‍⚖️ Jury",
    content: `Works are evaluated by an international jury composed of:
• Professional artists
• Art university professors
• Exhibition and project curators

The jury is formed by the organizer. Jury decisions are final and not subject to revision.`
  },
  {
    id: 12,
    title: "⚠️ Appeals",
    content: `The decisions of the jury are final and cannot be contested. No appeals will be accepted regarding the evaluation, selection of winners, or the outcome of the competition.`
  },
  {
    id: 13,
    title: "📞 Contacts",
    content: `For all inquiries, contact:

📧 Email: yuliya@tigersedu.com
📱 WhatsApp: +7 700 595 1000
📸 Instagram: @tigers.olympiad`
  }
];

// Component for one regulation section with animation
const RegulationItem = ({ item, isOpen, toggleSection }) => {
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
        className="w-full p-6 text-left flex items-center justify-between focus:outline-none hover:bg-gray-50 transition-colors"
        onClick={toggleSection}
      >
        <h3 className="text-lg font-bold text-orange-700">{item.title}</h3>
        <span className={`text-orange-700 text-2xl transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      
      <div 
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={contentRef} className="px-6 pb-6">
          <div className="text-gray-800 whitespace-pre-line">{item.content}</div>
        </div>
      </div>
    </div>
  );
};

export default function Regulations() {
  const [openSectionId, setOpenSectionId] = useState(1);
  const [activeTab, setActiveTab] = useState('art');

  return (
    <div 
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{
        backgroundImage: 'url("/image/fonmain1.png")',
      }}
    >
      <Navbar />
      
      {/* Hero Section */}
      <div className="py-10 md:py-16 px-2 relative">
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left - Torch Logo */}
            <div className="md:w-1/4 flex justify-center md:justify-start">
              <img 
                src="/image/rulesfakel.png" 
                alt="Tigers Olympiad Torch Logo" 
                className="w-48 md:w-64 lg:w-72"
              />
            </div>
            
            {/* Center - Title and Description */}
            <div className="md:w-2/4 text-center my-6 md:my-0">
              <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4 md:mb-6">
                Regulations and Structure
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
                International Tigers Olympiad
              </h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto px-2">
                Official regulations governing the organization and conduct of the Tigers Olympiad
              </p>
            </div>
            
            {/* Right - Tiger Mascot */}
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <img 
                src="/image/rules1.png" 
                alt="Tigers Olympiad Mascot" 
                className="w-48 md:w-64 lg:w-80"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Subject Selection Tabs */}
      <div className="px-4 mb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('art')}
                  className={`py-4 px-6 text-lg font-medium border-b-2 flex-1 text-center transition-colors ${
                    activeTab === 'art'
                      ? 'border-orange-500 text-orange-600 bg-orange-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  🎨 Art Regulations
                </button>
                <button
                  onClick={() => setActiveTab('math')}
                  className={`py-4 px-6 text-lg font-medium border-b-2 flex-1 text-center transition-colors ${
                    activeTab === 'math'
                      ? 'border-orange-500 text-orange-600 bg-orange-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  📐 Mathematics Regulations
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          
          {/* Art Regulations - Collapsible */}
          {activeTab === 'art' && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-orange-600 mb-4">🎨 Art Competition Regulations</h3>
                <p className="text-lg text-gray-600">
                  Detailed regulations for the International Tigers Art Olympiad
                </p>
              </div>
              
              <div>
                {artRegulations.map((regulation) => (
                  <RegulationItem 
                    key={regulation.id}
                    item={regulation}
                    isOpen={openSectionId === regulation.id}
                    toggleSection={() => setOpenSectionId(openSectionId === regulation.id ? null : regulation.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Mathematics Regulations - Coming Soon */}
          {activeTab === 'math' && (
            <div className="text-center py-16">
              <div className="bg-white rounded-lg shadow-sm p-12">
                <div className="text-6xl mb-6">📐</div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Mathematics Regulations</h3>
                <p className="text-xl text-gray-600 mb-8">
                  Mathematics competition regulations are currently being finalized.
                </p>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <p className="text-orange-800 font-medium">
                    📅 Mathematics regulations will be published soon. Stay tuned for updates!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}