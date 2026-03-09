import type { Metadata } from 'next'
import PILClient from './PILClient'

export const metadata: Metadata = {
  description: 'Patient information leaflet for medroxyprogesterone tablets. What it is used for, how to take it, side effects, storage, and lifestyle tips.',
  robots: { index: true, follow: true },
}

export default function Page() {
  return <PILClient />
}
