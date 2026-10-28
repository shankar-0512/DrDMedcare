import type { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = {
  alternates: {
    canonical: '/legal/disclaimer',
    languages: { 'en-IN': '/legal/disclaimer' },
  },
}

export default function DisclaimerPage() {
  return (
    <LegalLayout current="disclaimer" updated="1 March 2026">

        <section className="rounded-[2rem] border-2 border-amber-200 bg-amber-50 p-6">
          <p className="font-semibold text-amber-800 mb-1">Important - please read carefully</p>
          <p className="text-amber-700">
            Dr D&apos;s MedCare provides medication education and counselling services only. We do not diagnose, prescribe, or alter any treatment. Nothing on this website or in any session constitutes medical advice.
          </p>
        </section>

        <section>
          <h2>1. Nature of service</h2>
          <p>
            Dr D&apos;s MedCare is a medication counselling and education service operated by Dr Priyanka Deventhiran, a qualified pharmacist. All services are educational in nature and are intended to help patients understand their existing prescriptions, medication regimens, and related health information.
          </p>
          <p className="mt-3">
            Our services are not a substitute for professional medical advice, diagnosis, or treatment from a licensed physician or healthcare provider. Always seek the advice of your doctor or another qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </section>

        <section>
          <h2>2. No prescribing or diagnosis</h2>
          <p>
            Dr D&apos;s MedCare does not prescribe medications, diagnose medical conditions, or recommend changes to any existing treatment plan. Any information provided during a session is for educational purposes only and must not be interpreted as a prescription or clinical recommendation.
          </p>
        </section>

        <section>
          <h2>3. Not for emergencies</h2>
          <p>
            Our services are not designed or intended for medical emergencies. If you are experiencing a medical emergency, please call 112 (India emergency services) or go to your nearest hospital immediately. Do not use this website or attempt to contact us in an emergency situation.
          </p>
        </section>

        <section>
          <h2>4. India only</h2>
          <p>
            Our services are currently available to residents of India only. The information provided is based on Indian drug regulations, schedules, and standard of care. It may not be applicable or accurate for patients in other countries.
          </p>
        </section>

        <section>
          <h2>5. Accuracy of Information</h2>
          <p>
            While we make every effort to ensure the information provided is accurate and up to date, medication guidelines, drug interactions, and clinical recommendations are subject to change. Dr D&apos;s MedCare is not responsible for any decisions made based on the information provided through our services. Always consult your treating physician before making any changes to your medication or treatment plan.
          </p>
        </section>

        <section>
          <h2>6. Limitation of Liability</h2>
          <p>
            The information provided through Dr D&apos;s MedCare is for educational purposes only and does not constitute medical advice, diagnosis, or treatment. It is not a substitute for consultation with a licensed physician or qualified healthcare professional. Always consult your doctor before making any changes to your medication or treatment plan.
          </p>
          <p className="mt-3">
            To the fullest extent permitted by applicable law, Dr D&apos;s MedCare, its operators, and affiliates shall not be liable for any loss, injury, or damage - direct or indirect - arising from your use of or reliance on any information provided through our services, regardless of how that information was used or applied. Your use of our services is entirely at your own risk.
          </p>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p>
            If you have any questions about this disclaimer, please contact us via WhatsApp at +91 90807 09332 or by email.
          </p>
        </section>

      
    </LegalLayout>
  )
}
