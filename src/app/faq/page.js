'use client';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

// Updated FAQ data according to new content
const faqItems = [
  {
    id: 1,
    question: {
      en: "🌍 Who can join the Tigers Olympiad?",
      ru: "🌍 Кто может участвовать в олимпиаде Tigers?",
    },
    answer: {
      en: "Any student aged 6–17 from anywhere in the world is welcome! Whether you're a creative soul with a passion for Art 🎨, a problem solver who loves Mathematics 🧠, or both — the Tigers Olympiad is your gateway to shine on an international stage.",
      ru: "Приглашаются любые ученики в возрасте 6–17 лет из любой точки мира! Творческая натура с любовью к искусству 🎨, любитель решать задачи по математике 🧠, или и то, и другое — олимпиада Tigers станет вашим шансом проявить себя на международной сцене.",
    },
  },
  {
    id: 2,
    question: {
      en: "📝 How can I register, and what are the deadlines?",
      ru: "📝 Как зарегистрироваться и какие сроки?",
    },
    answer: {
      en: "Registration is handled exclusively through official Country Representatives. Visit the \"Representatives\" section on our website, find your country, and connect with your local coordinator. They'll guide you through every step — from deadlines to payment and participation. Please note: registration is not available directly through the international website, and timelines may differ by country.",
      ru: "Регистрация осуществляется исключительно через официальных представителей в странах. Перейдите в раздел «Представители» на нашем сайте, найдите свою страну и свяжитесь с местным координатором. Он поможет со всеми шагами — от сроков до оплаты и участия. Обратите внимание: регистрация напрямую через международный сайт недоступна, а сроки могут отличаться по странам.",
    },
  },
  {
    id: 3,
    question: {
      en: "🗣 What language is the Olympiad conducted in?",
      ru: "🗣 На каком языке проходит олимпиада?",
    },
    answer: {
      en: "All aspects of the Olympiad — tests, themes, instructions, and communication — are conducted entirely in English. No translations or alternate versions are provided. This is your chance to use English in a real-world, inspiring context!",
      ru: "Все аспекты олимпиады — тесты, темы, инструкции и коммуникация — проводятся полностью на английском языке. Переводы или альтернативные версии не предоставляются. Это отличная возможность применить английский язык в реальном, вдохновляющем контексте!",
    },
  },
  {
    id: 4,
    question: {
      en: "💰 Is there a participation fee?",
      ru: "💰 Есть ли организационный взнос?",
    },
    answer: {
      en: "Yes. Each country sets its own participation fee based on local conditions and services. Please contact your Country Representative for exact pricing and payment instructions.",
      ru: "Да. Каждая страна устанавливает свой организационный взнос в зависимости от местных условий и услуг. Точную стоимость и порядок оплаты уточняйте у представителя вашей страны.",
    },
  },
  {
    id: 5,
    question: {
      en: "📚 What subjects can I compete in? Do I have to choose both?",
      ru: "📚 В каких дисциплинах можно участвовать? Нужно ли выбирать обе?",
    },
    answer: {
      en: "You can choose to participate in: • 📐 Mathematics • 🎨 Art ...or both! The schedule is designed to ensure that students choosing both tracks can complete each part without conflict.",
      ru: "Вы можете участвовать в: • 📐 Математике • 🎨 Искусстве ...или в обеих сразу! Расписание составлено так, чтобы ученики, выбравшие оба направления, могли пройти каждую часть без пересечений.",
    },
  },
  {
    id: 6,
    question: {
      en: "🔍 What does the competition format look like?",
      ru: "🔍 Как устроен формат соревнования?",
    },
    answer: {
      en: "📐 Mathematics: • National Round: Offline, paper-based test with up to 30 questions in 60 minutes, held under exam conditions. • Global Final: Advanced paper-based assessment conducted in person during the final event. 🎨 Art: • National Round: Participants create their artwork independently at home or school and submit it online to their Country Representative. • Global Final: Finalist artworks are exhibited at the international finals in Prague, where they are evaluated by a panel of professional artists. All tasks and themes are in English. Judging focuses on creativity, originality, clarity, and problem-solving.",
      ru: "📐 Математика: • Национальный этап: очный письменный тест до 30 вопросов за 60 минут, в экзаменационных условиях. • Глобальный финал: усложнённое письменное задание, проводится очно во время финального мероприятия. 🎨 Искусство: • Национальный этап: участники создают работу самостоятельно дома или в школе и отправляют её онлайн своему представителю в стране. • Глобальный финал: работы финалистов выставляются на международном финале в Праге, где их оценивает жюри профессиональных художников. Все задания и темы — на английском языке. Оценка фокусируется на креативности, оригинальности, ясности и умении решать задачи.",
    },
  },
  {
    id: 7,
    question: {
      en: "🏅 Will I receive a certificate or award if I don't win?",
      ru: "🏅 Получу ли я сертификат или награду, если не выиграю?",
    },
    answer: {
      en: "Absolutely! • 🪪 All participants in the National Round receive a Certificate of Participation. • 🏆 All Global Finalists receive a Certificate of Achievement. Top performers will win exciting prizes such as: o Tablets o Art kits o Summer camp experiences o And more!",
      ru: "Конечно! • 🪪 Все участники национального этапа получают сертификат участника. • 🏆 Все финалисты глобального финала получают сертификат достижений. Лучшие получат ценные призы: o Планшеты o Наборы для творчества o Путёвки в летний лагерь o И многое другое!",
    },
  },
  {
    id: 8,
    question: {
      en: "✨ How should I prepare?",
      ru: "✨ Как подготовиться?",
    },
    answer: {
      en: "For Mathematics: review your school curriculum, study the topics listed in our Syllabus section, and practice time management during timed tests. For Art: explore different creative styles, practice themed drawings, and work on expressing your unique vision. And don't forget — the entire Olympiad is in English, so practicing subject-specific vocabulary is a great idea! Above all — stay curious, stay inspired, and enjoy the journey!",
      ru: "Для математики: повторите школьную программу, изучите темы в разделе «Силлабус» и потренируйтесь укладываться во время на тестах. Для искусства: попробуйте разные творческие стили, потренируйтесь рисовать на заданные темы и поработайте над выражением своего уникального видения. И не забывайте — вся олимпиада проходит на английском, поэтому полезно выучить профильную лексику! Главное — оставайтесь любознательными, вдохновлёнными и получайте удовольствие от процесса!",
    },
  },
  {
    id: 9,
    question: {
      en: "📢 When and how will I receive my results?",
      ru: "📢 Когда и как я узнаю результаты?",
    },
    answer: {
      en: "• National Round results are announced by your Country Representative and also published on our website. • Global Final results are revealed during the Awards Ceremony and shared on our website and official social media platforms.",
      ru: "• Результаты национального этапа объявляет представитель вашей страны, они также публикуются на нашем сайте. • Результаты глобального финала объявляются на церемонии награждения и публикуются на сайте и в официальных социальных сетях.",
    },
  },
  {
    id: 10,
    question: {
      en: "❔ Still have questions?",
      ru: "❔ Остались вопросы?",
    },
    answer: {
      en: "No problem — we're here for you! Reach out through the Contacts page or your local representative. We'll be happy to help you take the next step toward your Tigers adventure.",
      ru: "Не проблема — мы всегда на связи! Напишите нам через страницу «Контакты» или свяжитесь с местным представителем. Будем рады помочь вам сделать следующий шаг навстречу приключению Tigers.",
    },
  }
];

