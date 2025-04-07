import Navbar from '../../components/navbar.js';
import Footer from '../../components/footer.js';
import Image from 'next/image';

export default function Tasks() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-orange-500 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold">Sample Tasks</h1>
          <p className="mt-4 text-xl max-w-3xl mx-auto">
            Explore example tasks from previous Tigers Olympiad competitions
          </p>
        </div>
      </div>
      
      {/* Mathematics Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-12">Mathematics Examples</h2>
          
          <div className="space-y-12">
            {/* Math Task 1 */}
            <div className="bg-orange-50 p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold text-orange-500 mb-4">Junior Level (Grades 5-6)</h3>
                  <p className="mb-4 font-medium">Task: Logic Sequence</p>
                  <p className="mb-4">
                    Find the missing number in the sequence: 2, 6, 12, 20, 30, __
                  </p>
                  <div className="mt-6 p-4 bg-white rounded border border-gray-200">
                    <p className="font-semibold text-gray-700">Solution Approach:</p>
                    <p className="mt-2">
                      Look for the pattern in the differences between consecutive terms:
                      4, 6, 8, 10, ...
                      The pattern shows that each difference increases by 2.
                      So the next difference will be 12, and 30 + 12 = 42.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/4 flex justify-center">
                  <div className="h-32 w-32 bg-orange-200 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-orange-600">42</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Math Task 2 */}
            <div className="bg-orange-50 p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold text-orange-500 mb-4">Middle Level (Grades 7-9)</h3>
                  <p className="mb-4 font-medium">Task: Geometric Problem</p>
                  <p className="mb-4">
                    A rectangle has an area of 36 square units. If its length is twice its width, 
                    find the perimeter of the rectangle.
                  </p>
                  <div className="mt-6 p-4 bg-white rounded border border-gray-200">
                    <p className="font-semibold text-gray-700">Solution Approach:</p>
                    <p className="mt-2">
                      Let the width be x and the length be 2x.
                      Then, x × 2x = 36
                      2x² = 36
                      x² = 18
                      x = √18 = 3√2
                      Length = 2x = 6√2
                      Perimeter = 2(length + width) = 2(6√2 + 3√2) = 2(9√2) = 18√2 units
                    </p>
                  </div>
                </div>
                <div className="md:w-1/4 flex justify-center">
                  <div className="relative h-32 w-32">
                    <Image
                      src="/api/placeholder/300/200"
                      alt="Rectangle Diagram"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Math Task 3 */}
            <div className="bg-orange-50 p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold text-orange-500 mb-4">Senior Level (Grades 10-12)</h3>
                  <p className="mb-4 font-medium">Task: Probability Challenge</p>
                  <p className="mb-4">
                    Three fair six-sided dice are rolled. What is the probability that the 
                    sum of the numbers shown is exactly 10?
                  </p>
                  <div className="mt-6 p-4 bg-white rounded border border-gray-200">
                    <p className="font-semibold text-gray-700">Solution Approach:</p>
                    <p className="mt-2">
                      Total number of possible outcomes when rolling three dice: 6³ = 216
                      <br /><br />
                      Ways to get a sum of 10:
                      (1,3,6), (1,4,5), (1,5,4), (1,6,3),
                      (2,2,6), (2,3,5), (2,4,4), (2,5,3), (2,6,2),
                      (3,1,6), (3,2,5), (3,3,4), (3,4,3), (3,5,2), (3,6,1),
                      (4,1,5), (4,2,4), (4,3,3), (4,4,2), (4,5,1),
                      (5,1,4), (5,2,3), (5,3,2), (5,4,1),
                      (6,1,3), (6,2,2), (6,3,1)
                      <br /><br />
                      There are 27 favorable outcomes.
                      <br /><br />
                      Therefore, the probability is 27/216 = 1/8 = 0.125
                    </p>
                  </div>
                </div>
                <div className="md:w-1/4 flex justify-center">
                  <div className="relative h-32 w-32">
                    <Image
                      src="/api/placeholder/300/300"
                      alt="Dice"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Drawing Section */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-12">Drawing Examples</h2>
          
          <div className="space-y-12">
            {/* Drawing Task 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-orange-500 mb-4">Junior Theme: "My Dreamworld"</h3>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <p className="mb-4">
                    <span className="font-medium">Task Description:</span> Create an artwork that illustrates a world 
                    from your imagination. Think about what makes this world special - its landscapes, 
                    inhabitants, or magical elements. Use your creativity to bring this world to life 
                    through your chosen art medium.
                  </p>
                  <p className="mb-4">
                    <span className="font-medium">Materials:</span> Any traditional art materials (watercolors, 
                    colored pencils, pastels, etc.)
                  </p>
                  <p className="mb-4">
                    <span className="font-medium">Evaluation Criteria:</span>
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Originality and imagination</li>
                    <li>Composition and use of space</li>
                    <li>Technical skill appropriate for age group</li>
                    <li>Creative interpretation of the theme</li>
                  </ul>
                </div>
                <div className="md:w-1/2">
                  <div className="relative h-64 w-full">
                    <Image
                      src="/api/placeholder/500/300"
                      alt="Dream World Artwork Example"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Example of a winning artwork from previous Olympiad
                  </p>
                </div>
              </div>
            </div>
            
            {/* Drawing Task 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-orange-500 mb-4">Middle Theme: "Connection Between Cultures"</h3>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <p className="mb-4">
                    <span className="font-medium">Task Description:</span> Create an artwork that explores the 
                    connections, similarities, or exchanges between two or more different cultures. 
                    You might focus on traditions, food, music, architecture, or any elements that 
                    show how cultures can influence and enrich each other.
                  </p>
                  <p className="mb-4">
                    <span className="font-medium">Materials:</span> Any traditional art materials (watercolors, 
                    colored pencils, pastels, etc.)
                  </p>
                  <p className="mb-4">
                    <span className="font-medium">Evaluation Criteria:</span>
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Cultural sensitivity and understanding</li>
                    <li>Depth of visual storytelling</li>
                    <li>Technical execution and attention to detail</li>
                    <li>Balance and visual harmony</li>
                  </ul>
                </div>
                <div className="md:w-1/2">
                  <div className="relative h-64 w-full">
                    <Image
                      src="/api/placeholder/500/300"
                      alt="Cultural Connection Artwork Example"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Example of a winning artwork from previous Olympiad
                  </p>
                </div>
              </div>
            </div>
            
            {/* Drawing Task 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-orange-500 mb-4">Senior Theme: "Innovation and Tradition"</h3>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <p className="mb-4">
                    <span className="font-medium">Task Description:</span> Create an artwork that explores the 
                    relationship between innovation and tradition. Consider how new technologies 
                    or ideas interact with established customs and heritage. Your artwork should 
                    reflect on this dynamic in a thoughtful and visually compelling way.
                  </p>
                  <p className="mb-4">
                    <span className="font-medium">Materials:</span> Any traditional art materials (watercolors, 
                    colored pencils, pastels, etc.)
                  </p>
                  <p className="mb-4">
                    <span className="font-medium">Evaluation Criteria:</span>
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Conceptual depth and thoughtfulness</li>
                    <li>Technical excellence and mastery of chosen medium</li>
                    <li>Visual impact and originality</li>
                    <li>Sophisticated use of symbolism and visual metaphor</li>
                  </ul>
                </div>
                <div className="md:w-1/2">
                  <div className="relative h-64 w-full">
                    <Image
                      src="/api/placeholder/500/300"
                      alt="Innovation and Tradition Artwork Example"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Example of a winning artwork from previous Olympiad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}