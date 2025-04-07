import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

export default function Rules() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-orange-500 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold">Rules and Structure</h1>
          <p className="mt-4 text-xl max-w-3xl mx-auto">
            The Tigers Olympiad is a two-stage international competition 
            that combines academic excellence with creative expression.
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="mb-6">
            The Tigers Olympiad is a two-stage international competition that combines academic excellence 
            with creative expression. The Olympiad is conducted entirely in English, and students may 
            choose to compete in one or both subject tracks — Mathematics and/or Drawing. Participation 
            in both is optional.
          </p>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Stage 1: National Round</h2>
            <p className="mb-4">
              Held offline across participating countries, the National Round takes place in two waves:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Wave 1: Early December</li>
              <li className="mb-2">Wave 2: Early March</li>
            </ul>
            <p className="mb-4">
              Each country hosts the Olympiad in approved schools or venues, coordinated by 
              official national representatives.
            </p>
            
            <h3 className="text-xl font-semibold text-orange-500 mb-3">Subject Formats:</h3>
            
            <div className="bg-orange-50 p-6 rounded-lg mb-6">
              <h4 className="font-bold mb-2">Mathematics — Offline, on paper</h4>
              <p>
                Participants complete a 60-minute written test consisting of 30 questions. 
                The exam is conducted in person, under supervision, using printed materials. 
                Students are grouped by grade level, and the tasks are adapted accordingly.
              </p>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-bold mb-2">Drawing — Created offline, submitted online</h4>
              <p>
                Participants receive a theme and instructions in English and create their artwork 
                independently at home or school using traditional art materials. Once completed, 
                the work is scanned or photographed and submitted to the official country 
                representative by the deadline. These submitted artworks are reviewed for originality 
                and completeness, and qualifying works are selected to advance to the final round.
              </p>
            </div>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Stage 2: Final Round (USA)</h2>
            <p className="mb-4">
              Finalists from each country are invited to the International Final in the United States, 
              where they represent their nations and present their work on a global stage.
            </p>
            
            <div className="bg-orange-50 p-6 rounded-lg mb-6">
              <h4 className="font-bold mb-2">Mathematics — Offline, written exam</h4>
              <p>
                Finalists take part in an advanced in-person test, solving challenging problems 
                under formal exam conditions. This stage emphasizes analytical thinking, creativity, 
                and precision.
              </p>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-bold mb-2">Drawing — International Exhibition & Jury Evaluation</h4>
              <p>
                Finalists' artworks, created during the National Round, are presented in an official 
                exhibition during the final event. A panel of international experts, including 
                professional artists and educators, evaluates the works based on artistic expression, 
                technique, originality, and thematic interpretation. Top artworks are awarded 
                at the closing ceremony.
              </p>
            </div>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Subject Choice</h2>
            <p className="mb-4">
              Participants may choose:
            </p>
            <ul className="list-disc pl-6">
              <li className="mb-2">Only Mathematics</li>
              <li className="mb-2">Only Drawing</li>
              <li className="mb-2">Or both (if they wish to challenge themselves in both disciplines)</li>
            </ul>
            <p className="mt-4">
              Schedules are arranged to avoid conflicts between subjects, allowing students to 
              compete in both if desired.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Language Policy</h2>
            <p>
              The Tigers Olympiad is conducted entirely in English. All tasks, themes, instructions, 
              and official communication are provided only in English. Participants must be able to 
              read, understand, and complete their work in English.
            </p>
          </section>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}