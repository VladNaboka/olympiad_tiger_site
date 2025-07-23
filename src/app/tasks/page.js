import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

export default function Tasks() {
  return (
    <div 
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{
        backgroundImage: 'url("/image/fonmain1.png")', 
      }}
    >
      <Navbar />
      
      {/* Header Section with image instead of text */}
      <div className="py-12 px-2 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-8">
              <div className="absolute -right-4 top-0 w-64 h-64 rounded-full bg-yellow-100/60 -z-10"></div>
              <img
                src="/image/tasksmain.png"
                alt="Practice Learn"
                width={534}
                height={156}
                className="relative z-10"
              />
            </div>
            
            <h2 className="text-3xl font-bold text-orange-600 mt-2 mb-4">
              Sample Tasks
            </h2>
            
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Explore example tasks from previous Tigers Olympiad competitions.
            </p>
          </div>
        </div>
      </div>
      
      {/* Mathematics Examples Section - title and card blocks */}
      <div className="px-2 pb-12">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">
            📐 Mathematics Examples
          </h2>
          
          {/* Junior Level - in card format */}
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-sm p-8 relative">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="md:w-3/4 pr-4">
                  <h3 className="text-3xl font-bold mb-6 text-[#0a1741]">Junior Level (Ages 6-10)</h3>
                  
                  <div className="mb-6">
                    <p className="font-medium mb-1 text-gray-900">Task: Logic Sequence</p>
                    <p className="mb-4 text-gray-900">Find the missing number in the sequence: 2, 6, 12, 20, 30, __</p>
                  </div>
                  
                  <div className="bg-[#d686b7] text-white p-6 rounded-xl mb-4">
                    <p className="font-semibold mb-2">Solution Approach:</p>
                    <p className="mb-2">Look for the pattern in the differences between consecutive terms: 4, 6, 8, 10, ...</p>
                    <p>The pattern shows that each difference increases by 2. So the next difference will be 12, and 30 + 12 = 42.</p>
                  </div>
                </div>
                
                <div className="md:w-1/4 flex justify-center items-start">
                  <div className="w-32 h-32 rounded-full border-2 border-orange-500 flex items-center justify-center bg-white">
                    <span className="text-5xl font-bold text-black">42</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Middle Level - in card format */}
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-sm p-8 relative">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="md:w-3/4 pr-4">
                  <h3 className="text-3xl font-bold mb-6 text-[#0a1741]">Middle Level (Ages 11-14)</h3>
                  
                  <div className="mb-6">
                    <p className="font-medium mb-1 text-gray-900">Task: Geometric Problem</p>
                    <p className="mb-4 text-gray-900">A rectangle has an area of 36 square units. If its length is twice its width, find the perimeter of the rectangle.</p>
                  </div>
                  
                  <div className="bg-[#d686b7] text-white p-6 rounded-xl mb-4">
                    <p className="font-semibold mb-2">Solution Approach:</p>
                    <p className="mb-1">Let the width be x and the length be 2x.</p>
                    <p className="mb-1">Then, x × 2x = 36</p>
                    <p className="mb-1">2x² = 36</p>
                    <p className="mb-1">x² = 18</p>
                    <p className="mb-1">x = √18 = 3√2</p>
                    <p className="mb-1">Length = 2x = 6√2</p>
                    <p>Perimeter = 2(length + width) = 2(6√2 + 3√2) = 2(9√2) = 18√2 units</p>
                  </div>
                </div>
                
                <div className="md:w-1/4 flex justify-center items-start">
                  <div className="w-32 h-32 rounded-full border-2 border-orange-500 flex items-center justify-center bg-white">
                    <span className="text-3xl font-bold text-black">18√2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Senior Level - in card format */}
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-sm p-8 relative">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="md:w-3/4 pr-4">
                  <h3 className="text-3xl font-bold mb-6 text-[#0a1741]">Senior Level (Ages 15-17)</h3>
                  
                  <div className="mb-6">
                    <p className="font-medium mb-1 text-gray-900">Task: Probability Challenge</p>
                    <p className="mb-4 text-gray-900">Three fair six-sided dice are rolled. What is the probability that the sum of the numbers shown is exactly 10?</p>
                  </div>
                  
                  <div className="bg-[#d686b7] text-white p-6 rounded-xl mb-4">
                    <p className="font-semibold mb-2">Solution Approach:</p>
                    <p className="mb-2">Total number of possible outcomes when rolling three dice: 6³ = 216</p>
                    <p className="mb-1">Ways to get a sum of 10:</p>
                    <p className="mb-1">(1,3,6), (1,4,5), (1,5,4), (1,6,3),</p>
                    <p className="mb-1">(2,2,6), (2,3,5), (2,4,4), (2,5,3), (2,6,2),</p>
                    <p className="mb-1">(3,1,6), (3,2,5), (3,3,4), (3,4,3), (3,5,2), (3,6,1),</p>
                    <p className="mb-1">(4,1,5), (4,2,4), (4,3,3), (4,4,2), (4,5,1),</p>
                    <p className="mb-1">(5,1,4), (5,2,3), (5,3,2), (5,4,1),</p>
                    <p className="mb-1">(6,1,3), (6,2,2), (6,3,1)</p>
                    <p className="mb-2">There are 27 favorable outcomes.</p>
                    <p>Therefore, the probability is 27/216 = 1/8 = 0.125</p>
                  </div>
                </div>
                
                <div className="md:w-1/4 flex justify-center items-start">
                  <div className="w-32 h-32 rounded-full border-2 border-orange-500 flex items-center justify-center bg-white">
                    <span className="text-4xl font-bold text-black">1/8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Art Examples Section - also in card format */}
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 pt-8">
            🎨 Art Examples
          </h2>
          
          {/* Junior Theme - in card format */}
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-sm p-8 relative">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 pr-4">
                  <h3 className="text-3xl font-bold mb-6 text-[#0a1741]">Junior Theme: "My Dreamworld" (Ages 6-10)</h3>
                  
                  <div className="mb-6">
                    <p className="font-medium mb-1 text-gray-900">Task Description:</p>
                    <p className="mb-4 text-gray-900">
                      Create an artwork that illustrates a world from your imagination. 
                      Think about what makes this world special - its landscapes, inhabitants, 
                      or magical elements. Use your creativity to bring this world to 
                      life through your chosen art medium.
                    </p>
                  </div>
                  
                  <div className="bg-orange-500 text-white p-6 rounded-xl mb-4">
                    <p className="font-semibold mb-2">Materials:</p>
                    <p className="mb-3">Any traditional art materials (watercolors, colored pencils, pastels, etc.)</p>
                    
                    <p className="font-semibold mb-1">Evaluation Criteria:</p>
                    <ul className="list-disc pl-5">
                      <li>Originality and imagination</li>
                      <li>Composition and use of space</li>
                      <li>Technical skill appropriate for age group</li>
                      <li>Creative interpretation of the theme</li>
                    </ul>
                  </div>
                </div>
                
                <div className="md:w-2/5 mt-4 md:mt-0">
                  <div className="rounded-lg overflow-hidden h-64 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="text-4xl mb-2">🎨</div>
                      <p>Sample Artwork</p>
                      <p className="text-sm">Dreamworld Theme</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Middle Theme - in card format */}
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-sm p-8 relative">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 pr-4">
                  <h3 className="text-3xl font-bold mb-6 text-[#0a1741]">Middle Theme: "Connection Between Cultures" (Ages 11-14)</h3>
                  
                  <div className="mb-6">
                    <p className="font-medium mb-1 text-gray-900">Task Description:</p>
                    <p className="mb-4 text-gray-900">
                      Create an artwork that explores the connections, similarities, 
                      or exchanges between two or more different cultures. You might focus 
                      on traditions, food, music, architecture, or any elements that 
                      show how cultures can influence and enrich each other.
                    </p>
                  </div>
                  
                  <div className="bg-orange-500 text-white p-6 rounded-xl mb-4">
                    <p className="font-semibold mb-2">Materials:</p>
                    <p className="mb-3">Any traditional art materials (watercolors, colored pencils, pastels, etc.)</p>
                    
                    <p className="font-semibold mb-1">Evaluation Criteria:</p>
                    <ul className="list-disc pl-5">
                      <li>Cultural sensitivity and understanding</li>
                      <li>Depth of visual storytelling</li>
                      <li>Technical execution and attention to detail</li>
                      <li>Balance and visual harmony</li>
                    </ul>
                  </div>
                </div>
                
                <div className="md:w-2/5 mt-4 md:mt-0">
                  <div className="rounded-lg overflow-hidden h-64 bg-gradient-to-br from-blue-200 to-green-200 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="text-4xl mb-2">🌍</div>
                      <p>Sample Artwork</p>
                      <p className="text-sm">Cultural Connection Theme</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Senior Theme - in card format */}
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-sm p-8 relative">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 pr-4">
                  <h3 className="text-3xl font-bold mb-6 text-[#0a1741]">Senior Theme: "Innovation and Tradition" (Ages 15-17)</h3>
                  
                  <div className="mb-6">
                    <p className="font-medium mb-1 text-gray-900">Task Description:</p>
                    <p className="mb-4 text-gray-900">
                      Create an artwork that explores the relationship between innovation 
                      and tradition. Consider how new technologies or ideas interact with 
                      established customs and heritage. Your artwork should reflect on this 
                      dynamic in a thoughtful and visually compelling way.
                    </p>
                  </div>
                  
                  <div className="bg-orange-500 text-white p-6 rounded-xl mb-4">
                    <p className="font-semibold mb-2">Materials:</p>
                    <p className="mb-3">Any traditional art materials (watercolors, colored pencils, pastels, etc.)</p>
                    
                    <p className="font-semibold mb-1">Evaluation Criteria:</p>
                    <ul className="list-disc pl-5">
                      <li>Conceptual depth and thoughtfulness</li>
                      <li>Technical excellence and mastery of chosen medium</li>
                      <li>Sophisticated use of symbolism and visual metaphor</li>
                      <li>Visual impact and originality</li>
                    </ul>
                  </div>
                </div>
                
                <div className="md:w-2/5 mt-4 md:mt-0">
                  <div className="rounded-lg overflow-hidden h-64 bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="text-4xl mb-2">⚡</div>
                      <p>Sample Artwork</p>
                      <p className="text-sm">Innovation & Tradition Theme</p>
                    </div>
                  </div>
                </div>
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