type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  featured?: boolean
  cover: string
}

export type { BlogPost }
export const POSTS: BlogPost[] = [
  {
    slug: 'apixaban-india',
    cover: 'Blood thinners',
    title: 'Apixaban: Dose, Interactions, and Contraindications Every Patient Should Know',
    excerpt: "Apixaban is one of the most widely prescribed blood thinners in India. No INR monitoring needed - but the dose, the interactions, and the contraindications matter just as much as they did with warfarin.",
    category: 'Education',
    readTime: '8 min read',
    date: 'July 2026',
    featured: true,
  },
  {
    slug: 'myasthenia-gravis-india',
    cover: 'Autoimmune care',
    title: 'Myasthenia Gravis: Understanding the Disease, the Treatment, and the Medicines to Avoid',
    excerpt: "MG is a rare autoimmune disease where muscle weakness is unpredictable, and where a common antibiotic or antacid can trigger a crisis. Here is what every patient and carer needs to know.",
    category: 'Education',
    readTime: '7 min read',
    date: 'June 2026',
  },
  {
    slug: 'how-to-use-blood-pressure-monitors-at-home-a-guide-for-beginners',
    cover: 'Home monitoring',
    title: 'How to Use Blood Pressure Monitors at Home: A Guide for Beginners',
    excerpt: 'Monitoring your blood pressure at home is a simple yet powerful way to take control of your heart health. With the right device and technique, you can track readings regularly and share them with your doctor for better management.',
    category: 'Education',
    readTime: '4 min read',
    date: 'April 2026',
  },
  {
    slug: 'meningitis-symptoms-india',
    cover: 'Warning signs',
    title: 'Meningitis: warning signs every Indian family must know',
    excerpt: "Bacterial meningitis can become life-threatening within 24 hours. Here's how to recognise it early, what to do, and which vaccines are available in India.",
    category: 'Education',
    readTime: '6 min read',
    date: 'March 2026',
  },
  {
    slug: 'drug-food-interactions-india',
    cover: 'Food and medicine',
    title: 'Common drug-food interactions every Indian patient should know',
    excerpt: 'Dal, milk, banana, tea - everyday foods that can silently reduce or amplify the effect of your medicines.',
    category: 'Education',
    readTime: '6 min read',
    date: 'March 2026',
  },
  {
    slug: 'why-you-must-finish-antibiotics',
    cover: 'Antibiotics',
    title: 'Why stopping antibiotics midway is dangerous',
    excerpt: "Feeling better doesn't mean the infection is gone. Here's what actually happens when you stop your course early.",
    category: 'Education',
    readTime: '5 min read',
    date: 'March 2026',
  },
  {
    slug: 'clinical-pharmacist-vs-pharmacist',
    cover: 'Know your pharmacist',
    title: "Clinical pharmacist vs pharmacist - what's the difference and why does it matter?",
    excerpt: "Both work with medicines - but their roles, training, and what they can do for you are very different. Here's a clear breakdown.",
    category: 'Awareness',
    readTime: '5 min read',
    date: 'March 2026',
  },
  {
    slug: 'healthcare-professionals-india',
    cover: 'Your care team',
    title: 'Who does what in Indian healthcare - a simple guide',
    excerpt: "Doctor, specialist, pharmacist, clinical pharmacist, medication counsellor, nurse, physiotherapist, dietitian, lab technician and ASHA worker - each plays a distinct and important role.",
    category: 'Awareness',
    readTime: '4 min read',
    date: 'March 2026',
  },
  {
    slug: 'why-i-started-drd-medcare',
    cover: 'My story',
    title: "Why I started Dr D's MedCare",
    excerpt: 'A child died because nobody warned a mother about mixing cough syrup with milk. That moment changed everything for me.',
    category: 'Our story',
    readTime: '4 min read',
    date: 'March 2026',
  },
]
