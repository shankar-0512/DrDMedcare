import Link from 'next/link'

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">

      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--color-primary))] mb-2">Legal</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Disclaimer</h1>
        <p className="mt-2 text-sm text-slate-400">Last updated: 1 March 2026</p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-slate-700">

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="font-semibold text-amber-800 mb-1">Important — please read carefully</p>
          <p className="text-amber-700">
            Dr D's MedCare provides medication education and counselling services only. We do not diagnose, prescribe, or alter any treatment. Nothing on this website or in any session constitutes medical advice.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">1. Nature of service</h2>
          <p>
            Dr D's MedCare is a medication counselling and education service operated by Dr Priyanka Deventhiran, a qualified pharmacist. All services are educational in nature and are intended to help patients understand their existing prescriptions, medication regimens, and related health information.
          </p>
          <p className="mt-3">
            Our services are not a substitute for professional medical advice, diagnosis, or treatment from a licensed physician or healthcare provider. Always seek the advice of your doctor or another qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">2. No prescribing or diagnosis</h2>
          <p>
            Dr D's MedCare does not prescribe medications, diagnose medical conditions, or recommend changes to any existing treatment plan. Any information provided during a session is for educational purposes only and must not be interpreted as a prescription or clinical recommendation.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">3. Not for emergencies</h2>
          <p>
            Our services are not designed or intended for medical emergencies. If you are experiencing a medical emergency, please call 112 (India emergency services) or go to your nearest hospital immediately. Do not use this website or attempt to contact us in an emergency situation.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">4. India only</h2>
          <p>
            Our services are currently available to residents of India only. The information provided is based on Indian drug regulations, schedules, and standard of care. It may not be applicable or accurate for patients in other countries.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">5. Accuracy of information</h2>
          <p>
            While we make every effort to ensure the accuracy of information provided, medication guidelines, drug interactions, and clinical recommendations are subject to change. Always verify information with your treating physician or pharmacist before making any decisions about your medication.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">6. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by applicable law, Dr D's MedCare, its operators, and affiliates shall not be liable for any loss, injury, or damage arising from your use of or reliance on any information provided through our services. Your use of our services is entirely at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">7. Contact</h2>
          <p>
            If you have any questions about this disclaimer, please contact us via WhatsApp at +91 90807 09332 or by email.
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