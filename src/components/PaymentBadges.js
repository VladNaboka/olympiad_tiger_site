export default function PaymentBadges({ className = '' }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <img src="/image/payments/visa.svg" alt="Visa" className="h-8 w-auto bg-white rounded px-2 py-1" />
      <img src="/image/payments/mastercard.svg" alt="Mastercard" className="h-8 w-auto bg-white rounded px-2 py-1" />
      <img src="/image/payments/bank-logo.svg" alt="Issuing Bank" className="h-8 w-auto bg-white rounded px-2 py-1" />
      <img src="/image/payments/freedompay.svg" alt="FreedomPay" className="h-8 w-auto bg-white rounded px-2 py-1" />
    </div>
  );
}
