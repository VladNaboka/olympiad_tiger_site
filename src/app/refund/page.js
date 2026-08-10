'use client';

import LegalLayout from '../../components/LegalLayout';

export default function RefundPage() {
  return (
    <LegalLayout
      title="Refund Policy"
      updated="August 10, 2026"
    >
      <p>
        This Refund Policy applies to payments made for participation in the &quot;TIGERS
        OLYMPIAD&quot; International Olympiad through https://www.tigersedu.com and forms
        part of our{' '}
        <a href="/terms" className="text-orange-600 underline">Public Offer Agreement</a>.
      </p>

      <h2>1. Cancellation by the Organizer</h2>
      <p>
        If the Olympiad is cancelled on the initiative of IE &quot;TIGERS OLYMPIAD&quot;
        (the &quot;Contractor&quot;), 100% of the paid participation fee will be refunded
        to the Customer within 30 banking days.
      </p>

      <h2>2. Cancellation by the Participant</h2>
      <ul>
        <li>
          If you notify us more than 30 days before the Olympiad date, 100% of the
          participation fee is refunded, minus any actual transaction fees charged by the
          payment system.
        </li>
        <li>
          If you notify us less than 30 days before the Olympiad date, the fee is
          non-refundable, as it covers costs already incurred for preparation (printing
          of materials, booking of platforms/venues, awards, and merchandise).
        </li>
      </ul>

      <h2>3. How to Request a Refund</h2>
      <p>
        To request a refund, contact us at info@tigersedu.com with your order/registration
        number and the reason for cancellation. We will confirm receipt of your request
        within 2 business days.
      </p>

      <h2>4. Refund Method and Timeline</h2>
      <p>
        Approved refunds are issued using the same payment method and to the same card or
        bank details used for the original payment. Refunds are typically processed within
        30 banking days, though the exact time for funds to appear may depend on your
        bank or payment provider.
      </p>

      <h2>5. Contact</h2>
      <ul>
        <li>Organization Name: IE &quot;TIGERS OLYMPIAD&quot;</li>
        <li>Email: info@tigersedu.com</li>
        <li>Phone: +7 700 595 1000</li>
      </ul>
    </LegalLayout>
  );
}
