import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

export default function Regulations() {
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
                International Art Olympiad TIGERS
              </h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto px-2">
                Official regulations governing the organization and conduct of the TIGERS Art Olympiad
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
      
      {/* Main Content Section */}
      <div className="px-0 md:px-2 pb-16">
        <div className="container mx-auto max-w-6xl">
          
          {/* Section 1: General Provisions */}
          <div className="mb-10 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative p-6 md:p-8">
              <div className="absolute top-6 right-6">
                <div className="text-orange-600 text-5xl font-bold">01</div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 text-gray-800">General Provisions</h2>
              <p className="mb-4 text-gray-700">
                These Regulations govern the organization and conduct of the international art Olympiad TIGERS, 
                aimed at developing the creative potential of children and teenagers, expanding their cultural 
                horizons, and forming an international art community.
              </p>
              <p className="text-gray-700">
                The Olympiad is conducted as part of a global educational project by the Tigers company.
              </p>
            </div>
          </div>

          {/* Section 2: Organizer */}
          <div className="mb-10 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative p-6 md:p-8">
              <div className="absolute top-6 right-6">
                <div className="text-orange-600 text-5xl font-bold">02</div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Organizer</h2>
              <p className="mb-4 text-gray-700">
                The Olympiad is organized by TIGERS, an independent educational initiative launched in 2025. 
                Our team has extensive experience in international collaboration and previously worked with 
                global partners on educational and cultural projects.
              </p>
              <p className="mb-4 text-gray-700">
                TIGERS operates under the umbrella of Owlwin, a trusted international educational company 
                with over 10 years of experience in organizing academic camps and Olympiads abroad.
              </p>
              <p className="text-gray-700">
                Together, we aim to create inspiring opportunities for young talents around the world.
              </p>
            </div>
          </div>

          {/* Section 3: Goals and Objectives */}
          <div className="mb-10 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative p-6 md:p-8">
              <div className="absolute top-6 right-6">
                <div className="text-orange-600 text-5xl font-bold">03</div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Goals and Objectives</h2>
              <ul className="text-gray-700 space-y-2">
                <li>• Identify and support gifted children in the field of visual arts</li>
                <li>• Develop creative thinking and self-expression</li>
                <li>• Form an international art space</li>
                <li>• Strengthen cultural ties between schoolchildren from different countries</li>
                <li>• Increase interest in art, visual thinking, and contemporary themes</li>
              </ul>
            </div>
          </div>

          {/* Section 4: Participants */}
          <div className="mb-10 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative p-6 md:p-8">
              <div className="absolute top-6 right-6">
                <div className="text-orange-600 text-5xl font-bold">04</div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Participants</h2>
              <p className="mb-4 text-gray-700">
                Schoolchildren aged 6 to 17 years are invited to participate.
              </p>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Age categories:</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• <strong>Category I</strong> — 6–9 years</li>
                <li>• <strong>Category II</strong> — 10–13 years</li>
                <li>• <strong>Category III</strong> — 14–17 years</li>
              </ul>
              <p className="text-gray-700">
                Participation is possible individually or through schools, studios, and clubs.
              </p>
            </div>
          </div>

          {/* Section 5: Olympiad Stages */}
          <div className="mb-10 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative p-6 md:p-8">
              <div className="absolute top-6 right-6">
                <div className="text-orange-600 text-5xl font-bold">05</div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Olympiad Stages</h2>
              <p className="mb-6 text-gray-700">The Olympiad takes place in two stages:</p>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-3 text-blue-800">5.1. Preliminary Round (remote)</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• <strong>Format:</strong> online</li>
                  <li>• <strong>Deadline:</strong> by October 1, 2025</li>
                  <li>• Participants create an artwork on the theme "NeoWorld – The World of the Future"</li>
                  <li>• Works are submitted digitally via Tigers representative</li>
                  <li>• All participants receive certificates of participation</li>
                  <li>• Winners and prizewinners are invited to the finals</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-green-800">5.2. Final Round (in-person)</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• <strong>Location:</strong> Prague, Czech Republic</li>
                  <li>• <strong>Dates:</strong> December 8–12, 2025</li>
                  <li>• Includes international exhibition and cultural program</li>
                  <li>• Finalists' works are evaluated by an international jury</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 6: Olympiad Theme */}
          <div className="mb-10 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative p-6 md:p-8">
              <div className="absolute top-6 right-6">
                <div className="text-orange-600 text-5xl font-bold">06</div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Olympiad Theme</h2>
              <div className="bg-purple-50 p-6 rounded-lg mb-4">
                <h3 className="text-xl font-bold mb-3 text-purple-800">Competition theme: "NeoWorld – The World of the Future"</h3>
              </div>
              
              <p className="mb-4 text-gray-700">
                Participants are invited to artistically express their vision of the future:
              </p>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• How will the world change?</li>
                <li>• What new cities, technologies, nature, or culture will emerge?</li>
                <li>• What will be the core values of future humanity?</li>
              </ul>
              <p className="mb-4 text-gray-700">
                Any genre is welcome: utopia, dystopia, dreams, ecology, digital reality, etc.
              </p>
              <p className="text-gray-700 font-semibold">
                All types of techniques are accepted.
              </p>
            </div>
          </div>

          {/* Section 7: Registration */}
          <div className="mb-10 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative p-6 md:p-8">
              <div className="absolute top-6 right-6">
                <div className="text-orange-600 text-5xl font-bold">07</div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Registration</h2>
              <p className="mb-4 text-gray-700">
                Registration is carried out through official Tigers representatives. To participate, you must:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Submit an application</li>
                <li>• Pay the registration fee</li>
                <li>• Submit your contest entry by the specified deadline</li>
              </ul>
            </div>
          </div>

          {/* Section 8: Evaluation Criteria */}
          <div className="mb-10 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative p-6 md:p-8">
              <div className="absolute top-6 right-6">
                <div className="text-orange-600 text-5xl font-bold">08</div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Evaluation Criteria</h2>
              <p className="mb-4 text-gray-700">Works are evaluated by the following criteria:</p>
              <ul className="text-gray-700 space-y-2">
                <li>• Relevance to the theme</li>
                <li>• Originality of idea</li>
                <li>• Artistic execution</li>
                <li>• Composition</li>
                <li>• Expressiveness and depth</li>
                <li>• Technical proficiency</li>
              </ul>
            </div>
          </div>

          {/* Section 9: Awards */}
          <div className="mb-10 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative p-6 md:p-8">
              <div className="absolute top-6 right-6">
                <div className="text-orange-600 text-5xl font-bold">09</div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Awards</h2>
              <p className="mb-4 text-gray-700">Based on the final results, winners and prizewinners receive:</p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <h3 className="font-bold text-yellow-800 mb-2">1st place</h3>
                  <p className="text-gray-700">Trip to a summer camp in Greece (summer 2026)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-4xl mb-2">🥈</div>
                  <h3 className="font-bold text-gray-800 mb-2">2nd place</h3>
                  <p className="text-gray-700">Graphic tablet</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-4xl mb-2">🥉</div>
                  <h3 className="font-bold text-orange-800 mb-2">3rd place</h3>
                  <p className="text-gray-700">Professional art set</p>
                </div>
              </div>
              
              <p className="text-gray-700">
                All finalists receive international certificates and invitations to future Tigers exhibitions.
              </p>
            </div>
          </div>

          {/* Additional Sections in Grid Format */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Section 10: Copyright */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">10. Copyright</h2>
              <p className="mb-3 text-gray-700">Participants retain copyright to their works.</p>
              <p className="mb-3 text-gray-700">
                Simultaneously, by submitting a work, the participant (or legal representative) grants the organizers the right to:
              </p>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Publish the work on the website and social networks</li>
                <li>• Use the image in promotional and informational materials</li>
                <li>• Exhibit the work at exhibitions and presentations related to the TIGERS project</li>
              </ul>
            </div>

            {/* Section 11: Jury */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">11. Jury</h2>
              <p className="mb-3 text-gray-700">Works are evaluated by an international jury composed of:</p>
              <ul className="text-gray-700 space-y-1 mb-3">
                <li>• Professional artists</li>
                <li>• Art university professors</li>
                <li>• Exhibition and project curators</li>
              </ul>
              <p className="text-gray-700 text-sm">
                The jury is formed by the organizer. Jury decisions are final and not subject to revision.
              </p>
            </div>
          </div>

          {/* Section 12: Appeals */}
          <div className="mb-10 bg-red-50 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 text-red-800">12. Appeals</h2>
            <p className="text-gray-700">
              The decisions of the jury are final and cannot be contested. 
              No appeals will be accepted regarding the evaluation, selection of winners, or the outcome of the competition.
            </p>
          </div>

          {/* Section 13: Contacts */}
          <div className="bg-orange-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-6">13. Contacts</h2>
            <p className="text-xl mb-6">For all inquiries, contact:</p>
            <div className="grid md:grid-cols-3 gap-4 text-lg">
              <div>
                <div className="text-2xl mb-2">📧</div>
                <p>yuliya@tigersedu.com</p>
              </div>
              <div>
                <div className="text-2xl mb-2">📱</div>
                <p>WhatsApp: +7 700 595 1000</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🌐</div>
                <p>Instagram: @tigers.olympiad</p>
              </div>
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