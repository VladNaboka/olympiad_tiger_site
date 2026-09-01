'use client';

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';

// Partners data - можно будет легко добавить реальных партнеров
const partners = [
  {
    id: 1,
    name: "Owlwin Edu",
    description: {
      en: "A trusted international educational company with over 10 years of experience in organizing academic camps and Olympiads abroad.",
      ru: "Надёжная международная образовательная компания с более чем 10-летним опытом организации академических лагерей и олимпиад за рубежом.",
    },
    category: "Agency",
    website: "https://www.owlwinexchange.com",
    logo: "/image/Owlwin Logobook-11.jpeg"
  },
  {
    id: 2,
    name: "SIL Olympiad",
    description: {
      en: "SiL Subject Tests, a rigorously designed, research-backed language assessment for Years 1-9. STEM and English Tests, developed by graduates from the University of Oxford’s Department of Education and marked by a team of Oxford and Cambridge (Oxbridge) specialists. Our test is aligned with the British National Curriculum and designed to challenge students while identifying high achievers both nationally and internationally.",
      ru: "SiL Subject Tests — тщательно разработанная, научно обоснованная языковая оценка для 1–9 классов. Тесты по STEM и английскому языку, созданные выпускниками факультета образования Оксфордского университета и проверяемые командой специалистов Oxbridge (Оксфорд и Кембридж). Наш тест соответствует британской национальной учебной программе и разработан так, чтобы бросать вызов ученикам и выявлять лучших как на национальном, так и на международном уровне.",
    },
    category: "Art Partner",
    website: "https://sharingislearning.com/",
    logo: "/image/sil-olympiad.jpeg"
  },
  {
    id: 4,
    name: "New Generation School (NGS)",
    description: {
      en: "NGS is a private school in Almaty that prepares students for the future, for the era of innovation and bright ideas.",
      ru: "NGS — частная школа в Алматы, которая готовит учеников к будущему, к эпохе инноваций и ярких идей.",
    },
    category: "Private School",
    website: "https://ngs-school.kz/",
    logo: "/image/NGS_logo.png"
  },
  {
    id: 6,
    name: "Aji Naiman",
    description: {
      en: "International teacher recruitment, English education, and media production.",
      ru: "Международный подбор преподавателей, обучение английскому языку и медиапроизводство.",
    },
    category: "Educational Partner",
    website: "https://ajinaiman.com/",
    logo: "/aji logo.jpg"
  },
  {
    id: 7,
    name: "Danyshpan School",
    description: {
      en: "An educational school dedicated to nurturing students through quality learning and academic development in Kazakhstan.",
      ru: "Образовательная школа в Казахстане, нацеленная на развитие учеников через качественное обучение и академический рост.",
    },
    category: "Educational Partner",
    website: "https://www.instagram.com/danyshpan.school?igsh=MWU5eTlhdHh6ZXQ5Ng==",
    logo: "/image/Danyshpan.school.png"
  },
  {
    id: 9,
    name: "Dana School",
    description: {
      en: "A private school in Kazakhstan offering quality education and a nurturing environment for student growth.",
      ru: "Частная школа в Казахстане, предлагающая качественное образование и благоприятную среду для развития учеников.",
    },
    category: "Private School",
    website: "https://danaschool.edu.kz",
    logo: "/image/Danaschool.edu.kz.svg"
  },
  {
    id: 10,
    name: "Miras School",
    description: {
      en: "An international school in Kazakhstan dedicated to academic excellence and holistic student development.",
      ru: "Международная школа в Казахстане, нацеленная на академическое совершенство и всестороннее развитие учеников.",
    },
    category: "Private School",
    website: "https://miras.kz",
    logo: "/image/Miras-logo.jpg"
  },
];

