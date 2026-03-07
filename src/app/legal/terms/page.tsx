import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">

      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--color-primary))] mb-2">Legal</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Terms of Service</h1>
        <p className="mt-2 text-sm text-slate-400">Last updated: 1 March 2026</p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-slate-700">

        <section>
          <p>
            These Terms of Service govern your use of Dr D's MedCare's website and services. By booking a session or using our website, you agree to these terms in full. If you do not agree, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">1. Service description</h2>
          <p>
            Dr D's MedCare provides medication education and counselling services conducted by Dr Priyanka Deventhiran, a qualified pharmacist. Services include prescription counselling, medication adherence planning, elderly care, disease awareness counselling, medication device training, and side effects counselling.
          </p>
          <p className="mt-3">
            All services are educational only. We do not diagnose medical conditions, prescribe medications, or recommend changes to any existing treatment. Our services are not a substitute for consultation with a licensed physician.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">2. Eligibility</h2>
          <p>
            Our services are available to individuals residing in India who are 18 years of age or older. By booking a session, you confirm that you meet these requirements. Sessions for minors may only be booked by a parent or legal guardian.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">3. Booking and confirmation</h2>
          <p>
            A booking is considered provisional until payment proof has been received and verified. We will confirm your session slot via WhatsApp or email within a few hours of receiving payment proof. We reserve the right to decline or reschedule a booking if the requested slot is no longer available.
          </p>
          <p className="mt-3">
            For prescription counselling sessions, you must send a clear photograph of your valid prescription via WhatsApp along with your payment proof. Sessions cannot proceed without a valid prescription.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">4. Payment</h2>
          <p>
            Payment is accepted via UPI only. Full payment is required to confirm a session. Session fees are displayed at the time of booking and are inclusive of all applicable taxes.
          </p>
          <p className="mt-3">
            Payment proof must be sent via WhatsApp to +91 90807 09332 along with your Booking ID. We will verify payment and confirm your session within a few hours.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">5. Cancellation and refund policy</h2>
          <p className="font-medium text-slate-800">
            All fees paid are non-refundable.
          </p>
          <p className="mt-2">
            If you need to reschedule, please contact us via WhatsApp at least 24 hours before your scheduled session. We will make reasonable efforts to accommodate rescheduling requests, subject to availability. Rescheduling is not guaranteed and is offered at our discretion.
          </p>
          <p className="mt-2">
            If we are unable to conduct your session due to reasons on our end, you will receive a full refund or a rescheduled session at your choice.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">6. Patient responsibilities</h2>
          <p>You agree to:</p>
          <ul className="mt-2 space-y-1 list-disc list-inside text-slate-600">
            <li>Provide accurate and complete information when booking</li>
            <li>Attend your session at the confirmed time</li>
            <li>Use our services only for lawful and personal purposes</li>
            <li>Not record sessions without prior written consent</li>
            <li>Not share session content or advice publicly without consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">7. Consent</h2>
          <p>
            By confirming a booking, you explicitly consent to receiving medication education services, acknowledge that no prescribing or diagnosis will occur, and confirm that you are not using this service for any emergency medical situation.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">8. Intellectual property</h2>
          <p>
            All content on this website including text, design, and materials shared during sessions is the intellectual property of Dr D's MedCare. You may not reproduce, distribute, or use any content for commercial purposes without prior written consent.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">9. Limitation of liability</h2>
          <p>
            To the maximum extent permitted under applicable Indian law, Dr D's MedCare shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of our services or reliance on information provided during a session. Our total liability in any circumstance shall not exceed the amount paid for the relevant session.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">10. Governing law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Chennai, Tamil Nadu.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">11. Changes to terms</h2>
          <p>
            We may update these terms from time to time. The date at the top of this page reflects the last update. Continued use of our services after changes constitutes your acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">12. Contact</h2>
          <p>
            For any queries regarding these terms, please contact us via WhatsApp or by email.
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