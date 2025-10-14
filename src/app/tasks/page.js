"use client"
import { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

export default function Tasks() {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{
        backgroundImage: 'url("/image/fonmain1.png")', 
      }}
    >
      <Navbar />
      
      {/* Header Section */}
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
              Math Tiger Olympiad Syllabus
            </h2>
            
            <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center">
              Comprehensive Course Structure for Grades 5-12
            </p>
          </div>
        </div>
      </div>
      
      {/* Mathematics Syllabus Section */}
      <div className="px-2 pb-12">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">
            📐 Mathematics Syllabus
          </h2>

          {/* Category 1: Grades 5-6 */}
          <div className="mb-6">
            <button
              onClick={() => toggleCategory('cat1')}
              className="w-full bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-[#0a1741]">
                  Category 1: Grades 5-6 (Elementary Level)
                </h3>
                <span className="text-3xl text-orange-500">
                  {openCategory === 'cat1' ? '−' : '+'}
                </span>
              </div>
            </button>
            
            {openCategory === 'cat1' && (
              <div className="bg-white rounded-b-xl shadow-sm p-8 mt-2">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-purple-700">Section 1: Logical Reasoning</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Pattern Recognition</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Number patterns and sequences</li>
                          <li>○ Shape patterns and geometric sequences</li>
                          <li>○ Color and figure completion patterns</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Basic Logic Puzzles</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Simple Sudoku (4x4 and 6x6)</li>
                          <li>○ Magic squares (3x3)</li>
                          <li>○ Logic grids with 2-3 variables</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Classification and Grouping</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Odd one out problems</li>
                          <li>○ Categorizing by properties</li>
                          <li>○ Venn diagrams (2 sets)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Spatial Reasoning</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Mirror images and rotations</li>
                          <li>○ Paper folding and cutting</li>
                          <li>○ 3D visualization basics</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-blue-700">Section 2: Mathematical Reasoning</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Number Theory Foundations</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Prime and composite numbers</li>
                          <li>○ Factors and multiples</li>
                          <li>○ LCM and HCF (basic methods)</li>
                          <li>○ Divisibility rules (2, 3, 5, 9, 10, 11)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Arithmetic Operations</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Mental math techniques</li>
                          <li>○ Estimation and approximation</li>
                          <li>○ BODMAS/PEMDAS applications</li>
                          <li>○ Fraction operations</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Basic Algebra</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Simple equations with one variable</li>
                          <li>○ Introduction to algebraic expressions</li>
                          <li>○ Substitution problems</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Geometry Basics</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Properties of 2D shapes</li>
                          <li>○ Perimeter and area calculations</li>
                          <li>○ Basic angle relationships</li>
                          <li>○ Line symmetry</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-green-700">Section 3: Everyday Mathematics</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Money and Banking</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Currency calculations</li>
                          <li>○ Simple interest problems</li>
                          <li>○ Profit and loss basics</li>
                          <li>○ Bills and receipts reading</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Time and Distance</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Time calculations and conversions</li>
                          <li>○ Speed, distance, time relationships</li>
                          <li>○ Calendar problems</li>
                          <li>○ Clock problems (basic)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Data Interpretation</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Bar graphs and pictographs</li>
                          <li>○ Simple pie charts</li>
                          <li>○ Data collection and organization</li>
                          <li>○ Average and mean calculations</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Measurement</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Length, weight, and capacity</li>
                          <li>○ Unit conversions (metric system)</li>
                          <li>○ Temperature readings</li>
                          <li>○ Area and volume basics</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-orange-700">Section 4: Achievers Section</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Advanced Problem Solving</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Multi-step word problems</li>
                          <li>○ Mathematical puzzles and brain teasers</li>
                          <li>○ Creative thinking challenges</li>
                          <li>○ Cross-curricular math applications</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Competition Preparation</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Time management strategies</li>
                          <li>○ Mock test practice</li>
                          <li>○ Error analysis techniques</li>
                          <li>○ Mental calculation speed building</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Category 2: Grades 7-8 */}
          <div className="mb-6">
            <button
              onClick={() => toggleCategory('cat2')}
              className="w-full bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-[#0a1741]">
                  Category 2: Grades 7-8 (Middle Level)
                </h3>
                <span className="text-3xl text-orange-500">
                  {openCategory === 'cat2' ? '−' : '+'}
                </span>
              </div>
            </button>
            
            {openCategory === 'cat2' && (
              <div className="bg-white rounded-b-xl shadow-sm p-8 mt-2">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-purple-700">Section 1: Logical Reasoning</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Advanced Pattern Recognition</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Complex number and algebraic patterns</li>
                          <li>○ Geometric progression patterns</li>
                          <li>○ Matrix patterns and sequences</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Logic Puzzles</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Standard Sudoku (9x9)</li>
                          <li>○ Logic grids with multiple variables</li>
                          <li>○ Truth tables and logical statements</li>
                          <li>○ Deductive reasoning problems</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Analytical Reasoning</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Cause and effect relationships</li>
                          <li>○ Analogies and comparisons</li>
                          <li>○ Sequential reasoning</li>
                          <li>○ Code breaking and ciphers</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Spatial Reasoning</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ 3D object manipulation</li>
                          <li>○ Cross-sections and nets</li>
                          <li>○ Coordinate geometry basics</li>
                          <li>○ Transformation geometry</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-blue-700">Section 2: Mathematical Reasoning</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Advanced Number Theory</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Prime factorization methods</li>
                          <li>○ Modular arithmetic basics</li>
                          <li>○ Perfect squares and cubes</li>
                          <li>○ Number system properties</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Algebra</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Linear equations (one and two variables)</li>
                          <li>○ Simultaneous equations</li>
                          <li>○ Quadratic expressions</li>
                          <li>○ Algebraic identities</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Geometry</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Triangle properties and congruence</li>
                          <li>○ Circle properties (basic)</li>
                          <li>○ Coordinate geometry</li>
                          <li>○ Mensuration (2D and 3D)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Statistics and Probability</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Mean, median, mode calculations</li>
                          <li>○ Basic probability concepts</li>
                          <li>○ Data representation methods</li>
                          <li>○ Frequency distributions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-green-700">Section 3: Everyday Mathematics</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Financial Mathematics</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Compound interest calculations</li>
                          <li>○ Percentage applications</li>
                          <li>○ Ratio and proportion problems</li>
                          <li>○ Partnership and profit sharing</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Advanced Time-Distance Problems</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Relative speed calculations</li>
                          <li>○ Train and boat problems</li>
                          <li>○ Work and time applications</li>
                          <li>○ Pipe and cistern problems</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Data Analysis</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Graph interpretation (line, bar, pie)</li>
                          <li>○ Statistical measures</li>
                          <li>○ Data comparison techniques</li>
                          <li>○ Survey and sampling concepts</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Practical Geometry</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Scale drawings and maps</li>
                          <li>○ Construction problems</li>
                          <li>○ Real-world measurement applications</li>
                          <li>○ Optimization problems</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-orange-700">Section 4: Achievers Section</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Mathematical Olympiad Problems</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ AMC 8 level problem solving</li>
                          <li>○ Pattern-based advanced problems</li>
                          <li>○ Proof writing introduction</li>
                          <li>○ Creative problem-solving techniques</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Competition Strategy</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Advanced mental math techniques</li>
                          <li>○ Time allocation strategies</li>
                          <li>○ Problem selection skills</li>
                          <li>○ Verification methods</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Category 3: Grades 9-10 */}
          <div className="mb-6">
            <button
              onClick={() => toggleCategory('cat3')}
              className="w-full bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-[#0a1741]">
                  Category 3: Grades 9-10 (Secondary Level)
                </h3>
                <span className="text-3xl text-orange-500">
                  {openCategory === 'cat3' ? '−' : '+'}
                </span>
              </div>
            </button>
            
            {openCategory === 'cat3' && (
              <div className="bg-white rounded-b-xl shadow-sm p-8 mt-2">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-purple-700">Section 1: Logical Reasoning</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Complex Logic Systems</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Propositional logic and truth tables</li>
                          <li>○ Logical equivalences and implications</li>
                          <li>○ Set theory applications</li>
                          <li>○ Boolean algebra basics</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Advanced Puzzles</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Mathematical induction problems</li>
                          <li>○ Combinatorial puzzles</li>
                          <li>○ Graph theory applications</li>
                          <li>○ Game theory basics</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Problem-Solving Strategies</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Working backwards technique</li>
                          <li>○ Proof by contradiction</li>
                          <li>○ Case analysis methods</li>
                          <li>○ Extremal principle applications</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Abstract Reasoning</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Function analysis and properties</li>
                          <li>○ Recursive relationships</li>
                          <li>○ Mathematical modeling basics</li>
                          <li>○ Optimization thinking</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-blue-700">Section 2: Mathematical Reasoning</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Advanced Algebra</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Quadratic equations and applications</li>
                          <li>○ Polynomial operations and theorems</li>
                          <li>○ Exponential and logarithmic functions</li>
                          <li>○ Sequence and series</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Trigonometry</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Trigonometric ratios and identities</li>
                          <li>○ Height and distance problems</li>
                          <li>○ Trigonometric equations</li>
                          <li>○ Applications in geometry</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Coordinate Geometry</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Straight line properties</li>
                          <li>○ Circle equations and properties</li>
                          <li>○ Conic sections (basic)</li>
                          <li>○ Distance and section formulas</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Advanced Number Theory</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Diophantine equations (basic)</li>
                          <li>○ Chinese Remainder Theorem</li>
                          <li>○ Euler's theorem applications</li>
                          <li>○ Cryptography basics</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-green-700">Section 3: Everyday Mathematics</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Advanced Statistics</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Standard deviation and variance</li>
                          <li>○ Normal distribution concepts</li>
                          <li>○ Correlation and regression basics</li>
                          <li>○ Statistical inference introduction</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Financial Applications</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Compound interest variations</li>
                          <li>○ Annuity and investment calculations</li>
                          <li>○ EMI and loan calculations</li>
                          <li>○ Stock market mathematics</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Practical Problem Solving</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Optimization in real scenarios</li>
                          <li>○ Mathematical modeling projects</li>
                          <li>○ Technology integration problems</li>
                          <li>○ Environmental mathematics</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Advanced Measurement</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Precision and accuracy concepts</li>
                          <li>○ Error analysis</li>
                          <li>○ Scientific notation applications</li>
                          <li>○ Unit analysis techniques</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-orange-700">Section 4: Achievers Section</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Olympiad Level Problems</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ AMC 10/12 preparation</li>
                          <li>○ International olympiad problems (basic)</li>
                          <li>○ Proof techniques mastery</li>
                          <li>○ Advanced problem-solving methods</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Research Projects</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Mathematical investigation skills</li>
                          <li>○ Historical mathematics exploration</li>
                          <li>○ Cross-disciplinary applications</li>
                          <li>○ Presentation and communication skills</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Category 4: Grades 11-12 */}
          <div className="mb-6">
            <button
              onClick={() => toggleCategory('cat4')}
              className="w-full bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-[#0a1741]">
                  Category 4: Grades 11-12 (Senior Level)
                </h3>
                <span className="text-3xl text-orange-500">
                  {openCategory === 'cat4' ? '−' : '+'}
                </span>
              </div>
            </button>
            
            {openCategory === 'cat4' && (
              <div className="bg-white rounded-b-xl shadow-sm p-8 mt-2">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-purple-700">Section 1: Logical Reasoning</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Mathematical Logic</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Formal logic systems</li>
                          <li>○ Predicate logic and quantifiers</li>
                          <li>○ Proof theory basics</li>
                          <li>○ Axiomatic systems</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Advanced Problem Analysis</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Complexity analysis</li>
                          <li>○ Algorithm design principles</li>
                          <li>○ Recursive problem solving</li>
                          <li>○ Dynamic programming concepts</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Abstract Mathematical Thinking</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Group theory concepts</li>
                          <li>○ Field theory basics</li>
                          <li>○ Linear algebra applications</li>
                          <li>○ Vector space properties</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Research Methodology</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Mathematical conjecture formation</li>
                          <li>○ Hypothesis testing in mathematics</li>
                          <li>○ Literature review techniques</li>
                          <li>○ Mathematical communication</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-blue-700">Section 2: Mathematical Reasoning</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Calculus Applications</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Differential calculus problems</li>
                          <li>○ Integral calculus applications</li>
                          <li>○ Optimization using calculus</li>
                          <li>○ Related rates problems</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Advanced Algebra</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Matrix operations and determinants</li>
                          <li>○ Complex numbers and applications</li>
                          <li>○ Polynomial theory</li>
                          <li>○ Abstract algebra concepts</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Advanced Geometry</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Analytical geometry mastery</li>
                          <li>○ Vector geometry</li>
                          <li>○ Solid geometry applications</li>
                          <li>○ Non-Euclidean geometry introduction</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Discrete Mathematics</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Combinatorics and permutations</li>
                          <li>○ Graph theory applications</li>
                          <li>○ Network theory basics</li>
                          <li>○ Coding theory introduction</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-green-700">Section 3: Everyday Mathematics</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Advanced Statistics and Probability</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Probability distributions</li>
                          <li>○ Hypothesis testing</li>
                          <li>○ Regression analysis</li>
                          <li>○ Statistical modeling</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Mathematical Finance</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Options and derivatives basics</li>
                          <li>○ Risk analysis mathematics</li>
                          <li>○ Portfolio optimization</li>
                          <li>○ Actuarial mathematics introduction</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Applied Mathematics</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Operations research techniques</li>
                          <li>○ Linear programming</li>
                          <li>○ Game theory applications</li>
                          <li>○ Mathematical economics</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Technology Integration</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Mathematical software usage</li>
                          <li>○ Computational mathematics</li>
                          <li>○ Algorithm implementation</li>
                          <li>○ Data science applications</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-orange-700">Section 4: Achievers Section</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● International Competition Preparation</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ IMO level problem solving</li>
                          <li>○ Advanced olympiad techniques</li>
                          <li>○ Research problem identification</li>
                          <li>○ Independent mathematical exploration</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">● Career Preparation</p>
                        <ul className="ml-6 space-y-1 text-gray-700">
                          <li>○ Mathematics in various fields</li>
                          <li>○ Academic research introduction</li>
                          <li>○ Mathematical communication skills</li>
                          <li>○ Professional development planning</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Assessment Framework */}
          <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-3xl font-bold mb-6 text-[#0a1741] text-center">Assessment and Evaluation Framework</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-4 text-orange-600">Continuous Assessment (60%)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Weekly problem-solving sessions</li>
                  <li>• Monthly mock olympiads</li>
                  <li>• Project-based evaluations</li>
                  <li>• Peer review activities</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-4 text-blue-600">Periodic Evaluations (40%)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Quarterly comprehensive tests</li>
                  <li>• Annual olympiad competitions</li>
                  <li>• Portfolio assessments</li>
                  <li>• Presentation evaluations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Art Examples Section */}
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 pt-16">
            🎨 Art Examples
          </h2>
          
          {/* Category 1: Grades 5-6 Art Theme */}
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-sm p-8 relative">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 pr-4">
                  <h3 className="text-3xl font-bold mb-6 text-[#0a1741]">Category 1 Art Theme: "My Dreamworld" (Grades 5-6)</h3>
                  
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
          
          {/* Category 2: Grades 7-8 Art Theme */}
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-sm p-8 relative">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 pr-4">
                  <h3 className="text-3xl font-bold mb-6 text-[#0a1741]">Category 2 Art Theme: "Connection Between Cultures" (Grades 7-8)</h3>
                  
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
          
          {/* Category 3: Grades 9-10 Art Theme */}
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-sm p-8 relative">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 pr-4">
                  <h3 className="text-3xl font-bold mb-6 text-[#0a1741]">Category 3 Art Theme: "Innovation and Tradition" (Grades 9-10)</h3>
                  
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
          
          {/* Category 4: Grades 11-12 Art Theme */}
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-sm p-8 relative">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 pr-4">
                  <h3 className="text-3xl font-bold mb-6 text-[#0a1741]">Category 4 Art Theme: "Future Visions" (Grades 11-12)</h3>
                  
                  <div className="mb-6">
                    <p className="font-medium mb-1 text-gray-900">Task Description:</p>
                    <p className="mb-4 text-gray-900">
                      Create an artwork that envisions the future of humanity, technology, 
                      or society. Your work should demonstrate sophisticated artistic 
                      techniques while conveying a thoughtful perspective on where we 
                      are heading as a civilization. Consider themes such as sustainability, 
                      technological advancement, social evolution, or environmental change.
                    </p>
                  </div>
                  
                  <div className="bg-orange-500 text-white p-6 rounded-xl mb-4">
                    <p className="font-semibold mb-2">Materials:</p>
                    <p className="mb-3">Any traditional art materials (watercolors, colored pencils, pastels, etc.)</p>
                    
                    <p className="font-semibold mb-1">Evaluation Criteria:</p>
                    <ul className="list-disc pl-5">
                      <li>Advanced technical proficiency and mastery</li>
                      <li>Sophisticated conceptual depth and vision</li>
                      <li>Originality and innovative approach</li>
                      <li>Strong visual communication and impact</li>
                      <li>Mature understanding of contemporary issues</li>
                    </ul>
                  </div>
                </div>
                
                <div className="md:w-2/5 mt-4 md:mt-0">
                  <div className="rounded-lg overflow-hidden h-64 bg-gradient-to-br from-indigo-200 to-purple-300 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="text-4xl mb-2">🚀</div>
                      <p>Sample Artwork</p>
                      <p className="text-sm">Future Visions Theme</p>
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