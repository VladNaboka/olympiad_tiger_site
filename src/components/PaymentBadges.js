const BADGES = [
  { src: '/image/payments/visa.svg', alt: 'Visa', label: null },
  { src: '/image/payments/mastercard.svg', alt: 'Mastercard', label: null },
  { src: '/image/payments/bank-logo.svg', alt: 'Freedom Bank', label: 'Freedom Bank' },
  { src: '/image/payments/freedompay.svg', alt: 'Freedom Pay', label: 'Freedom Pay' },
];

export default function PaymentBadges({ className = '' }) {
  return (
    <div className={`flex flex-wrap items-end gap-3 ${className}`}>
      {BADGES.map((badge) => (
        <div key={badge.src} className="flex flex-col items-center gap-1">
          <img src={badge.src} alt={badge.alt} className="h-8 w-auto bg-white rounded px-2 py-1" />
          {badge.label && <span className="text-[10px] text-gray-500">{badge.label}</span>}
        </div>
      ))}
    </div>
  );
}
