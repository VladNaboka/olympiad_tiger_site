'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import LangToggle from '../../components/LangToggle';

// Art regulations data for collapsible sections
const artRegulations = [
  {
    id: 1,
    title: { en: '📋 General Provisions', ru: '📋 Общие положения' },
    content: {
      en: `These Regulations govern the organization and conduct of the international art Olympiad TIGERS, aimed at developing the creative potential of children and teenagers, expanding their cultural horizons, and forming an international art community.

The Olympiad is conducted as part of a global educational project by the Tigers company.`,
      ru: `Настоящее Положение регулирует организацию и проведение международной олимпиады по искусству TIGERS, направленной на развитие творческого потенциала детей и подростков, расширение их культурного кругозора и формирование международного художественного сообщества.

Олимпиада проводится в рамках глобального образовательного проекта компании Tigers.`,
    },
  },
  {
    id: 2,
    title: { en: '🏢 Organizer', ru: '🏢 Организатор' },
    content: {
      en: `The Olympiad is organized by TIGERS, an independent educational initiative launched in 2025. Our team has extensive experience in international collaboration and previously worked with global partners on educational and cultural projects.

  TIGERS operates under the umbrella of Owlwin, a trusted international educational company with over 10 years of experience in organizing academic camps and Olympiads abroad.

  We are proud to partner with SIL Olympiad, which offers SiL Subject Tests—a rigorously designed, research-backed language assessment for Years 1-9, as well as STEM and English Tests. These assessments are developed by graduates from the University of Oxford's Department of Education and marked by a team of Oxford and Cambridge (Oxbridge) specialists. The tests are aligned with the British National Curriculum and designed to challenge students while identifying high achievers both nationally and internationally.

  Together, we aim to create inspiring opportunities for young talents around the world.`,
      ru: `Олимпиаду организует TIGERS — независимая образовательная инициатива, запущенная в 2025 году. Наша команда обладает большим опытом международного сотрудничества и ранее работала с глобальными партнерами над образовательными и культурными проектами.

TIGERS работает под эгидой Owlwin — надежной международной образовательной компании с более чем 10-летним опытом организации академических лагерей и олимпиад за рубежом.

Мы гордимся партнерством с SIL Olympiad, которая предлагает предметные тесты SiL — тщательно разработанную, научно обоснованную языковую оценку для 1–9 классов, а также тесты по STEM и английскому языку. Эти тесты разработаны выпускниками факультета образования Оксфордского университета и проверяются командой специалистов Оксфорда и Кембриджа (Oxbridge). Тесты соответствуют британской национальной учебной программе и предназначены как для того, чтобы бросить вызов учащимся, так и для выявления сильнейших на национальном и международном уровне.

Вместе мы стремимся создавать вдохновляющие возможности для юных талантов по всему миру.`,
    },
  },
  {
    id: 3,
    title: { en: '🎯 Goals and Objectives', ru: '🎯 Цели и задачи' },
    content: {
      en: `• Identify and support gifted children in the field of visual arts
• Develop creative thinking and self-expression
• Form an international art space
• Strengthen cultural ties between schoolchildren from different countries
• Increase interest in art, visual thinking, and contemporary themes`,
      ru: `• Выявление и поддержка одаренных детей в области изобразительного искусства
• Развитие творческого мышления и самовыражения
• Формирование международного художественного пространства
• Укрепление культурных связей между школьниками из разных стран
• Повышение интереса к искусству, визуальному мышлению и современным темам`,
    },
  },
  {
    id: 4,
    title: { en: '👥 Participants', ru: '👥 Участники' },
    content: {
      en: `Schoolchildren aged 6 to 17 years are invited to participate.

Age categories:
• Category I — 6–9 years
• Category II — 10–13 years
• Category III — 14–17 years

Participation is possible individually or through schools, studios, and clubs.`,
      ru: `К участию приглашаются школьники в возрасте от 6 до 17 лет.

Возрастные категории:
• Категория I — 6–9 лет
• Категория II — 10–13 лет
• Категория III — 14–17 лет

Участие возможно индивидуально или через школы, студии и кружки.`,
    },
  },
  {
    id: 6,
    title: { en: '🎨 Olympiad Theme', ru: '🎨 Тема олимпиады' },
    content: {
      en: `Theme for the Finals in South Africa
A Glimpse into Tomorrow (Window to the Future)
Unleash your imagination and present a visual forecast of the world 100 years from now—ranging from high-tech civilizations to new forms of harmony between humanity and nature.

Theme for the Finals in England
Reflections
Explore the world through the play of light, distortions in water and mirrors, or the otherwise hidden essence of familiar things through metaphorical imagery.

Theme for the Finals in Greece
Rhythms of the City
Capture the pulse and energy of a modern metropolis through the dynamics of movement, the contrast of neon lights, or the unique atmosphere of everyday urban life.`,
      ru: `Тема финала в Южной Африке
Взгляд в завтрашний день (Окно в будущее)
Дайте волю воображению и представьте визуальный прогноз мира через 100 лет — от высокотехнологичных цивилизаций до новых форм гармонии между человеком и природой.

Тема финала в Англии
Отражения
Исследуйте мир через игру света, искажения в воде и зеркалах или скрытую суть привычных вещей через метафорические образы.

Тема финала в Греции
Ритмы города
Передайте пульс и энергию современного мегаполиса через динамику движения, контраст неоновых огней или уникальную атмосферу городской повседневности.`,
    },
  },
  {
    id: 7,
    title: { en: '📝 Registration', ru: '📝 Регистрация' },
    content: {
      en: `Registration is carried out through official Tigers representatives. To participate, you must:
• Submit an application
• Pay the registration fee
• Submit your contest entry by the specified deadline`,
      ru: `Регистрация проводится через официальных представителей Tigers. Для участия необходимо:
• Подать заявку
• Оплатить организационный взнос
• Отправить конкурсную работу до указанного срока`,
    },
  },
  {
    id: 8,
    title: { en: '⭐ Evaluation Criteria', ru: '⭐ Критерии оценки' },
    content: {
      en: `Works are evaluated by the following criteria:
• Relevance to the theme
• Originality of idea
• Artistic execution
• Composition
• Expressiveness and depth
• Technical proficiency`,
      ru: `Работы оцениваются по следующим критериям:
• Соответствие теме
• Оригинальность идеи
• Художественное исполнение
• Композиция
• Выразительность и глубина
• Техническое мастерство`,
    },
  },
  {
    id: 10,
    title: { en: '©️ Copyright', ru: '©️ Авторские права' },
    content: {
      en: `Participants retain copyright to their works.

Simultaneously, by submitting a work, the participant (or legal representative) grants the organizers the right to:
• Publish the work on the website and social networks
• Use the image in promotional and informational materials
• Exhibit the work at exhibitions and presentations related to the TIGERS project`,
      ru: `Авторские права на работы сохраняются за участниками.

Одновременно, отправляя работу, участник (или его законный представитель) предоставляет организаторам право:
• Публиковать работу на сайте и в социальных сетях
• Использовать изображение в рекламных и информационных материалах
• Экспонировать работу на выставках и презентациях, связанных с проектом TIGERS`,
    },
  },
  {
    id: 11,
    title: { en: '👨‍⚖️ Jury', ru: '👨‍⚖️ Жюри' },
    content: {
      en: `Works are evaluated by an international jury composed of:
• Professional artists
• Art university professors
• Exhibition and project curators

The jury is formed by the organizer. Jury decisions are final and not subject to revision.`,
      ru: `Работы оценивает международное жюри, в состав которого входят:
• Профессиональные художники
• Преподаватели художественных вузов
• Кураторы выставок и проектов

Жюри формируется организатором. Решения жюри окончательны и пересмотру не подлежат.`,
    },
  },
  {
    id: 12,
    title: { en: '⚠️ Appeals', ru: '⚠️ Апелляции' },
    content: {
      en: `The decisions of the jury are final and cannot be contested. No appeals will be accepted regarding the evaluation, selection of winners, or the outcome of the competition.`,
      ru: `Решения жюри являются окончательными и обжалованию не подлежат. Апелляции по оценке, отбору победителей или итогам конкурса не принимаются.`,
    },
  },
  {
    id: 13,
    title: { en: '📞 Contacts', ru: '📞 Контакты' },
    content: {
      en: `For all inquiries, contact:

📧 Email: info@tigersedu.com
📱 WhatsApp: +7 700 595 1000
📸 Instagram: @tigers.olympiad`,
      ru: `По всем вопросам обращайтесь:

📧 Email: info@tigersedu.com
📱 WhatsApp: +7 700 595 1000
📸 Instagram: @tigers.olympiad`,
    },
  },
];

