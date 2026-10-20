'use client';

import LegalLayout from '../../components/LegalLayout';
import { useLanguage } from '../../context/LanguageContext';

function EnglishContent() {
  return (
    <>
      <p>
        This Refund Policy applies to payments made for participation in the &quot;TIGERS
        OLYMPIAD&quot; International Olympiad through https://www.tigersedu.com and forms
        part of our{' '}
        <a href="/terms" className="text-orange-600 underline">Public Offer Agreement</a>.
      </p>

      <h2>1. Cancellation by the Organizer</h2>
      <p>
        If the Olympiad is cancelled on the initiative of Individual Entrepreneur &quot;TIGERS OLYMPIAD&quot;
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
        <li>Name: Individual Entrepreneur &quot;TIGERS OLYMPIAD&quot;</li>
        <li>Email: info@tigersedu.com</li>
        <li>Phone: +7 700 595 1000</li>
      </ul>
    </>
  );
}

function RussianContent() {
  return (
    <>
      <p>
        Настоящая Политика возврата денежных средств применяется к платежам за участие в
        международной олимпиаде «TIGERS OLYMPIAD» через сайт https://www.tigersedu.com и
        является частью нашей{' '}
        <a href="/terms" className="text-orange-600 underline">Публичной оферты</a>.
      </p>

      <h2>1. Отмена олимпиады по инициативе организатора</h2>
      <p>
        В случае отмены Олимпиады по инициативе ИП «TIGERS OLYMPIAD» («Исполнитель»),
        Заказчику возвращается 100% уплаченных денежных средств в течение 30 банковских
        дней.
      </p>

      <h2>2. Отказ участника от участия</h2>
      <ul>
        <li>
          При уведомлении более чем за 30 дней до даты проведения Олимпиады — возвращается
          100% стоимости за вычетом фактических комиссий платежных систем.
        </li>
        <li>
          При уведомлении менее чем за 30 дней до начала — денежные средства не
          возвращаются, так как идут на покрытие фактически понесенных расходов на
          подготовку (печать материалов, бронирование платформ/площадок, наградная
          продукция).
        </li>
      </ul>

      <h2>3. Как оформить возврат</h2>
      <p>
        Чтобы запросить возврат, напишите нам на info@tigersedu.com, указав номер
        заказа/регистрации и причину отказа. Мы подтвердим получение запроса в течение 2
        рабочих дней.
      </p>

      <h2>4. Способ и сроки возврата</h2>
      <p>
        Одобренные возвраты выполняются тем же способом и на те же реквизиты/карту, с
        которых была произведена оплата. Возврат обычно осуществляется в течение 30
        банковских дней, точный срок поступления средств может зависеть от вашего банка
        или платежного провайдера.
      </p>

      <h2>5. Контакты</h2>
      <ul>
        <li>Наименование: ИП «TIGERS OLYMPIAD»</li>
        <li>Email: info@tigersedu.com</li>
        <li>Телефон: +7 700 595 1000</li>
      </ul>
    </>
  );
}

export default function RefundPage() {
  const { lang } = useLanguage();

  return (
    <LegalLayout
      title={lang === 'en' ? 'Refund Policy' : 'Политика возврата денежных средств'}
      updated={lang === 'en' ? 'Last updated: August 10, 2026' : 'Дата последнего обновления: 10.08.2026'}
    >
      {lang === 'en' ? <EnglishContent /> : <RussianContent />}
    </LegalLayout>
  );
}
