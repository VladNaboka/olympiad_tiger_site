'use client';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createFeedback } from '../api/feedback_api'; // Подстрой путь под свой проект

export default function Contacts() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  // Заполняем email из URL + скроллим к форме
  useEffect(() => {
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl) {
      setFormData(prev => ({ ...prev, email: emailFromUrl }));
      setTimeout(() => {
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await createFeedback(formData);
      alert('✅ Message sent! We will contact you soon.');

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('❌ Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
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
            <div className="mb-6">
              <img
                src="/image/representativesimg.png"
                alt="Tigers Logo"
                width={300}
                height={300}
                className="mb-4"
              />
            </div>
            
            <h2 className="text-4xl font-bold text-orange-600 mb-5 text-center">
              📬 Contacts
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl text-center mb-12">
              For general inquiries about the International Tigers Olympiad, please contact us
            </p>
          </div>
        </div>
      </div>
      
      {/* COO Contact Info */}
      <div className="px-4 mb-12">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-orange-600 text-white p-8 rounded-2xl relative overflow-hidden mb-8">
            <div className="relative z-10 text-center">
              <h3 className="text-2xl font-bold mb-6">COO Information</h3>
              <div className="bg-white text-gray-800 p-6 rounded-xl max-w-md mx-auto">
                <h4 className="text-xl font-bold text-orange-600 mb-2">Ovdiichuk Yulia</h4>
                <p className="text-gray-600 mb-4">COO, International Tigers Olympiad</p>
                <p className="text-gray-700">📞 +7 700 595 1000</p>
                <p className="text-gray-700">📧 yuliya@tigersedu.com</p>
              </div>
            </div>
          </div>
          
          {/* Additional Contact Info */}
          <div className="bg-pink-400 text-white p-6 rounded-xl text-center">
            <p className="text-lg mb-2">
              📌 For questions related to your country's participation, please reach out to your Country Representative.
            </p>
            <p className="text-base">
              Their contact details can be found in the Representatives section of our website.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-6xl relative">
          <div className="bg-white rounded-lg shadow-sm p-8 relative">
            <div className="flex flex-col lg:flex-row">
              
              {/* Social Links */}
              <div className="lg:w-1/5 pr-8 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Stay connected:</h3>
                <a href="https://instagram.com/tigers.olympiad" className="text-orange-500 hover:underline mb-2">📷 Instagram</a>
                <a href="https://t.me/olympiadinkz" className="text-orange-500 hover:underline">💬 Telegram</a>
              </div>
              
              {/* Contact Form */}
              <div id="contact-form" className="lg:w-2/5 lg:px-8 lg:border-l lg:border-r border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Send us a message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
                      placeholder="Enter Your Name"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
                      placeholder="Enter your Email"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
                      placeholder="Enter your Subject"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
                      placeholder="Enter your Message here..."
                      required
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`bg-orange-500 text-white py-3 px-8 rounded-full font-semibold transition-colors ${
                        loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-600'
                      }`}
                    >
                      {loading ? 'Sending...' : 'Send Your Message'}
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Tiger Image */}
              <div className="lg:w-2/5 flex justify-center items-center pl-10">
                <img
                  src="/image/rules1.png"
                  alt="Tiger Mascot"
                  width={350}
                  height={500}
                  className="object-contain"
                  style={{ marginRight: "-80px", width: "400px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