const PAGE_TEXT = {
  en: {
    heroTitle: 'FAQ – FREQUENTLY ASKED QUESTIONS',
    heroSubtitle: 'Find answers to common questions about the International Tigers Olympiad',
    stillHaveQuestions: '❔ Still have questions?',
    stillHaveQuestionsText: (
      <>
        No problem — we're here for you!<br />
        Reach out through the Contacts page or your local representative.<br />
        We'll be happy to help you take the next step toward your Tigers adventure! 🐯
      </>
    ),
    contactUs: 'Contact Us',
    findRepresentative: 'Find Your Representative',
  },
  ru: {
    heroTitle: 'FAQ – ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ',
    heroSubtitle: 'Ответы на самые частые вопросы о Международной олимпиаде Tigers',
    stillHaveQuestions: '❔ Остались вопросы?',
    stillHaveQuestionsText: (
      <>
        Не проблема — мы всегда на связи!<br />
        Напишите нам через страницу «Контакты» или свяжитесь с местным представителем.<br />
        Будем рады помочь вам сделать следующий шаг навстречу приключению Tigers! 🐯
      </>
    ),
    contactUs: 'Написать нам',
    findRepresentative: 'Найти представителя',
  },
};

// Component for one FAQ question with animation
const FaqItem = ({ item, lang, isOpen, toggleQuestion }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const contentEl = contentRef.current;
      setHeight(contentEl.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden mb-4">
      <button
        className="w-full p-6 text-left flex items-center justify-between focus:outline-none"
        onClick={toggleQuestion}
      >
        <h3 className="text-lg font-bold text-orange-700">{item.question[lang]}</h3>
        <span className={`text-orange-700 text-2xl transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={contentRef} className="px-6 pb-6">
          <div className="text-gray-800 whitespace-pre-line">{item.answer[lang]}</div>
        </div>
      </div>
    </div>
  );
};

export default function FAQ() {
  // State for open/closed questions
  const [openQuestionId, setOpenQuestionId] = useState(1);
  const { lang } = useLanguage();
  const t = PAGE_TEXT[lang];

  return (
    <div
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{
        backgroundImage: 'url("/image/fonmain1.png")',
      }}
    >
      <Navbar />

      {/* Hero Section - centered design */}
      <div className="py-24 px-4 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left - Title and Description */}
            <div className="md:w-1/2 pr-8">
              <h1 className="text-5xl font-bold text-orange-700 mb-6">
                {t.heroTitle}
              </h1>
              <p className="text-xl text-gray-600">
                {t.heroSubtitle}
              </p>
            </div>

            {/* Right - Logo "WE ARE TIGERS" */}
            <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
              <div className="relative w-80 h-80">
                <div className="absolute w-full h-full rounded-full bg-yellow-100/60 z-0"></div>
                <div className="relative z-10 p-4">
                  <img
                    src="/image/wearetigers.png"
                    alt="Tigers Olympiad Logo"
                    width="400"
                    height="500"
                    style={{ width: "400px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div>
            {faqItems.map((item) => (
              <FaqItem
                key={item.id}
                item={item}
                lang={lang}
                isOpen={openQuestionId === item.id}
                toggleQuestion={() => setOpenQuestionId(openQuestionId === item.id ? null : item.id)}
              />
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-16 bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-orange-700 mb-4">{t.stillHaveQuestions}</h2>
            <p className="mb-6">
              {t.stillHaveQuestionsText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacts"
                className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                {t.contactUs}
              </Link>
              <Link
                href="/representatives"
                className="inline-block bg-gray-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                {t.findRepresentative}
              </Link>
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
