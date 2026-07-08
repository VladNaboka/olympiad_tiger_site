// Админ-панель не должна индексироваться поисковиками и кэшироваться.
export const metadata = {
  title: "Admin — Tigers Olympiad",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

// Отключаем статическое кэширование: страница всегда рендерится динамически.
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }) {
  return children;
}