// Mathematics regulations data for collapsible sections
const mathRegulations = [
  {
    id: 1,
    title: { en: '📋 General Provisions', ru: '📋 Общие положения' },
    content: {
      en: `This document outlines the rules and structure of the TIGERS International Mathematics Olympiad, aimed at developing students' intellectual potential, fostering interest in mathematics, and building an international academic community of young problem-solvers.

The Olympiad is conducted within the global educational framework of Owlwin.`,
      ru: `Настоящий документ определяет правила и структуру Международной математической олимпиады TIGERS, направленной на развитие интеллектуального потенциала учащихся, повышение интереса к математике и формирование международного академического сообщества юных исследователей.

Олимпиада проводится в рамках глобальной образовательной платформы Owlwin.`,
    },
  },
  {
    id: 2,
    title: { en: '🏢 Organizer', ru: '🏢 Организатор' },
    content: {
      en: `The Olympiad is organized by TIGERS, an independent educational initiative founded in 2025. The team has extensive experience in international academic and cultural cooperation and has previously collaborated with global partners on major educational projects.

TIGERS operates under the umbrella of Owlwin, a trusted international educational organization with more than 10 years of experience in organizing academic camps and Olympiads abroad.`,
      ru: `Олимпиаду организует TIGERS — независимая образовательная инициатива, основанная в 2025 году. Команда обладает большим опытом международного академического и культурного сотрудничества и ранее участвовала в крупных образовательных проектах с глобальными партнерами.

TIGERS работает под эгидой Owlwin — надежной международной образовательной организации с более чем 10-летним опытом организации академических лагерей и олимпиад за рубежом.`,
    },
  },
  {
    id: 3,
    title: { en: '🎯 Goals and Objectives', ru: '🎯 Цели и задачи' },
    content: {
      en: `• To identify and support mathematically gifted students
• To promote logical and critical thinking
• To foster interest in mathematics as a field of study
• To ensure academic integrity and global competition
• To provide a platform for knowledge sharing among international students`,
      ru: `• Выявление и поддержка математически одаренных учащихся
• Развитие логического и критического мышления
• Повышение интереса к математике как области знаний
• Обеспечение академической честности и глобальной конкуренции
• Создание платформы для обмена знаниями между учащимися разных стран`,
    },
  },
  {
    id: 4,
    title: { en: '👥 Participants', ru: '👥 Участники' },
    content: {
      en: `Students from Grades 5 to 12 are eligible to participate, divided into four age categories:

• Category I — Grades 5–6
• Category II — Grades 7–8
• Category III — Grades 9–10
• Category IV — Grades 11–12`,
      ru: `К участию допускаются учащиеся с 5 по 12 класс, разделенные на четыре возрастные категории:

• Категория I — 5–6 классы
• Категория II — 7–8 классы
• Категория III — 9–10 классы
• Категория IV — 11–12 классы`,
    },
  },
  {
    id: 5,
    title: { en: '🏆 Format and Stages', ru: '🏆 Формат и этапы' },
    content: {
      en: `The Olympiad consists of two offline stages:

5.1 Preliminary Round:
• 📅 Dates: December 15–25, 2025
• 📍 Locations in Kazakhstan: Astana, Almaty, Shymkent, and Aktau
• 🕒 Exact time and venue details will be provided after registration closes

5.2 Final Round:
• 📅 Summer 2026
• 📍 Final location will be shared individually with students who qualify through the preliminary round`,
      ru: `Олимпиада состоит из двух очных этапов:

5.1 Отборочный тур:
• 📅 Даты: 15–25 декабря 2025 года
• 📍 Места проведения в Казахстане: Астана, Алматы, Шымкент и Актау
• 🕒 Точное время и место проведения будут сообщены после закрытия регистрации

5.2 Финальный тур:
• 📅 Лето 2026 года
• 📍 Место проведения финала будет сообщено индивидуально учащимся, прошедшим отборочный тур`,
    },
  },
  {
    id: 6,
    title: { en: '📝 Test Format', ru: '📝 Формат теста' },
    content: {
      en: `• Categories I and II: 20 questions
• Categories III and IV: 30 questions
• All test materials and instructions are provided exclusively in English
• The Olympiad is conducted only in English, with no translation options
• Participants will use OMR (Optical Mark Recognition) answer sheets`,
      ru: `• Категории I и II: 20 вопросов
• Категории III и IV: 30 вопросов
• Все материалы теста и инструкции предоставляются исключительно на английском языке
• Олимпиада проводится только на английском языке, без вариантов перевода
• Участники используют бланки ответов OMR (оптическое распознавание меток)`,
    },
  },
  {
    id: 7,
    title: { en: '📚 Topics and Preparation', ru: '📚 Темы и подготовка' },
    content: {
      en: `• The list of topics and syllabus for each category will be published on our official website in September 2025: www.tigersedu.com
• Past papers are not publicly available due to copyright regulations and academic integrity standards`,
      ru: `• Перечень тем и программа для каждой категории будут опубликованы на официальном сайте в сентябре 2025 года: www.tigersedu.com
• Задания прошлых лет не находятся в открытом доступе в соответствии с требованиями авторского права и академической честности`,
    },
  },
  {
    id: 8,
    title: { en: '📝 Registration', ru: '📝 Регистрация' },
    content: {
      en: `Registration is carried out through official TIGERS managers and includes:
• Submitting a registration form
• Completing the payment
• Receiving a receipt, which serves as confirmation of participation

☝️ Parental consent is considered granted upon registration and payment for participants under 18.`,
      ru: `Регистрация проводится через официальных менеджеров TIGERS и включает:
• Заполнение регистрационной формы
• Оплату организационного взноса
• Получение чека, который является подтверждением участия

☝️ Согласие родителей считается предоставленным в момент регистрации и оплаты для участников младше 18 лет.`,
    },
  },
  {
    id: 9,
    title: { en: '💰 Participation Fee', ru: '💰 Организационный взнос' },
    content: {
      en: `💬 Details regarding participation fees for each stage of the Olympiad may be obtained directly from the regional manager of your country or city.`,
      ru: `💬 Подробную информацию об организационном взносе на каждом этапе олимпиады можно получить у регионального менеджера вашей страны или города.`,
    },
  },
  {
    id: 10,
    title: { en: '⭐ Evaluation', ru: '⭐ Оценивание' },
    content: {
      en: `• All answer sheets are evaluated by an independent jury, whose members remain anonymous to ensure impartiality
• Scoring is based on the number of correct answers and time taken
• Official results will be published on the Olympiad website`,
      ru: `• Все бланки ответов оцениваются независимым жюри, состав которого остается анонимным для обеспечения беспристрастности
• Оценка основана на количестве правильных ответов и затраченном времени
• Официальные результаты будут опубликованы на сайте олимпиады`,
    },
  },
  {
    id: 11,
    title: { en: '🏅 Awards', ru: '🏅 Награды' },
    content: {
      en: `Finalists will receive the following prizes:

🥇 1st Place – Two-week international educational camp (USA or UK)
🥈 2nd Place – Two-week international educational camp (Europe or Asia)
🥉 3rd Place – Apple iPad

🎖 All participants will receive an official certificate of participation.`,
      ru: `Финалисты получат следующие призы:

🥇 1-е место — двухнедельный международный образовательный лагерь (США или Великобритания)
🥈 2-е место — двухнедельный международный образовательный лагерь (Европа или Азия)
🥉 3-е место — Apple iPad

🎖 Все участники получат официальный сертификат об участии.`,
    },
  },
  {
    id: 12,
    title: { en: '📄 Materials and Publication', ru: '📄 Материалы и публикация' },
    content: {
      en: `• Test papers can be provided to participants upon individual request
• OMR answer sheets will not be published online
• Photos, videos, and participant feedback may be published on official TIGERS platforms (website and social media)`,
      ru: `• Экзаменационные материалы могут быть предоставлены участникам по индивидуальному запросу
• Бланки ответов OMR не публикуются онлайн
• Фото, видео и отзывы участников могут быть опубликованы на официальных платформах TIGERS (сайт и социальные сети)`,
    },
  },
  {
    id: 13,
    title: { en: '📞 Contact Information', ru: '📞 Контактная информация' },
    content: {
      en: `For all inquiries, contact:

📧 Email: info@tigersedu.com
📱 WhatsApp: +7 700 595 1000
📸 Instagram: @tigers.olympiad`,
      ru: `По всем вопросам обращайтесь:

📧 Email: info@tigersedu.com
📱 WhatsApp: +7 700 595 1000
📸 Instagram: @tigers.olympiad`,
    },
  },
];

