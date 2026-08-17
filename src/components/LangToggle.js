export default function LangToggle({ lang, setLang }) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-full p-1 shrink-0 self-start">
      {['en', 'ru'].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
            lang === code ? 'bg-orange-500 text-white' : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
