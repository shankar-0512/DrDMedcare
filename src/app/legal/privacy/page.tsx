import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: '/legal/privacy' },
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">

      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--color-primary))] mb-2">Legal</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-400">Last updated: 1 March 2026</p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-slate-700">

        <section>
          <p>
            Dr D's MedCare ("we", "our", "us") is committed to protecting the privacy of our patients and website visitors. This policy explains what information we collect, how we use it, and your rights under the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">1. Information we collect</h2>
          <p>When you book a session, we collect:</p>
          <ul className="mt-2 space-y-1 list-disc list-inside text-slate-600">
            <li>Full name, age, and gender</li>
            <li>Mobile phone number</li>
            <li>Email address (optional)</li>
            <li>Address</li>
            <li>Preferred session language</li>
            <li>Service type and session details</li>
            <li>Payment reference information</li>
          </ul>
          <p className="mt-3">
            For prescription counselling, you may also share a copy of your prescription via WhatsApp. This is used solely for the purpose of your session and is not stored beyond what is necessary.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">2. How we use your information</h2>
          <p>We use your information solely to:</p>
          <ul className="mt-2 space-y-1 list-disc list-inside text-slate-600">
            <li>Process and confirm your booking</li>
            <li>Conduct your medication counselling session</li>
            <li>Communicate with you about your session via WhatsApp or email</li>
            <li>Verify payment and maintain booking records</li>
            <li>Comply with applicable legal obligations</li>
          </ul>
          <p className="mt-3">
            We do not use your information for marketing purposes, and we do not sell, rent, or share your personal information with third parties for any commercial purpose.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">3. Sensitive personal data</h2>
          <p>
            Health-related information you share during a session is considered Sensitive Personal Data or Information (SPDI) under Indian law. We handle such information with strict confidentiality and use it only for the purpose of your session. It is not disclosed to any third party without your explicit consent, except as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">4. Payment information</h2>
          <p>
            Payments are made directly via UPI. We collect only the UPI transaction reference number for verification purposes. We do not collect or store your bank account details, UPI PIN, or any other payment credentials.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">5. WhatsApp and email communication</h2>
          <p>
            When you communicate with us via WhatsApp or email, those communications may be retained for the purposes of confirming bookings, maintaining session records, and resolving disputes. WhatsApp communications are subject to WhatsApp's own privacy policy. We recommend you do not share sensitive financial information over WhatsApp beyond what is necessary for payment verification.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">6. Data storage and security</h2>
          <p>
            Your booking information is stored securely using Supabase, a cloud database provider. We implement reasonable security practices as required under Indian law to protect your personal data from unauthorised access, disclosure, or loss. However, no method of electronic storage is 100% secure and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">7. Data retention</h2>
          <p>
            We retain your booking and session records for a period of three years from the date of your last session, after which they are securely deleted. You may request earlier deletion of your data subject to any applicable legal retention requirements.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">8. Your rights</h2>
          <p>You have the right to:</p>
          <ul className="mt-2 space-y-1 list-disc list-inside text-slate-600">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your data (subject to legal obligations)</li>
            <li>Withdraw consent for processing where consent was the basis</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, please contact us via WhatsApp at +91 90807 09332 or by email.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">9. Cookies</h2>
          <p>
            Our website uses only essential cookies required for the booking system to function. We do not use tracking, advertising, or analytics cookies.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">10. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The date at the top of this page reflects when it was last updated. Continued use of our services after any changes constitutes your acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">11. Contact</h2>
          <p>
            For any privacy-related queries, please contact Dr Priyanka Deventhiran via WhatsApp at +91 90807 09332 or by email. We will respond within 7 working days.
          </p>
        </section>

      </div>

      <div className="mt-12 flex gap-4 text-xs text-slate-400 border-t border-slate-200 pt-6">
        <Link href="/legal/disclaimer" className="hover:text-slate-600 transition-colors">Disclaimer</Link>
        <Link href="/legal/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
        <Link href="/legal/terms" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
      </div>

    </main>
  )
}