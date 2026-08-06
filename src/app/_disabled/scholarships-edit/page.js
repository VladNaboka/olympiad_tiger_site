// ---------------------------------------------------------------------------
// DISABLED — Scholarship photo editor UI
//
// This was a local-only tool for swapping the photos on /scholarships cards.
// It is parked here on purpose: folders starting with "_" are private in the
// Next.js App Router, so nothing in here is routed, built or served.
//
// To bring it back:
//   1. move this file to src/app/scholarships-edit/page.js
//   2. uncomment everything below (strip the leading "// " from each line)
//   3. npm run dev  ->  http://localhost:3000/scholarships-edit
//
// Both files must be restored together; the page is useless without the API.
// ---------------------------------------------------------------------------

// 'use client';
//
// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
//
// const API = '/api/dev/scholarship-image';
//
// const FILTERS = [
//   { key: 'all', label: 'All' },
//   { key: 'missing', label: 'No photo' },
//   { key: 'changed', label: 'Replaced' },
// ];
//
// export default function ScholarshipsEdit() {
//   const [schools, setSchools] = useState(null);
//   const [loadError, setLoadError] = useState('');
//   const [filter, setFilter] = useState('all');
//   const [query, setQuery] = useState('');
//   const [changed, setChanged] = useState(() => new Set());
//   const [versions, setVersions] = useState({});
//
//   useEffect(() => {
//     fetch(API)
//       .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
//       .then((d) => setSchools(d.schools))
//       .catch(() =>
//         setLoadError(
//           'Could not reach the editor API. This page only works with `npm run dev` running locally.'
//         )
//       );
//   }, []);
//
//   const onSaved = useCallback((school) => {
//     setSchools((prev) => prev.map((s) => (s.id === school.id ? school : s)));
//     setChanged((prev) => new Set(prev).add(school.id));
//     setVersions((prev) => ({ ...prev, [school.id]: Date.now() }));
//   }, []);
//
//   const visible = useMemo(() => {
//     if (!schools) return [];
//     const q = query.trim().toLowerCase();
//     return schools.filter((s) => {
//       if (filter === 'missing' && s.carousel.length > 0) return false;
//       if (filter === 'changed' && !changed.has(s.id)) return false;
//       if (q && !s.companyName.toLowerCase().includes(q)) return false;
//       return true;
//     });
//   }, [schools, filter, query, changed]);
//
//   const missingCount = schools ? schools.filter((s) => s.carousel.length === 0).length : 0;
//
//   return (
//     <div className="min-h-screen bg-[#fffbf2]">
//       <header className="sticky top-0 z-10 bg-[#fffbf2]/95 backdrop-blur border-b border-orange-200">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
//             <h1 className="text-2xl font-bold text-gray-900">Scholarship photos</h1>
//             <span className="text-sm text-gray-500">
//               dev-only editor — writes straight into the repo
//             </span>
//           </div>
//
//           <div className="flex flex-wrap items-center gap-3 mt-3">
//             <div className="flex gap-1 bg-white rounded-full p-1 border border-orange-200">
//               {FILTERS.map((f) => (
//                 <button
//                   key={f.key}
//                   onClick={() => setFilter(f.key)}
//                   className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
//                     filter === f.key
//                       ? 'bg-orange-500 text-white'
//                       : 'text-gray-600 hover:bg-orange-50'
//                   }`}
//                 >
//                   {f.label}
//                   {f.key === 'missing' && missingCount > 0 && ` (${missingCount})`}
//                   {f.key === 'changed' && changed.size > 0 && ` (${changed.size})`}
//                 </button>
//               ))}
//             </div>
//
//             <input
//               type="search"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search by name…"
//               className="flex-1 min-w-[200px] max-w-sm border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
//             />
//
//             {schools && (
//               <span className="text-sm text-gray-500">
//                 {visible.length} of {schools.length}
//               </span>
//             )}
//           </div>
//         </div>
//       </header>
//
//       <main className="container mx-auto px-4 py-6">
//         {loadError && (
//           <p className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3">
//             {loadError}
//           </p>
//         )}
//
//         {!schools && !loadError && <p className="text-gray-500">Loading…</p>}
//
//         {schools && visible.length === 0 && (
//           <p className="text-gray-500">Nothing matches this filter.</p>
//         )}
//
//         <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
//           {visible.map((school) => (
//             <SchoolRow
//               key={school.id}
//               school={school}
//               version={versions[school.id]}
//               wasChanged={changed.has(school.id)}
//               onSaved={onSaved}
//             />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }
//
// function SchoolRow({ school, version, wasChanged, onSaved }) {
//   const [url, setUrl] = useState('');
//   const [busy, setBusy] = useState(false);
//   const [error, setError] = useState('');
//   const [dragging, setDragging] = useState(false);
//   const fileInput = useRef(null);
//
//   const image = school.carousel[0];
//   const preview = image ? (version ? `${image}?v=${version}` : image) : null;
//   const searchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
//     school.companyName + ' campus'
//   )}`;
//
//   async function send(init) {
//     setBusy(true);
//     setError('');
//     try {
//       const res = await fetch(API, init);
//       const data = await res.json().catch(() => ({}));
//       if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
//       onSaved(data.school);
//       setUrl('');
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setBusy(false);
//     }
//   }
//
//   const saveUrl = () => {
//     if (!url.trim()) return;
//     send({
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id: school.id, url }),
//     });
//   };
//
//   const saveFile = (file) => {
//     const form = new FormData();
//     form.append('id', String(school.id));
//     form.append('file', file);
//     send({ method: 'POST', body: form });
//   };
//
//   const clear = () =>
//     send({
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id: school.id, action: 'clear' }),
//     });
//
//   return (
//     <div
//       onDragOver={(e) => {
//         e.preventDefault();
//         setDragging(true);
//       }}
//       onDragLeave={() => setDragging(false)}
//       onDrop={(e) => {
//         e.preventDefault();
//         setDragging(false);
//         const file = e.dataTransfer.files?.[0];
//         if (file) saveFile(file);
//       }}
//       className={`bg-white rounded-xl border p-3 flex gap-3 transition-colors ${
//         dragging ? 'border-orange-400 bg-orange-50' : 'border-gray-200'
//       }`}
//     >
//       <button
//         type="button"
//         onClick={() => fileInput.current?.click()}
//         title="Click to pick a file"
//         className="shrink-0 w-28 h-28 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center"
//       >
//         {preview ? (
//           <img src={preview} alt="" className="w-full h-full object-cover" />
//         ) : (
//           <span className="text-xs text-gray-400 px-2 text-center">no photo</span>
//         )}
//       </button>
//       <input
//         ref={fileInput}
//         type="file"
//         accept="image/jpeg,image/png,image/webp"
//         className="hidden"
//         onChange={(e) => {
//           const file = e.target.files?.[0];
//           if (file) saveFile(file);
//           e.target.value = '';
//         }}
//       />
//
//       <div className="flex-1 min-w-0">
//         <div className="flex items-baseline gap-2">
//           <p className="font-semibold text-gray-900 text-sm leading-snug">{school.companyName}</p>
//           <span className="text-xs text-gray-400 shrink-0">#{school.id}</span>
//         </div>
//
//         <div className="flex gap-3 mt-1 text-xs">
//           <a
//             href={school.website}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-gray-500 hover:text-orange-600 truncate"
//           >
//             {school.website.replace(/^https?:\/\/(www\.)?/, '')} ↗
//           </a>
//           <a
//             href={searchUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-orange-500 hover:text-orange-600 font-semibold shrink-0"
//           >
//             Images ↗
//           </a>
//         </div>
//
//         <div className="flex gap-2 mt-2">
//           <input
//             type="text"
//             value={url}
//             disabled={busy}
//             onChange={(e) => setUrl(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && saveUrl()}
//             placeholder="Paste image URL, or drop a file"
//             className="flex-1 min-w-0 border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
//           />
//           <button
//             onClick={saveUrl}
//             disabled={busy || !url.trim()}
//             className="px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//           >
//             {busy ? '…' : 'Save'}
//           </button>
//         </div>
//
//         <div className="flex items-center gap-3 mt-1.5 min-h-[16px]">
//           {error && <span className="text-xs text-red-600 leading-tight">{error}</span>}
//           {!error && wasChanged && <span className="text-xs text-green-600">✓ replaced</span>}
//           {image && !busy && (
//             <button
//               onClick={clear}
//               className="text-xs text-gray-400 hover:text-red-600 ml-auto shrink-0"
//             >
//               remove photo
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
//
