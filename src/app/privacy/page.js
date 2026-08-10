'use client';

import LegalLayout from '../../components/LegalLayout';

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="August 10, 2026"
    >
      <p>
        This Privacy Policy describes how IE &quot;TIGERS OLYMPIAD&quot; (&quot;we&quot;,
        &quot;us&quot;, the &quot;Contractor&quot;) collects, uses, and protects personal
        data submitted through https://www.tigersedu.com in connection with registration
        for the &quot;TIGERS OLYMPIAD&quot; International Olympiad.
      </p>

      <h2>1. Data We Collect</h2>
      <p>When you register for the Olympiad we collect:</p>
      <ul>
        <li>Full name of the participant and/or their legal representative;</li>
        <li>Email address;</li>
        <li>Phone number;</li>
        <li>Selected olympiad category (e.g. Math, Art);</li>
        <li>Payment confirmation data provided by our payment service provider (we do not collect or store full card numbers — payment is processed on the payment provider&apos;s secure page).</li>
      </ul>

      <h2>2. Purpose of Processing</h2>
      <p>Personal data is processed in order to:</p>
      <ul>
        <li>Register the participant for the Olympiad and process payment of the participation fee;</li>
        <li>Send a registration confirmation and payment receipt by email;</li>
        <li>Communicate with the participant/representative about the Olympiad (schedule, results, certificates);</li>
        <li>Publish results and photo/video reports of the Olympiad;</li>
        <li>Comply with legal and accounting obligations.</li>
      </ul>

      <h2>3. Legal Basis</h2>
      <p>
        By completing the registration form and/or making payment on our website, you
        provide your consent to the processing of personal data described in this Policy,
        which also constitutes acceptance of our{' '}
        <a href="/terms" className="text-orange-600 underline">Public Offer Agreement</a>.
      </p>

      <h2>4. Data Sharing</h2>
      <p>
        We do not sell or rent personal data. Data may be shared only with:
      </p>
      <ul>
        <li>Our payment service provider, solely to process the payment transaction;</li>
        <li>Country representatives/coordinators involved in organizing the Olympiad in your region, where applicable;</li>
        <li>Government authorities, where required by applicable law.</li>
      </ul>

      <h2>5. Data Storage and Security</h2>
      <p>
        Personal data is stored on secure servers with restricted access and is retained
        only for as long as necessary to fulfill the purposes described above or as
        required by law. We take reasonable technical and organizational measures to
        protect personal data against unauthorized access, loss, or disclosure.
      </p>

      <h2>6. Your Rights</h2>
      <p>You may, at any time, request to:</p>
      <ul>
        <li>Access the personal data we hold about you;</li>
        <li>Correct inaccurate data;</li>
        <li>Request deletion of your data, subject to our legal and accounting retention obligations;</li>
        <li>Withdraw consent for future communications.</li>
      </ul>
      <p>
        To exercise these rights, contact us at info@tigersedu.com.
      </p>

      <h2>7. Cookies</h2>
      <p>
        Our website may use cookies and similar technologies to ensure basic site
        functionality and to understand how the site is used. You can control cookies
        through your browser settings.
      </p>

      <h2>8. Contact Information</h2>
      <ul>
        <li>Organization Name: IE &quot;TIGERS OLYMPIAD&quot;</li>
        <li>Country of registration: Republic of Kazakhstan</li>
        <li>Legal Address: Shymkent, 15th microdistrict, house 2, office 22, Republic of Kazakhstan</li>
        <li>Email: info@tigersedu.com</li>
        <li>Phone: +7 700 595 1000</li>
      </ul>
    </LegalLayout>
  );
}
