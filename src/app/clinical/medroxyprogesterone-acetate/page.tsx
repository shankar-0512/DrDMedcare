import type { Metadata } from 'next'
import MonographClient from './MonographClient'

export const metadata: Metadata = {
  title: "Medroxyprogesterone Acetate — Clinical Monograph | Dr D's MedCare",
  description: 'Comprehensive clinical drug monograph for medroxyprogesterone acetate (MPA). For qualified healthcare professionals only.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <MonographClient />
}
