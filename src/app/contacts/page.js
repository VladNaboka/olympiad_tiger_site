'use client';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useState } from 'react';

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Здесь будет логика отправки формы
    
    // Сброс формы после отправки
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    alert('Message sent! We will contact you soon.');
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{
        backgroundImage: 'url("/image/fonmain1.png")', 
      }}
    >
      <Navbar />
      
      {/* Header Section с логотипом */}
      <div className="py-12 px-2 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-6">
              <div className="flex flex-col items-center">
                <img
                  src="/image/representativesimg.png"
                  alt="Tigers Logo"
                  width={300}
                  height={300}
                  className="mb-4"
                />
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-orange-600 mb-5 text-center">
              Contact Us
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl text-center mb-12">
              Reach out to the Tigers Olympiad team with your questions
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-6xl relative">
          {/* Contact Form with Tiger Image */}
          <div className="bg-white rounded-lg shadow-sm p-8 relative">
            <div className="flex flex-col lg:flex-row">
              {/* Left Column - Contact Info */}
              <div className="lg:w-1/5 pr-8 flex flex-col">
                <div className="mb-10">
                  <div className="flex items-start mb-3">
                    <span className="flex-shrink-0 text-orange-500 mt-1 mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </span>
                    <span className="text-gray-700">info@tigersedu.com</span>
                  </div>
                </div>
                
                <div className="mb-10">
                  <div className="flex items-start mb-3">
                    <span className="flex-shrink-0 text-orange-500 mt-1 mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </span>
                    <span className="text-gray-700">+7 700 022 0880</span>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <p className="text-gray-700 mb-3">Social Profiles</p>
                  <div className="flex space-x-4">
                    <a href="#" aria-label="Instagram" className="text-orange-500 hover:text-orange-600">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="https://t.me/olympiadinkz" aria-label="Telegram" className="text-orange-500 hover:text-orange-600">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Middle Column - Form */}
              <div className="lg:w-2/5 lg:px-8 lg:border-l lg:border-r border-gray-200">
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-black"
                      placeholder="Enter Your Name"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-black"
                      placeholder="Enter your Email"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-black"
                      placeholder="Enter your Subject"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-black"
                      placeholder="Enter your Message here..."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-orange-500 text-white py-3 px-8 rounded-full hover:bg-orange-600 transition-colors font-semibold"
                    >
                      Send Your Message
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Right Column - Tiger Image */}
              <div className="lg:w-2/5 flex justify-center items-center pl-10">
                <img
                  src="/image/rules1.png"
                  alt="Tiger Mascot"
                  width={350}
                  height={500}
                  style={{ 
                    marginRight: "-80px",
                    width: "400px"
                  }}
                  className="object-contain"
                />
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