import Navbar from '../../components/navbar.js';
import Footer from '../../components/footer.js';
import Link from 'next/link';

// FAQ items
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
    question: "Is there a participation fee?",
    answer: "Participation is paid. The exact fee is determined by the national representative in each country and may vary depending on local conditions and services. Please contact your country's representative for detailed information about registration fees and payment methods."
  },
  {
    id: 5,
    question: "What subjects can I compete in? Do I have to choose both?",
    answer: "You can choose to participate in one or both subject tracks: Mathematics or Drawing. Participation in both is optional. The schedule is arranged so that students who choose both can fully complete each part without overlap."
  },
  {
    id: 6,
    question: "What is the format of the competition?",
    answer: "Mathematics: National Round - Offline, on paper — 30 questions in 60 minutes, held under exam conditions at a local venue. Final Round: Offline, in the USA — advanced paper-based test during the final event. Drawing: National Round - Participants create their artwork independently at home or school and submit it online to their country's representative. Final Round: The same artworks are presented at an international exhibition during the final in the USA and are evaluated by a jury of artists and professionals. All tasks and themes are provided in English. Evaluation is based on creativity, problem-solving, originality, and clarity."
  },
  {
    id: 7,
    question: "Will I receive a certificate or award even if I don't win?",
    answer: "Yes. At the National Round, all participants receive a Certificate of Participation. Top performers are awarded Gold (top 10%), Silver (next 15%), and Bronze (next 20%) Certificates. At the Final Round, all finalists receive a Certificate of Achievement. The best performers receive international prizes — including university scholarships (Grades 10-12) and valuable prizes or global educational camp scholarships (Grades 5-9), as well as medals and international recognition."
  },
  {
    id: 8,
    question: "How should I prepare for the Olympiad?",
    answer: "For Mathematics: review your school curriculum, solve sample Olympiad questions, and practice time management for 60-minute tests. For Drawing: practice creating original artworks based on themes, develop your technique, and explore creative composition. Make sure you are comfortable working in English, especially with subject-specific vocabulary and instructions. Most importantly — stay inspired, curious, and enjoy the process!"
  },
  {
    id: 9,
    question: "How and when will I get the results?",
    answer: "Results of the National Round are announced by your country's representative. Final Round results and international winners are announced during the Awards Ceremony in the USA and published on our website and social media channels. Winners and their schools receive direct communication from the organizing team."
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-pink-500 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="mt-4 text-xl max-w-3xl mx-auto">
            Find answers to common questions about the International Tigers Olympiad
          </p>
        </div>
      </div>
      
      {/* FAQ Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {faqItems.map((item) => (
              <div key={item.id} className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-orange-500 mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-700">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-orange-50 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-orange-500 mb-4">Still have questions?</h3>
            <p className="mb-6">
              Have more questions? Feel free to reach out to us via the Contacts provided. 
              We're happy to clarify any doubts. Good luck, and we look forward to your participation!
            </p>
            <Link 
              href="/contacts" 
              className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-pink-500 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}