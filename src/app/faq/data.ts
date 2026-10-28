export type FAQItem = { q: string; a: string }
export type FAQCategory = { title: string; items: FAQItem[] }

export const FAQ_DATA: FAQCategory[] = [
  {
    title: 'About the service',
    items: [
      { q: 'What exactly is medication counselling?', a: 'Medication counselling is a focused session where I explain your medicines to you clearly - what each one does, how and when to take it, what side effects to watch for, and what foods or other medicines to avoid. It fills the gap that a 5-minute doctor consultation simply cannot.' },
      { q: 'Is this the same as seeing a doctor?', a: 'No. I am a clinical pharmacist, not a prescribing doctor. I will not diagnose conditions, change your prescription, or alter your dosage. All medical decisions remain with your doctor. This is purely education and counselling about medicines you have already been prescribed.' },
      { q: "Can you prescribe medicines or change my dosage?", a: "No - and this is important. Dr D's MedCare is an education-only service. I don't write prescriptions, change dosages, or stop or start medicines. If you need a dosage change, please contact your doctor." },
      { q: "Why doesn't my doctor or pharmacist already do this?", a: 'In western countries like the UK, US, Australia and Canada, dedicated medication counselling is a standard part of every pharmacy visit. In India, that system doesn\'t exist at scale yet - doctors are overworked, consultations average 5 minutes, and pharmacists are focused on dispensing. Dr D\'s MedCare exists to fill exactly that gap.' },
      { q: 'Is this service available outside India?', a: "Currently, Dr D's MedCare is available for patients in India only." },
    ],
  },
  {
    title: 'Before your session',
    items: [
      { q: 'Do I need a prescription to book?', a: 'For prescription counselling sessions, yes - you will need to share your prescription via WhatsApp before your session. For medication adherence planning, a prescription is helpful but not always required.' },
      { q: 'What languages are sessions available in?', a: 'Sessions are available in Tamil, English, Telugu and Hindi. Please mention your preferred language when booking.' },
      { q: "Who is this service for?", a: "Dr D's MedCare is especially helpful for elderly patients managing multiple medicines, parents of young children on medications, patients with chronic conditions like diabetes or hypertension, caregivers managing medicines for a family member, and anyone who wants to understand their prescription better before starting a new medicine." },
      { q: 'Is this service for emergencies?', a: 'No. This is not an emergency service. If you or someone around you is experiencing a medical emergency, please call 112 or go to your nearest hospital immediately.' },
    ],
  },
  {
    title: 'Sessions & booking',
    items: [
      { q: 'How does booking work?', a: 'Choose your service type and plan on the booking page, pick a preferred slot, and fill in your details. Once your booking is created, send payment proof on WhatsApp. I will confirm your slot after payment is verified - usually within a few hours.' },
      { q: 'How is the session conducted?', a: 'Sessions are conducted over a phone or video call, depending on your preference. You will receive the call details after your booking is confirmed.' },
      { q: 'What is the difference between the 15-minute and 30-minute sessions?', a: 'The 15-minute Quick Consult is ideal for a single focused question - understanding one medicine, checking one interaction, or a quick clarification. The 30-minute Full Session covers your entire prescription or a more detailed review of multiple medicines and interactions.' },
      { q: 'What is the monthly plan?', a: 'The monthly plan is designed for patients who need ongoing support - typically those on long-term or chronic medications. It includes regular check-ins to review adherence, discuss any new symptoms or concerns, and adjust the medication schedule if needed.' },
    ],
  },
  {
    title: 'Payment & privacy',
    items: [
      { q: 'How do I pay?', a: 'Payment is accepted via UPI or bank transfer. After creating your booking, you will receive payment details. Send your payment screenshot on WhatsApp along with your Booking ID, and I will confirm your session.' },
      { q: 'Is my prescription and health information kept private?', a: 'Yes. Any information you share - prescriptions, health history, personal details - is used only for your counselling session and is kept strictly confidential. It is never shared with third parties.' },
      { q: 'What if I need to reschedule?', a: 'If you need to reschedule, please message on WhatsApp as early as possible. I will do my best to accommodate a new slot.' },
    ],
  },
]