// Category colors
const getCategoryColor = (category) => {
  switch (category) {
    case 'Educational Partner':
      return 'bg-blue-100 text-blue-800';
    case 'Cultural Partner':
      return 'bg-purple-100 text-purple-800';
    case 'Art Partner':
      return 'bg-orange-100 text-orange-800';
    case 'Venue Partner':
      return 'bg-green-100 text-green-800';
    case 'Development Partner':
      return 'bg-orange-100 text-orange-800';
    case 'Technology Partner':
      return 'bg-pink-100 text-pink-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const CATEGORY_LABELS = {
  en: {
    Agency: 'Agency',
    'Art Partner': 'Art Partner',
    'Private School': 'Private School',
    'Educational Partner': 'Educational Partner',
    'Cultural Partner': 'Cultural Partner',
    'Venue Partner': 'Venue Partner',
    'Development Partner': 'Development Partner',
    'Technology Partner': 'Technology Partner',
  },
  ru: {
    Agency: 'Агентство',
    'Art Partner': 'Партнёр по искусству',
    'Private School': 'Частная школа',
    'Educational Partner': 'Образовательный партнёр',
    'Cultural Partner': 'Культурный партнёр',
    'Venue Partner': 'Партнёр по площадке',
    'Development Partner': 'Партнёр по развитию',
    'Technology Partner': 'Технологический партнёр',
  },
};

const TEXT = {
  en: {
    heroTitle: '🤝 Our Partners',
    heroSubtitle: 'Together with our trusted partners, we create inspiring opportunities for young talents around the world',
    philosophyTitle: 'Building a Global Community',
    philosophyP1: 'TIGERS operates under the umbrella of Owlwin, a trusted international educational company with over 10 years of experience in organizing academic camps and Olympiads abroad.',
    philosophyP2: 'Together with our partners, we aim to create inspiring opportunities for young talents, fostering creativity, cultural exchange, and academic excellence across borders.',
    gridTitle: 'Meet Our Partners',
    learnMore: 'Learn More →',
    becomeTitle: 'Become Our Partner',
    becomeText: 'Join us in creating inspiring opportunities for young talents worldwide. Together, we can make a meaningful impact on the future of education and creativity.',
    contactUs: 'Contact Us',
    emailTeam: 'Email Partnership Team',
    partnerLogo: 'Partner Logo',
  },
  ru: {
    heroTitle: '🤝 Наши партнёры',
    heroSubtitle: 'Вместе с нашими надёжными партнёрами мы создаём вдохновляющие возможности для талантливых детей по всему миру',
    philosophyTitle: 'Строим глобальное сообщество',
    philosophyP1: 'TIGERS работает под эгидой Owlwin — надёжной международной образовательной компании с более чем 10-летним опытом организации академических лагерей и олимпиад за рубежом.',
    philosophyP2: 'Вместе с нашими партнёрами мы стремимся создавать вдохновляющие возможности для юных талантов, развивая творчество, культурный обмен и академическое превосходство без границ.',
    gridTitle: 'Наши партнёры',
    learnMore: 'Подробнее →',
    becomeTitle: 'Станьте нашим партнёром',
    becomeText: 'Присоединяйтесь к нам в создании вдохновляющих возможностей для юных талантов по всему миру. Вместе мы можем внести значимый вклад в будущее образования и творчества.',
    contactUs: 'Связаться с нами',
    emailTeam: 'Написать команде партнёрств',
    partnerLogo: 'Логотип партнёра',
  },
};

export default function OurPartners() {
  const { lang } = useLanguage();
  const t = TEXT[lang];

  return (
    <div
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{
        backgroundImage: 'url("/image/fonmain1.png")',
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <div className="py-16 px-4 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left - Torch Logo */}
            <div className="md:w-1/4">
              <img
                src="/image/rulesfakel.png"
                alt="Tigers Olympiad Torch Logo"
                width="300"
                height="400"
                style={{ width: "300px" }}
              />
            </div>

            {/* Center - Title and Description */}
            <div className="md:w-2/4 text-center my-8 md:my-0">
              <h1 className="text-5xl font-bold text-orange-600 mb-6">
                {t.heroTitle}
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                {t.heroSubtitle}
              </p>
            </div>

            {/* Right - Tiger Mascot */}
            <div className="md:w-1/4">
              <img
                src="/image/rules1.png"
                alt="Tigers Olympiad Mascot"
                width="350"
                height="350"
                style={{ width: "350px" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Philosophy */}
      <div className="px-4 mb-12">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-8 rounded-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-2 border-white rounded-full opacity-20 translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold mb-6">{t.philosophyTitle}</h2>
              <p className="text-xl mb-4">
                {t.philosophyP1}
              </p>
              <p className="text-lg">
                {t.philosophyP2}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="px-4 pb-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
            {t.gridTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Partner Logo */}
                <div className="h-48 bg-white rounded-xl shadow-sm flex items-center justify-center overflow-hidden">
                  {partner.logo && partner.logo !== "/image/partner-placeholder.png" ? (
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">🏢</div>
                      <p className="text-sm">{t.partnerLogo}</p>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(partner.category)}`}>
                      {CATEGORY_LABELS[lang][partner.category] || partner.category}
                    </span>
                  </div>

                  {/* Partner Info */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{partner.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{partner.description[lang]}</p>

                  {/* Action Button */}
                  <div className="flex justify-between items-center">
                    <a
                      href={partner.website}
                      className="text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors"
                    >
                      {t.learnMore}
                    </a>
                    <div className="text-2xl">🌟</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Become a Partner */}
      <div className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gray-100 p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{t.becomeTitle}</h3>
            <p className="text-gray-600 mb-6">
              {t.becomeText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacts"
                className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                {t.contactUs}
              </Link>
              <a
                href="mailto:info@tigersedu.com"
                className="inline-block bg-gray-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                {t.emailTeam}
              </a>
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
