'use client';

import { Suspense } from "react";
import ContactsContent from "./ContactsContent";
export const dynamic = 'force-dynamic';

export default function ContactsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ContactsContent />
    </Suspense>
  );
}
