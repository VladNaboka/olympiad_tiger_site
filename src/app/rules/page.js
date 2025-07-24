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
                Regulations
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
            <div className="grid md:grid-cols-3 gap-6 text-lg">
              
              {/* Email */}
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-full mb-3 shadow-lg">
                  <svg className="h-8 w-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <p className="font-semibold">Email</p>
                <a href="mailto:yuliya@tigersedu.com" className="hover:text-yellow-200 transition-colors">
                  yuliya@tigersedu.com
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col items-center">
                <div className="bg-green-500 p-4 rounded-full mb-3 shadow-lg">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                  </svg>
                </div>
                <p className="font-semibold">WhatsApp</p>
                <a href="https://wa.me/77005951000" className="hover:text-yellow-200 transition-colors">
                  +7 700 595 1000
                </a>
              </div>

              {/* Instagram */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-4 rounded-full mb-3 shadow-lg">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="font-semibold">Instagram</p>
                <a href="https://instagram.com/tigers.olympiad" className="hover:text-yellow-200 transition-colors">
                  @tigers.olympiad
                </a>
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