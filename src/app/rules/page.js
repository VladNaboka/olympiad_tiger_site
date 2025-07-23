import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

export default function Rules() {
  return (
    <div 
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{
        backgroundImage: 'url("/image/fonmain1.png")',
      }}
    >
      <Navbar />
      
      {/* Hero Section - Responsive adjustments */}
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
                Rules and Structure
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto px-2">
                The Tigers Olympiad is a two-stage international competition that combines academic excellence with creative expression
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
      
      {/* Main Content Section - Full width blocks */}
      <div className="px-0 md:px-2 pb-16">
        <div className="container mx-auto max-w-6xl">
          {/* Overview Box */}
          <div className="bg-[#DD8CBC] text-white p-6 md:p-8 mb-10 rounded-xl">
            <p className="text-base md:text-lg">
              The Tigers Olympiad is a two-stage international competition that combines 
              academic excellence with creative expression. The Olympiad is conducted entirely in 
              English, and students may choose to compete in one or both subject tracks — 
              Mathematics and/or Art. Participation in both is optional.
            </p>
          </div>
          
          {/* Stage 1 Section */}
          <div className="mb-10 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative p-6 md:p-8">
              <div className="absolute top-6 right-6">
                <div className="text-orange-600 text-5xl font-bold">01</div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">National Round</h2>
              <p className="mb-4 text-gray-700">
                Held offline across participating countries, the National Round takes place in two waves:
              </p>
              <p className="mb-1 text-gray-700"><strong>Wave 1:</strong> Early December</p>
              <p className="mb-4 text-gray-700"><strong>Wave 2:</strong> Early March</p>
              <p className="mb-6 text-gray-700">
                Each country hosts the Olympiad in approved schools or venues, coordinated by 
                official Country Representatives.
              </p>
              
              <h3 className="text-xl font-bold mb-4">Subject Formats:</h3>
              
              <h4 className="font-bold mb-2">📐 Mathematics - Offline, on paper</h4>
              <p className="mb-6 text-gray-700">
                Participants complete a 60-minute written test with up to 30 questions. 
                The exam is conducted in person, under supervision, using printed materials. 
                Students are grouped by age level, and the tasks are adapted accordingly.
              </p>
              
              <h4 className="font-bold mb-2">🎨 Art - Created offline, submitted online</h4>
              <p className="text-gray-700">
                Participants receive a theme and instructions in English and create their artwork 
                independently at home or school using traditional art materials. Once completed, 
                the work is scanned or photographed and submitted to the official Country 
                Representative by the deadline. These submitted artworks are reviewed for originality 
                and completeness, and qualifying works are selected to advance to the Global Finals.
              </p>
            </div>
          </div>
          
          {/* Stage 2 Section */}
          <div className="mb-10 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative p-6 md:p-8">
              <div className="absolute top-6 right-6">
                <div className="text-orange-600 text-5xl font-bold">02</div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Global Finals (Prague)</h2>
              <p className="mb-6 text-gray-700">
                Finalists from each country are invited to the Global Finals in Prague, 
                where they represent their nations and present their work on a global stage.
              </p>
              
              <h4 className="font-bold mb-2">📐 Mathematics - Offline, written exam</h4>
              <p className="mb-6 text-gray-700">
                Finalists take part in an advanced in-person test, solving challenging problems 
                under formal exam conditions. This stage emphasizes analytical thinking, creativity, 
                and precision.
              </p>
              
              <h4 className="font-bold mb-2">🎨 Art - International Exhibition & Jury Evaluation</h4>
              <p className="mb-2 text-gray-700">
                Finalists' artworks, created during the National Round, are presented in an official 
                exhibition during the Global Finals event. A panel of international experts, including 
                professional artists and educators, evaluates the works based on artistic expression, 
                technique, originality, and thematic interpretation.
              </p>
              <p className="text-gray-700">
                Top artworks are awarded at the closing ceremony.
              </p>
            </div>
          </div>
          
          {/* Subject Choice Section */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-orange-600 mb-6">Subject Choice</h2>
            <p className="mb-4 text-gray-700 text-lg">
              You can choose to participate in:
            </p>
            <ul className="text-gray-700 pl-5 mb-6 text-lg">
              <li className="mb-3">• 📐 <strong>Mathematics</strong></li>
              <li className="mb-3">• 🎨 <strong>Art</strong></li>
              <li className="mb-3">• <strong>Or both</strong> (if you wish to challenge yourself in both disciplines)</li>
            </ul>
            <p className="mt-4 text-gray-700 text-lg">
              The schedule is designed to ensure that students choosing both tracks can complete 
              each part without conflict.
            </p>
          </div>
          
          {/* Competition Format Section */}
          <div className="mb-10 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative p-6 md:p-8">
              <h2 className="text-3xl font-bold text-orange-600 mb-6">Competition Format</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">📐 Mathematics:</h3>
                <div className="bg-orange-50 p-4 rounded-lg mb-4">
                  <p className="font-semibold mb-2">National Round:</p>
                  <p className="text-gray-700">Offline, paper-based test with up to 30 questions in 60 minutes, held under exam conditions.</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Global Finals:</p>
                  <p className="text-gray-700">Advanced paper-based assessment conducted in person during the final event.</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">🎨 Art:</h3>
                <div className="bg-pink-50 p-4 rounded-lg mb-4">
                  <p className="font-semibold mb-2">National Round:</p>
                  <p className="text-gray-700">Participants create their artwork independently at home or school and submit it online to their Country Representative.</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Global Finals:</p>
                  <p className="text-gray-700">Finalist artworks are exhibited at the Global Finals in Prague, where they are evaluated by a panel of professional artists.</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Evaluation Criteria:</p>
                <p className="text-gray-700">All tasks and themes are in English. Judging focuses on creativity, originality, clarity, and problem-solving.</p>
              </div>
            </div>
          </div>
          
          {/* Language Policy Section */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-orange-600 mb-6">Language Policy</h2>
            <p className="text-gray-700 text-lg">
              The Tigers Olympiad is conducted entirely in English. All tasks, themes, instructions, 
              and official communication are provided only in English. Participants must be able to 
              read, understand, and complete their work in English.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}