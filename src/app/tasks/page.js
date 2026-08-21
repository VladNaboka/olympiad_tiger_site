"use client"
import { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import LangToggle from '../../components/LangToggle';

const t = (obj, lang) => obj[lang];

// Section color themes, reused across every category (index 0-3)
const SECTION_THEME = [
  { grad: 'from-purple-50 to-pink-50', title: 'text-purple-700' },
  { grad: 'from-blue-50 to-cyan-50', title: 'text-blue-700' },
  { grad: 'from-green-50 to-emerald-50', title: 'text-green-700' },
  { grad: 'from-orange-50 to-amber-50', title: 'text-orange-700' },
];

const CATEGORIES = [
  {
    key: 'cat1',
    title: { en: 'Category 1: Grades 5-6', ru: 'Категория 1: 5–6 классы' },
    sections: [
      {
        title: { en: 'Section 1: Logical Reasoning', ru: 'Раздел 1: Логическое мышление' },
        subsections: [
          {
            title: { en: 'Pattern Recognition', ru: 'Распознавание закономерностей' },
            items: [
              { en: 'Number patterns and sequences', ru: 'Числовые закономерности и последовательности' },
              { en: 'Shape patterns and geometric sequences', ru: 'Закономерности фигур и геометрические последовательности' },
              { en: 'Color and figure completion patterns', ru: 'Закономерности дополнения цвета и фигур' },
            ],
          },
          {
            title: { en: 'Basic Logic Puzzles', ru: 'Базовые логические головоломки' },
            items: [
              { en: 'Simple Sudoku (4x4 and 6x6)', ru: 'Простое судоку (4×4 и 6×6)' },
              { en: 'Magic squares (3x3)', ru: 'Магические квадраты (3×3)' },
              { en: 'Logic grids with 2-3 variables', ru: 'Логические таблицы с 2–3 переменными' },
            ],
          },
          {
            title: { en: 'Classification and Grouping', ru: 'Классификация и группировка' },
            items: [
              { en: 'Odd one out problems', ru: 'Задачи «найди лишнее»' },
              { en: 'Categorizing by properties', ru: 'Классификация по свойствам' },
              { en: 'Venn diagrams (2 sets)', ru: 'Диаграммы Венна (2 множества)' },
            ],
          },
          {
            title: { en: 'Spatial Reasoning', ru: 'Пространственное мышление' },
            items: [
              { en: 'Mirror images and rotations', ru: 'Зеркальные отражения и повороты' },
              { en: 'Paper folding and cutting', ru: 'Складывание и разрезание бумаги' },
              { en: '3D visualization basics', ru: 'Основы 3D-визуализации' },
            ],
          },
        ],
      },
      {
        title: { en: 'Section 2: Mathematical Reasoning', ru: 'Раздел 2: Математическое мышление' },
        subsections: [
          {
            title: { en: 'Number Theory Foundations', ru: 'Основы теории чисел' },
            items: [
              { en: 'Prime and composite numbers', ru: 'Простые и составные числа' },
              { en: 'Factors and multiples', ru: 'Делители и кратные' },
              { en: 'LCM and HCF (basic methods)', ru: 'НОК и НОД (базовые методы)' },
              { en: 'Divisibility rules (2, 3, 5, 9, 10, 11)', ru: 'Признаки делимости (2, 3, 5, 9, 10, 11)' },
            ],
          },
          {
            title: { en: 'Arithmetic Operations', ru: 'Арифметические операции' },
            items: [
              { en: 'Mental math techniques', ru: 'Приёмы устного счёта' },
              { en: 'Estimation and approximation', ru: 'Оценка и приближённые вычисления' },
              { en: 'BODMAS/PEMDAS applications', ru: 'Применение порядка действий (BODMAS/PEMDAS)' },
              { en: 'Fraction operations', ru: 'Операции с дробями' },
            ],
          },
          {
            title: { en: 'Basic Algebra', ru: 'Основы алгебры' },
            items: [
              { en: 'Simple equations with one variable', ru: 'Простые уравнения с одной переменной' },
              { en: 'Introduction to algebraic expressions', ru: 'Введение в алгебраические выражения' },
              { en: 'Substitution problems', ru: 'Задачи на подстановку' },
            ],
          },
          {
            title: { en: 'Geometry Basics', ru: 'Основы геометрии' },
            items: [
              { en: 'Properties of 2D shapes', ru: 'Свойства плоских фигур' },
              { en: 'Perimeter and area calculations', ru: 'Вычисление периметра и площади' },
              { en: 'Basic angle relationships', ru: 'Базовые отношения углов' },
              { en: 'Line symmetry', ru: 'Осевая симметрия' },
            ],
          },
        ],
      },
      {
        title: { en: 'Section 3: Everyday Mathematics', ru: 'Раздел 3: Математика в повседневной жизни' },
        subsections: [
          {
            title: { en: 'Money and Banking', ru: 'Деньги и банковское дело' },
            items: [
              { en: 'Currency calculations', ru: 'Расчёты с валютой' },
              { en: 'Simple interest problems', ru: 'Задачи на простые проценты' },
              { en: 'Profit and loss basics', ru: 'Основы прибыли и убытков' },
              { en: 'Bills and receipts reading', ru: 'Чтение счетов и чеков' },
            ],
          },
          {
            title: { en: 'Time and Distance', ru: 'Время и расстояние' },
            items: [
              { en: 'Time calculations and conversions', ru: 'Расчёты и перевод времени' },
              { en: 'Speed, distance, time relationships', ru: 'Взаимосвязь скорости, расстояния и времени' },
              { en: 'Calendar problems', ru: 'Задачи на календарь' },
              { en: 'Clock problems (basic)', ru: 'Задачи на часы (базовые)' },
            ],
          },
          {
            title: { en: 'Data Interpretation', ru: 'Интерпретация данных' },
            items: [
              { en: 'Bar graphs and pictographs', ru: 'Столбчатые диаграммы и пиктограммы' },
              { en: 'Simple pie charts', ru: 'Простые круговые диаграммы' },
              { en: 'Data collection and organization', ru: 'Сбор и организация данных' },
              { en: 'Average and mean calculations', ru: 'Вычисление среднего значения' },
            ],
          },
          {
            title: { en: 'Measurement', ru: 'Измерения' },
            items: [
              { en: 'Length, weight, and capacity', ru: 'Длина, масса и объём' },
              { en: 'Unit conversions (metric system)', ru: 'Перевод единиц измерения (метрическая система)' },
              { en: 'Temperature readings', ru: 'Показания температуры' },
              { en: 'Area and volume basics', ru: 'Основы площади и объёма' },
            ],
          },
        ],
      },
      {
        title: { en: 'Section 4: Achievers Section', ru: 'Раздел 4: Секция для отличников' },
        subsections: [
          {
            title: { en: 'Advanced Problem Solving', ru: 'Продвинутое решение задач' },
            items: [
              { en: 'Multi-step word problems', ru: 'Многошаговые текстовые задачи' },
              { en: 'Mathematical puzzles and brain teasers', ru: 'Математические головоломки и задачи на смекалку' },
              { en: 'Creative thinking challenges', ru: 'Задания на творческое мышление' },
              { en: 'Cross-curricular math applications', ru: 'Применение математики в других предметах' },
            ],
          },
          {
            title: { en: 'Competition Preparation', ru: 'Подготовка к соревнованиям' },
            items: [
              { en: 'Time management strategies', ru: 'Стратегии управления временем' },
              { en: 'Mock test practice', ru: 'Тренировочные тесты' },
              { en: 'Error analysis techniques', ru: 'Методы анализа ошибок' },
              { en: 'Mental calculation speed building', ru: 'Развитие скорости устного счёта' },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'cat2',
    title: { en: 'Category 2: Grades 7-8', ru: 'Категория 2: 7–8 классы' },
    sections: [
      {
        title: { en: 'Section 1: Logical Reasoning', ru: 'Раздел 1: Логическое мышление' },
        subsections: [
          {
            title: { en: 'Advanced Pattern Recognition', ru: 'Продвинутое распознавание закономерностей' },
            items: [
              { en: 'Complex number and algebraic patterns', ru: 'Сложные числовые и алгебраические закономерности' },
              { en: 'Geometric progression patterns', ru: 'Закономерности геометрической прогрессии' },
              { en: 'Matrix patterns and sequences', ru: 'Закономерности и последовательности матриц' },
            ],
          },
          {
            title: { en: 'Logic Puzzles', ru: 'Логические головоломки' },
            items: [
              { en: 'Standard Sudoku (9x9)', ru: 'Стандартное судоку (9×9)' },
              { en: 'Logic grids with multiple variables', ru: 'Логические таблицы с несколькими переменными' },
              { en: 'Truth tables and logical statements', ru: 'Таблицы истинности и логические утверждения' },
              { en: 'Deductive reasoning problems', ru: 'Задачи на дедуктивное мышление' },
            ],
          },
          {
            title: { en: 'Analytical Reasoning', ru: 'Аналитическое мышление' },
            items: [
              { en: 'Cause and effect relationships', ru: 'Причинно-следственные связи' },
              { en: 'Analogies and comparisons', ru: 'Аналогии и сравнения' },
              { en: 'Sequential reasoning', ru: 'Последовательное мышление' },
              { en: 'Code breaking and ciphers', ru: 'Разгадывание кодов и шифров' },
            ],
          },
          {
            title: { en: 'Spatial Reasoning', ru: 'Пространственное мышление' },
            items: [
              { en: '3D object manipulation', ru: 'Работа с 3D-объектами' },
              { en: 'Cross-sections and nets', ru: 'Сечения и развёртки' },
              { en: 'Coordinate geometry basics', ru: 'Основы координатной геометрии' },
              { en: 'Transformation geometry', ru: 'Геометрические преобразования' },
            ],
          },
        ],
      },
      {
        title: { en: 'Section 2: Mathematical Reasoning', ru: 'Раздел 2: Математическое мышление' },
        subsections: [
          {
            title: { en: 'Advanced Number Theory', ru: 'Продвинутая теория чисел' },
            items: [
              { en: 'Prime factorization methods', ru: 'Методы разложения на простые множители' },
              { en: 'Modular arithmetic basics', ru: 'Основы модульной арифметики' },
              { en: 'Perfect squares and cubes', ru: 'Полные квадраты и кубы' },
              { en: 'Number system properties', ru: 'Свойства числовых систем' },
            ],
          },
          {
            title: { en: 'Algebra', ru: 'Алгебра' },
            items: [
              { en: 'Linear equations (one and two variables)', ru: 'Линейные уравнения (с одной и двумя переменными)' },
              { en: 'Simultaneous equations', ru: 'Системы уравнений' },
              { en: 'Quadratic expressions', ru: 'Квадратные выражения' },
              { en: 'Algebraic identities', ru: 'Алгебраические тождества' },
            ],
          },
          {
            title: { en: 'Geometry', ru: 'Геометрия' },
            items: [
              { en: 'Triangle properties and congruence', ru: 'Свойства треугольников и равенство фигур' },
              { en: 'Circle properties (basic)', ru: 'Свойства окружности (базовые)' },
              { en: 'Coordinate geometry', ru: 'Координатная геометрия' },
              { en: 'Mensuration (2D and 3D)', ru: 'Измерения (2D и 3D)' },
            ],
          },
          {
            title: { en: 'Statistics and Probability', ru: 'Статистика и вероятность' },
            items: [
              { en: 'Mean, median, mode calculations', ru: 'Вычисление среднего, медианы, моды' },
              { en: 'Basic probability concepts', ru: 'Базовые понятия вероятности' },
              { en: 'Data representation methods', ru: 'Методы представления данных' },
              { en: 'Frequency distributions', ru: 'Распределения частот' },
            ],
          },
        ],
      },
      {
        title: { en: 'Section 3: Everyday Mathematics', ru: 'Раздел 3: Математика в повседневной жизни' },
        subsections: [
          {
            title: { en: 'Financial Mathematics', ru: 'Финансовая математика' },
            items: [
              { en: 'Compound interest calculations', ru: 'Расчёт сложных процентов' },
              { en: 'Percentage applications', ru: 'Применение процентов' },
              { en: 'Ratio and proportion problems', ru: 'Задачи на отношения и пропорции' },
              { en: 'Partnership and profit sharing', ru: 'Партнёрство и распределение прибыли' },
            ],
          },
          {
            title: { en: 'Advanced Time-Distance Problems', ru: 'Продвинутые задачи на время и расстояние' },
            items: [
              { en: 'Relative speed calculations', ru: 'Расчёт относительной скорости' },
              { en: 'Train and boat problems', ru: 'Задачи на поезда и лодки' },
              { en: 'Work and time applications', ru: 'Задачи на работу и время' },
              { en: 'Pipe and cistern problems', ru: 'Задачи на трубы и резервуары' },
            ],
          },
          {
            title: { en: 'Data Analysis', ru: 'Анализ данных' },
            items: [
              { en: 'Graph interpretation (line, bar, pie)', ru: 'Интерпретация графиков (линейных, столбчатых, круговых)' },
              { en: 'Statistical measures', ru: 'Статистические показатели' },
              { en: 'Data comparison techniques', ru: 'Методы сравнения данных' },
              { en: 'Survey and sampling concepts', ru: 'Понятия опроса и выборки' },
            ],
          },
          {
            title: { en: 'Practical Geometry', ru: 'Практическая геометрия' },
            items: [
              { en: 'Scale drawings and maps', ru: 'Масштабные чертежи и карты' },
              { en: 'Construction problems', ru: 'Задачи на построение' },
              { en: 'Real-world measurement applications', ru: 'Практическое применение измерений' },
              { en: 'Optimization problems', ru: 'Задачи на оптимизацию' },
            ],
          },
        ],
      },
      {
        title: { en: 'Section 4: Achievers Section', ru: 'Раздел 4: Секция для отличников' },
        subsections: [
          {
            title: { en: 'Mathematical Olympiad Problems', ru: 'Олимпиадные математические задачи' },
            items: [
              { en: 'AMC 8 level problem solving', ru: 'Решение задач уровня AMC 8' },
              { en: 'Pattern-based advanced problems', ru: 'Продвинутые задачи на закономерности' },
              { en: 'Proof writing introduction', ru: 'Введение в написание доказательств' },
              { en: 'Creative problem-solving techniques', ru: 'Творческие методы решения задач' },
            ],
          },
          {
            title: { en: 'Competition Strategy', ru: 'Стратегия участия в соревнованиях' },
            items: [
              { en: 'Advanced mental math techniques', ru: 'Продвинутые приёмы устного счёта' },
              { en: 'Time allocation strategies', ru: 'Стратегии распределения времени' },
              { en: 'Problem selection skills', ru: 'Навыки выбора задач' },
              { en: 'Verification methods', ru: 'Методы проверки решений' },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'cat3',
    title: { en: 'Category 3: Grades 9-10', ru: 'Категория 3: 9–10 классы' },
    sections: [
      {
        title: { en: 'Section 1: Logical Reasoning', ru: 'Раздел 1: Логическое мышление' },
        subsections: [
          {
            title: { en: 'Complex Logic Systems', ru: 'Сложные логические системы' },
            items: [
              { en: 'Propositional logic and truth tables', ru: 'Логика высказываний и таблицы истинности' },
              { en: 'Logical equivalences and implications', ru: 'Логические эквивалентности и импликации' },
              { en: 'Set theory applications', ru: 'Применение теории множеств' },
              { en: 'Boolean algebra basics', ru: 'Основы булевой алгебры' },
            ],
          },
          {
            title: { en: 'Advanced Puzzles', ru: 'Продвинутые головоломки' },
            items: [
              { en: 'Mathematical induction problems', ru: 'Задачи на математическую индукцию' },
              { en: 'Combinatorial puzzles', ru: 'Комбинаторные головоломки' },
              { en: 'Graph theory applications', ru: 'Применение теории графов' },
              { en: 'Game theory basics', ru: 'Основы теории игр' },
            ],
          },
          {
            title: { en: 'Problem-Solving Strategies', ru: 'Стратегии решения задач' },
            items: [
              { en: 'Working backwards technique', ru: 'Метод обратного хода' },
              { en: 'Proof by contradiction', ru: 'Доказательство от противного' },
              { en: 'Case analysis methods', ru: 'Методы разбора случаев' },
              { en: 'Extremal principle applications', ru: 'Применение принципа крайнего' },
            ],
          },
          {
            title: { en: 'Abstract Reasoning', ru: 'Абстрактное мышление' },
            items: [
              { en: 'Function analysis and properties', ru: 'Анализ и свойства функций' },
              { en: 'Recursive relationships', ru: 'Рекуррентные соотношения' },
              { en: 'Mathematical modeling basics', ru: 'Основы математического моделирования' },
              { en: 'Optimization thinking', ru: 'Оптимизационное мышление' },
            ],
          },
        ],
      },
      {
        title: { en: 'Section 2: Mathematical Reasoning', ru: 'Раздел 2: Математическое мышление' },
        subsections: [
          {
            title: { en: 'Advanced Algebra', ru: 'Продвинутая алгебра' },
            items: [
              { en: 'Quadratic equations and applications', ru: 'Квадратные уравнения и их применение' },
              { en: 'Polynomial operations and theorems', ru: 'Операции с многочленами и теоремы' },
              { en: 'Exponential and logarithmic functions', ru: 'Показательные и логарифмические функции' },
              { en: 'Sequence and series', ru: 'Последовательности и ряды' },
            ],
          },
          {
            title: { en: 'Trigonometry', ru: 'Тригонометрия' },
            items: [
              { en: 'Trigonometric ratios and identities', ru: 'Тригонометрические отношения и тождества' },
              { en: 'Height and distance problems', ru: 'Задачи на высоту и расстояние' },
              { en: 'Trigonometric equations', ru: 'Тригонометрические уравнения' },
              { en: 'Applications in geometry', ru: 'Применение в геометрии' },
            ],
          },
          {
            title: { en: 'Coordinate Geometry', ru: 'Координатная геометрия' },
            items: [
              { en: 'Straight line properties', ru: 'Свойства прямой' },
              { en: 'Circle equations and properties', ru: 'Уравнения и свойства окружности' },
              { en: 'Conic sections (basic)', ru: 'Конические сечения (базовые)' },
              { en: 'Distance and section formulas', ru: 'Формулы расстояния и деления отрезка' },
            ],
          },
          {
            title: { en: 'Advanced Number Theory', ru: 'Продвинутая теория чисел' },
            items: [
              { en: 'Diophantine equations (basic)', ru: 'Диофантовы уравнения (базовые)' },
              { en: 'Chinese Remainder Theorem', ru: 'Китайская теорема об остатках' },
              { en: "Euler's theorem applications", ru: 'Применение теоремы Эйлера' },
              { en: 'Cryptography basics', ru: 'Основы криптографии' },
            ],
          },
        ],
      },
      {
        title: { en: 'Section 3: Everyday Mathematics', ru: 'Раздел 3: Математика в повседневной жизни' },
        subsections: [
          {
            title: { en: 'Advanced Statistics', ru: 'Продвинутая статистика' },
            items: [
              { en: 'Standard deviation and variance', ru: 'Стандартное отклонение и дисперсия' },
              { en: 'Normal distribution concepts', ru: 'Понятия нормального распределения' },
              { en: 'Correlation and regression basics', ru: 'Основы корреляции и регрессии' },
              { en: 'Statistical inference introduction', ru: 'Введение в статистический вывод' },
            ],
          },
          {
            title: { en: 'Financial Applications', ru: 'Финансовые приложения' },
            items: [
              { en: 'Compound interest variations', ru: 'Варианты сложных процентов' },
              { en: 'Annuity and investment calculations', ru: 'Расчёты аннуитетов и инвестиций' },
              { en: 'EMI and loan calculations', ru: 'Расчёт кредитов и ежемесячных платежей' },
              { en: 'Stock market mathematics', ru: 'Математика фондового рынка' },
            ],
          },
          {
            title: { en: 'Practical Problem Solving', ru: 'Практическое решение задач' },
            items: [
              { en: 'Optimization in real scenarios', ru: 'Оптимизация в реальных ситуациях' },
              { en: 'Mathematical modeling projects', ru: 'Проекты по математическому моделированию' },
              { en: 'Technology integration problems', ru: 'Задачи с применением технологий' },
              { en: 'Environmental mathematics', ru: 'Экологическая математика' },
            ],
          },
          {
            title: { en: 'Advanced Measurement', ru: 'Продвинутые измерения' },
            items: [
              { en: 'Precision and accuracy concepts', ru: 'Понятия точности и погрешности' },
              { en: 'Error analysis', ru: 'Анализ ошибок' },
              { en: 'Scientific notation applications', ru: 'Применение научной нотации' },
              { en: 'Unit analysis techniques', ru: 'Методы анализа единиц измерения' },
            ],
          },
        ],
      },
      {
        title: { en: 'Section 4: Achievers Section', ru: 'Раздел 4: Секция для отличников' },
        subsections: [
          {
            title: { en: 'Olympiad Level Problems', ru: 'Задачи олимпиадного уровня' },
            items: [
              { en: 'AMC 10/12 preparation', ru: 'Подготовка к AMC 10/12' },
              { en: 'International olympiad problems (basic)', ru: 'Задачи международных олимпиад (базовые)' },
              { en: 'Proof techniques mastery', ru: 'Владение техниками доказательств' },
              { en: 'Advanced problem-solving methods', ru: 'Продвинутые методы решения задач' },
            ],
          },
          {
            title: { en: 'Research Projects', ru: 'Исследовательские проекты' },
            items: [
              { en: 'Mathematical investigation skills', ru: 'Навыки математического исследования' },
              { en: 'Historical mathematics exploration', ru: 'Изучение истории математики' },
              { en: 'Cross-disciplinary applications', ru: 'Междисциплинарные применения' },
              { en: 'Presentation and communication skills', ru: 'Навыки презентации и коммуникации' },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'cat4',
    title: { en: 'Category 4: Grades 11-12', ru: 'Категория 4: 11–12 классы' },
    sections: [
      {
        title: { en: 'Section 1: Logical Reasoning', ru: 'Раздел 1: Логическое мышление' },
        subsections: [
          {
            title: { en: 'Mathematical Logic', ru: 'Математическая логика' },
            items: [
              { en: 'Formal logic systems', ru: 'Формальные логические системы' },
              { en: 'Predicate logic and quantifiers', ru: 'Логика предикатов и кванторы' },
              { en: 'Proof theory basics', ru: 'Основы теории доказательств' },
              { en: 'Axiomatic systems', ru: 'Аксиоматические системы' },
            ],
          },
          {
            title: { en: 'Advanced Problem Analysis', ru: 'Продвинутый анализ задач' },
            items: [
              { en: 'Complexity analysis', ru: 'Анализ сложности' },
              { en: 'Algorithm design principles', ru: 'Принципы разработки алгоритмов' },
              { en: 'Recursive problem solving', ru: 'Рекурсивное решение задач' },
              { en: 'Dynamic programming concepts', ru: 'Понятия динамического программирования' },
            ],
          },
          {
            title: { en: 'Abstract Mathematical Thinking', ru: 'Абстрактное математическое мышление' },
            items: [
              { en: 'Group theory concepts', ru: 'Понятия теории групп' },
              { en: 'Field theory basics', ru: 'Основы теории полей' },
              { en: 'Linear algebra applications', ru: 'Применение линейной алгебры' },
              { en: 'Vector space properties', ru: 'Свойства векторных пространств' },
            ],
          },
          {
            title: { en: 'Research Methodology', ru: 'Методология исследования' },
            items: [
              { en: 'Mathematical conjecture formation', ru: 'Формулирование математических гипотез' },
              { en: 'Hypothesis testing in mathematics', ru: 'Проверка гипотез в математике' },
              { en: 'Literature review techniques', ru: 'Методы обзора литературы' },
              { en: 'Mathematical communication', ru: 'Математическая коммуникация' },
            ],
          },
        ],
      },
      {
        title: { en: 'Section 2: Mathematical Reasoning', ru: 'Раздел 2: Математическое мышление' },
        subsections: [
          {
            title: { en: 'Calculus Applications', ru: 'Применение анализа' },
            items: [
              { en: 'Differential calculus problems', ru: 'Задачи дифференциального исчисления' },
              { en: 'Integral calculus applications', ru: 'Применение интегрального исчисления' },
              { en: 'Optimization using calculus', ru: 'Оптимизация методами анализа' },
              { en: 'Related rates problems', ru: 'Задачи на связанные скорости' },
            ],
          },
          {
            title: { en: 'Advanced Algebra', ru: 'Продвинутая алгебра' },
            items: [
              { en: 'Matrix operations and determinants', ru: 'Операции с матрицами и определители' },
              { en: 'Complex numbers and applications', ru: 'Комплексные числа и их применение' },
              { en: 'Polynomial theory', ru: 'Теория многочленов' },
              { en: 'Abstract algebra concepts', ru: 'Понятия абстрактной алгебры' },
            ],
          },
          {
            title: { en: 'Advanced Geometry', ru: 'Продвинутая геометрия' },
            items: [
              { en: 'Analytical geometry mastery', ru: 'Владение аналитической геометрией' },
              { en: 'Vector geometry', ru: 'Векторная геометрия' },
              { en: 'Solid geometry applications', ru: 'Применение стереометрии' },
              { en: 'Non-Euclidean geometry introduction', ru: 'Введение в неевклидову геометрию' },
            ],
          },
          {
            title: { en: 'Discrete Mathematics', ru: 'Дискретная математика' },
            items: [
              { en: 'Combinatorics and permutations', ru: 'Комбинаторика и перестановки' },
              { en: 'Graph theory applications', ru: 'Применение теории графов' },
              { en: 'Network theory basics', ru: 'Основы теории сетей' },
              { en: 'Coding theory introduction', ru: 'Введение в теорию кодирования' },
            ],
          },
        ],
      },
      {
        title: { en: 'Section 3: Everyday Mathematics', ru: 'Раздел 3: Математика в повседневной жизни' },
        subsections: [
          {
            title: { en: 'Advanced Statistics and Probability', ru: 'Продвинутая статистика и вероятность' },
            items: [
              { en: 'Probability distributions', ru: 'Распределения вероятностей' },
              { en: 'Hypothesis testing', ru: 'Проверка гипотез' },
              { en: 'Regression analysis', ru: 'Регрессионный анализ' },
              { en: 'Statistical modeling', ru: 'Статистическое моделирование' },
            ],
          },
          {
            title: { en: 'Mathematical Finance', ru: 'Математические финансы' },
            items: [
              { en: 'Options and derivatives basics', ru: 'Основы опционов и деривативов' },
              { en: 'Risk analysis mathematics', ru: 'Математика анализа рисков' },
              { en: 'Portfolio optimization', ru: 'Оптимизация портфеля' },
              { en: 'Actuarial mathematics introduction', ru: 'Введение в актуарную математику' },
            ],
          },
          {
            title: { en: 'Applied Mathematics', ru: 'Прикладная математика' },
            items: [
              { en: 'Operations research techniques', ru: 'Методы исследования операций' },
              { en: 'Linear programming', ru: 'Линейное программирование' },
              { en: 'Game theory applications', ru: 'Применение теории игр' },
              { en: 'Mathematical economics', ru: 'Математическая экономика' },
            ],
          },
          {
            title: { en: 'Technology Integration', ru: 'Интеграция технологий' },
            items: [
              { en: 'Mathematical software usage', ru: 'Использование математического ПО' },
              { en: 'Computational mathematics', ru: 'Вычислительная математика' },
              { en: 'Algorithm implementation', ru: 'Реализация алгоритмов' },
              { en: 'Data science applications', ru: 'Применение data science' },
            ],
          },
        ],
      },
      {
        title: { en: 'Section 4: Achievers Section', ru: 'Раздел 4: Секция для отличников' },
        subsections: [
          {
            title: { en: 'International Competition Preparation', ru: 'Подготовка к международным соревнованиям' },
            items: [
              { en: 'IMO level problem solving', ru: 'Решение задач уровня IMO' },
              { en: 'Advanced olympiad techniques', ru: 'Продвинутые олимпиадные техники' },
              { en: 'Research problem identification', ru: 'Определение исследовательских задач' },
              { en: 'Independent mathematical exploration', ru: 'Самостоятельное математическое исследование' },
            ],
          },
          {
            title: { en: 'Career Preparation', ru: 'Подготовка к карьере' },
            items: [
              { en: 'Mathematics in various fields', ru: 'Математика в разных областях' },
              { en: 'Academic research introduction', ru: 'Введение в академические исследования' },
              { en: 'Mathematical communication skills', ru: 'Навыки математической коммуникации' },
              { en: 'Professional development planning', ru: 'Планирование профессионального развития' },
            ],
          },
        ],
      },
    ],
  },
];

const ASSESSMENT = {
  heading: { en: 'Assessment and Evaluation Framework', ru: 'Система оценивания' },
  continuous: {
    title: { en: 'Continuous Assessment (60%)', ru: 'Непрерывное оценивание (60%)' },
    items: [
      { en: 'Weekly problem-solving sessions', ru: 'Еженедельные занятия по решению задач' },
      { en: 'Monthly mock olympiads', ru: 'Ежемесячные пробные олимпиады' },
      { en: 'Project-based evaluations', ru: 'Оценка на основе проектов' },
      { en: 'Peer review activities', ru: 'Взаимное оценивание' },
    ],
  },
  periodic: {
    title: { en: 'Periodic Evaluations (40%)', ru: 'Периодические оценивания (40%)' },
    items: [
      { en: 'Quarterly comprehensive tests', ru: 'Квартальные комплексные тесты' },
      { en: 'Annual olympiad competitions', ru: 'Ежегодные олимпиадные соревнования' },
      { en: 'Portfolio assessments', ru: 'Оценка портфолио' },
      { en: 'Presentation evaluations', ru: 'Оценка презентаций' },
    ],
  },
};

export default function Tasks() {
  const [openCategory, setOpenCategory] = useState(null);
  const [lang, setLang] = useState('en');

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
      <Navbar lang={lang} />

      {/* Header Section */}
      <div className="py-12 px-2 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center mb-4">
              <LangToggle lang={lang} setLang={setLang} />
            </div>

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
              {lang === 'en' ? 'Math Tiger Olympiad Syllabus' : 'Программа математической олимпиады Tiger'}
            </h2>

            <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center">
              {lang === 'en' ? 'Comprehensive Course Structure for Grades 5-12' : 'Полная структура курса для 5–12 классов'}
            </p>
          </div>
        </div>
      </div>

      {/* Mathematics Syllabus Section */}
      <div className="px-2 pb-12">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">
            {lang === 'en' ? '📐 Mathematics Syllabus' : '📐 Программа по математике'}
          </h2>

          {CATEGORIES.map((category) => (
            <div className="mb-6" key={category.key}>
              <button
                onClick={() => toggleCategory(category.key)}
                className="w-full bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-[#0a1741]">
                    {t(category.title, lang)}
                  </h3>
                  <span className="text-3xl text-orange-500">
                    {openCategory === category.key ? '−' : '+'}
                  </span>
                </div>
              </button>

              {openCategory === category.key && (
                <div className="bg-white rounded-b-xl shadow-sm p-8 mt-2">
                  <div className="space-y-6">
                    {category.sections.map((section, sIdx) => {
                      const theme = SECTION_THEME[sIdx];
                      return (
                        <div
                          key={sIdx}
                          className={`bg-gradient-to-r ${theme.grad} p-6 rounded-lg`}
                        >
                          <h4 className={`text-xl font-bold mb-4 ${theme.title}`}>
                            {t(section.title, lang)}
                          </h4>
                          <div className="space-y-4">
                            {section.subsections.map((sub, subIdx) => (
                              <div key={subIdx}>
                                <p className="font-semibold text-gray-800 mb-2">
                                  ● {t(sub.title, lang)}
                                </p>
                                <ul className="ml-6 space-y-1 text-gray-700">
                                  {sub.items.map((item, itemIdx) => (
                                    <li key={itemIdx}>○ {t(item, lang)}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Assessment Framework */}
          <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-3xl font-bold mb-6 text-[#0a1741] text-center">
              {t(ASSESSMENT.heading, lang)}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-4 text-orange-600">
                  {t(ASSESSMENT.continuous.title, lang)}
                </h4>
                <ul className="space-y-2 text-gray-700">
                  {ASSESSMENT.continuous.items.map((item, idx) => (
                    <li key={idx}>• {t(item, lang)}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-4 text-blue-600">
                  {t(ASSESSMENT.periodic.title, lang)}
                </h4>
                <ul className="space-y-2 text-gray-700">
                  {ASSESSMENT.periodic.items.map((item, idx) => (
                    <li key={idx}>• {t(item, lang)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Footer lang={lang} />
      </div>
    </div>
  );
}
