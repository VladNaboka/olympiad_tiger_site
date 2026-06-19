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
  
  We are proud to partner with SIL Olympiad, which offers SiL Subject Tests—a rigorously designed, research-backed language assessment for Years 1-9, as well as STEM and English Tests. These assessments are developed by graduates from the University of Oxford's Department of Education and marked by a team of Oxford and Cambridge (Oxbridge) specialists. The tests are aligned with the British National Curriculum and designed to challenge students while identifying high achievers both nationally and internationally.
  
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
    content: `1. Olympiad Structure and Stages
The "ART" Olympiad is conducted in two stages:
• Stage 1 — Preliminary Round (Online format): remote submission and expert evaluation of portfolios/contest entries.
• Stage 2 — Final Round (In-person format): a week-long art camp hosted in [Specify country/location, if static, or write "the host country of the current season's Finals"] with the final announcement of the winners.

2. Preliminary (Online) Round Procedure
• Application Submission: Participants register on the official Olympiad website and upload their creative work via their personal account in accordance with the technical requirements (file formats, sizes, etc.).
• Expert Commission Evaluation: The Evaluation Commission (Jury) conducts a "blind" or multi-stage online review of the submitted entries based on approved criteria (creativity, technique, composition).
• Publication of Results: Based on the results of the Preliminary Round, a shortlist of Finalists who scored the highest points is formed. The list will be published on the website on [Date], and the selected participants will receive official invitations to the Finals.

3. Final Round (Art Camp) Procedure
• Format: The Olympiad Finals are held as an in-person, week-long art intensive (camp) in [Country].
• Camp Program: Throughout the week, Finalists complete final competition tasks, attend masterclasses from leading industry experts, and work on their final projects.
• Determining the Winners: Final projects are evaluated directly during the camp. The announcement of winners and runners-up, along with the official award ceremony, takes place on the final day of the art camp.`
  },
  {
    id: 6,
    title: "🎨 Olympiad Theme",
    content: `Theme for the Finals in South Africa
A Glimpse into Tomorrow (Window to the Future)
Unleash your imagination and present a visual forecast of the world 100 years from now—ranging from high-tech civilizations to new forms of harmony between humanity and nature.

Theme for the Finals in England
Reflections
Explore the world through the play of light, distortions in water and mirrors, or the otherwise hidden essence of familiar things through metaphorical imagery.

Theme for the Finals in Greece
Rhythms of the City
Capture the pulse and energy of a modern metropolis through the dynamics of movement, the contrast of neon lights, or the unique atmosphere of everyday urban life.`
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

📧 Email: info@tigersedu.com
📱 WhatsApp: +7 700 595 1000
📸 Instagram: @tigers.olympiad`
  }
];

// Mathematics regulations data for collapsible sections
const mathRegulations = [
  {
    id: 1,
    title: "📋 General Provisions",
    content: `This document outlines the rules and structure of the TIGERS International Mathematics Olympiad, aimed at developing students' intellectual potential, fostering interest in mathematics, and building an international academic community of young problem-solvers. 

The Olympiad is conducted within the global educational framework of Owlwin.`
  },
  {
    id: 2,
    title: "🏢 Organizer",
    content: `The Olympiad is organized by TIGERS, an independent educational initiative founded in 2025. The team has extensive experience in international academic and cultural cooperation and has previously collaborated with global partners on major educational projects.

TIGERS operates under the umbrella of Owlwin, a trusted international educational organization with more than 10 years of experience in organizing academic camps and Olympiads abroad.`
  },
  {
    id: 3,
    title: "🎯 Goals and Objectives",
    content: `• To identify and support mathematically gifted students
• To promote logical and critical thinking
• To foster interest in mathematics as a field of study
• To ensure academic integrity and global competition
• To provide a platform for knowledge sharing among international students`
  },
  {
    id: 4,
    title: "👥 Participants",
    content: `Students from Grades 5 to 12 are eligible to participate, divided into four age categories:

• Category I — Grades 5–6
• Category II — Grades 7–8
• Category III — Grades 9–10
• Category IV — Grades 11–12`
  },
  {
    id: 5,
    title: "🏆 Format and Stages",
    content: `The Olympiad consists of two offline stages:

5.1 Preliminary Round:
• 📅 Dates: December 15–25, 2025
• 📍 Locations in Kazakhstan: Astana, Almaty, Shymkent, and Aktau
• 🕒 Exact time and venue details will be provided after registration closes

5.2 Final Round:
• 📅 Summer 2026
• 📍 Final location will be shared individually with students who qualify through the preliminary round`
  },
  {
    id: 6,
    title: "📝 Test Format",
    content: `• Categories I and II: 20 questions
• Categories III and IV: 30 questions
• All test materials and instructions are provided exclusively in English
• The Olympiad is conducted only in English, with no translation options
• Participants will use OMR (Optical Mark Recognition) answer sheets`
  },
  {
    id: 7,
    title: "📚 Topics and Preparation",
    content: `• The list of topics and syllabus for each category will be published on our official website in September 2025: www.tigersedu.com
• Past papers are not publicly available due to copyright regulations and academic integrity standards`
  },
  {
    id: 8,
    title: "📝 Registration",
    content: `Registration is carried out through official TIGERS managers and includes:
• Submitting a registration form
• Completing the payment
• Receiving a receipt, which serves as confirmation of participation

☝️ Parental consent is considered granted upon registration and payment for participants under 18.`
  },
  {
    id: 9,
    title: "💰 Participation Fee",
    content: `💬 Details regarding participation fees for each stage of the Olympiad may be obtained directly from the regional manager of your country or city.`
  },
  {
    id: 10,
    title: "⭐ Evaluation",
    content: `• All answer sheets are evaluated by an independent jury, whose members remain anonymous to ensure impartiality
• Scoring is based on the number of correct answers and time taken
• Official results will be published on the Olympiad website`
  },
  {
    id: 11,
    title: "🏅 Awards",
    content: `Finalists will receive the following prizes:

🥇 1st Place – Two-week international educational camp (USA or UK)
🥈 2nd Place – Two-week international educational camp (Europe or Asia)
🥉 3rd Place – Apple iPad

🎖 All participants will receive an official certificate of participation.`
  },
  {
    id: 12,
    title: "📄 Materials and Publication",
    content: `• Test papers can be provided to participants upon individual request
• OMR answer sheets will not be published online
• Photos, videos, and participant feedback may be published on official TIGERS platforms (website and social media)`
  },
  {
    id: 13,
    title: "📞 Contact Information",
    content: `For all inquiries, contact:

📧 Email: info@tigersedu.com
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
                Regulations
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

          {/* Mathematics Regulations - Collapsible */}
          {activeTab === 'math' && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-orange-600 mb-4">📐 Mathematics Competition Regulations</h3>
                <p className="text-lg text-gray-600">
                  Detailed regulations for the International Tigers Mathematics Olympiad
                </p>
              </div>
              
              <div>
                {mathRegulations.map((regulation) => (
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
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