const UI_TEXT = {
  en: {
    heading: 'Regulations',
    subheading: 'International Tigers Olympiad',
    intro: 'Official regulations governing the organization and conduct of the Tigers Olympiad',
    artTab: '🎨 Art Regulations',
    mathTab: '📐 Mathematics Regulations',
    artHeading: '🎨 Art Competition Regulations',
    artIntro: 'Detailed regulations for the International Tigers Art Olympiad',
    mathHeading: '📐 Mathematics Competition Regulations',
    mathIntro: 'Detailed regulations for the International Tigers Mathematics Olympiad',
  },
  ru: {
    heading: 'Правила',
    subheading: 'Международная олимпиада Tigers',
    intro: 'Официальные правила, регулирующие организацию и проведение олимпиады Tigers',
    artTab: '🎨 Правила по искусству',
    mathTab: '📐 Правила по математике',
    artHeading: '🎨 Правила конкурса по искусству',
    artIntro: 'Подробные правила Международной олимпиады Tigers по искусству',
    mathHeading: '📐 Правила конкурса по математике',
    mathIntro: 'Подробные правила Международной математической олимпиады Tigers',
  },
};

// Component for one regulation section with animation
const RegulationItem = ({ item, isOpen, toggleSection, lang }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const contentEl = contentRef.current;
      setHeight(contentEl.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen, lang]);

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden mb-4">
      <button
        className="w-full p-6 text-left flex items-center justify-between focus:outline-none hover:bg-gray-50 transition-colors"
        onClick={toggleSection}
      >
        <h3 className="text-lg font-bold text-orange-700">{item.title[lang]}</h3>
        <span className={`text-orange-700 text-2xl transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={contentRef} className="px-6 pb-6">
          <div className="text-gray-800 whitespace-pre-line">{item.content[lang]}</div>
        </div>
      </div>
    </div>
  );
};

export default function Regulations() {
  const [openSectionId, setOpenSectionId] = useState(1);
  const [activeTab, setActiveTab] = useState('art');
  const [lang, setLang] = useState('en');
  const t = UI_TEXT[lang];

  return (
    <div
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{
        backgroundImage: 'url("/image/fonmain1.png")',
      }}
    >
      <Navbar lang={lang} />

      {/* Hero Section */}
      <div className="py-10 md:py-16 px-2 relative">
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex justify-center mb-6">
            <LangToggle lang={lang} setLang={setLang} />
          </div>
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
                {t.heading}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
                {t.subheading}
              </h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto px-2">
                {t.intro}
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

      {/* Subject Selection Tabs */}
      <div className="px-4 mb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('art')}
                  className={`py-4 px-6 text-lg font-medium border-b-2 flex-1 text-center transition-colors ${
                    activeTab === 'art'
                      ? 'border-orange-500 text-orange-600 bg-orange-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t.artTab}
                </button>
                <button
                  onClick={() => setActiveTab('math')}
                  className={`py-4 px-6 text-lg font-medium border-b-2 flex-1 text-center transition-colors ${
                    activeTab === 'math'
                      ? 'border-orange-500 text-orange-600 bg-orange-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t.mathTab}
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">

          {/* Art Regulations - Collapsible */}
          {activeTab === 'art' && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-orange-600 mb-4">{t.artHeading}</h3>
                <p className="text-lg text-gray-600">
                  {t.artIntro}
                </p>
              </div>

              <div>
                {artRegulations.map((regulation) => (
                  <RegulationItem
                    key={regulation.id}
                    item={regulation}
                    lang={lang}
                    isOpen={openSectionId === regulation.id}
                    toggleSection={() => setOpenSectionId(openSectionId === regulation.id ? null : regulation.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Mathematics Regulations - Collapsible */}
          {activeTab === 'math' && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-orange-600 mb-4">{t.mathHeading}</h3>
                <p className="text-lg text-gray-600">
                  {t.mathIntro}
                </p>
              </div>

              <div>
                {mathRegulations.map((regulation) => (
                  <RegulationItem
                    key={regulation.id}
                    item={regulation}
                    lang={lang}
                    isOpen={openSectionId === regulation.id}
                    toggleSection={() => setOpenSectionId(openSectionId === regulation.id ? null : regulation.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto">
        <Footer lang={lang} />
      </div>
    </div>
  );
}
