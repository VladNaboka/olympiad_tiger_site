'use client';

import { useState } from 'react';
import Image from 'next/image';
import { safeImageUrl } from '../utils/safeUrl';

// Единственная реально существующая заглушка в public/image.
// (Раньше часть мест подставляла artwork-placeholder.png, которого нет, —
// на битой картинке это давало второй 404 вместо запасного изображения.)
const FALLBACK = '/image/artwork-sample.png';

/**
 * Превью работы из R2.
 *
 * Бэкенд хранит оригиналы в полном разрешении, поэтому обычный <img> тянул
 * мегабайты ради карточки в пару сотен пикселей. next/image режет картинку под
 * реальный размер и отдаёт WebP/AVIF, кэшируя результат.
 *
 * Пока картинка грузится, поверх показывается пульсирующий плейсхолдер —
 * первый (холодный) запрос к R2 занимает до секунды, и без индикатора
 * карточка выглядит пустой/сломанной.
 *
 * Родитель должен иметь position: relative и заданную высоту — картинка
 * растягивается по нему (fill).
 *
 * @param {string} src - file_path из API (может быть пустым/небезопасным)
 * @param {string} alt
 * @param {string} sizes - ширина карточки по брейкпоинтам, чтобы Next выбрал
 *   подходящий размер, а не 100vw
 */
export default function ArtworkImage({
  src,
  alt,
  sizes,
  className = 'object-cover',
  fallback = FALLBACK,
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const url = failed ? fallback : safeImageUrl(src, fallback);

  return (
    <>
      {/* Индикатор загрузки: пульсирующая заливка + спиннер поверх места
          картинки. Убираем, как только сработал onLoad (в т.ч. из кэша). */}
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100 animate-pulse">
          <div className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-orange-500 animate-spin"></div>
        </div>
      )}
      <Image
        src={url}
        alt={alt || ''}
        fill
        sizes={sizes}
        // Плавное проявление, чтобы картинка не «моргала» после плейсхолдера.
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          // На битой картинке всё равно снимаем индикатор — покажется заглушка.
          setFailed(true);
          setLoaded(true);
        }}
      />
    </>
  );
}
