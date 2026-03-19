import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '../public/og')

const logoBase64 = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, '../public/logo.png')).toString('base64')

// ─── Shared helpers ───────────────────────────────────────────────────────────

function base(bgColor, accentColor, badgeBg, badgeText, category, title, subtitle, authorLine, decorHtml) {
  return /* html */`
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    font-family: 'Inter', system-ui, sans-serif;
    background: ${bgColor};
  }
</style>
</head>
<body>
${decorHtml}
<div style="position:absolute;inset:0;display:flex;flex-direction:column;padding:56px 72px;justify-content:space-between;">

  <!-- Top: brand -->
  <div style="display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;font-weight:800;color:${accentColor};letter-spacing:-0.3px;">Dr D's MedCare</span>
    <span style="color:#cbd5e1;font-size:18px;">·</span>
    <span style="font-size:16px;color:#64748b;font-weight:500;">Blog</span>
  </div>

  <!-- Middle: badge + title + subtitle -->
  <div style="display:flex;flex-direction:column;gap:16px;max-width:680px;">
    <div style="display:inline-flex;align-items:center;gap:8px;background:${badgeBg};border-radius:100px;padding:5px 14px;width:fit-content;">
      <div style="width:6px;height:6px;border-radius:50%;background:${accentColor};"></div>
      <span style="font-size:12px;font-weight:700;color:${badgeText};text-transform:uppercase;letter-spacing:1.2px;">${category}</span>
    </div>
    <h1 style="font-size:${title.length > 55 ? 42 : title.length > 40 ? 48 : 54}px;font-weight:900;color:#0f172a;line-height:1.12;letter-spacing:-1px;">${title}</h1>
    ${subtitle ? `<p style="font-size:20px;color:#475569;font-weight:500;line-height:1.45;letter-spacing:-0.2px;">${subtitle}</p>` : ''}
  </div>

  <!-- Bottom: author + url -->
  <div style="display:flex;align-items:center;justify-content:space-between;">
    <div style="display:flex;align-items:center;gap:12px;">
      <div style="width:40px;height:40px;border-radius:50%;overflow:hidden;background:white;border:2px solid ${accentColor};display:flex;align-items:center;justify-content:center;">
        <img src="${logoBase64}" style="width:34px;height:34px;object-fit:contain;" />
      </div>
      <div>
        <div style="font-size:14px;font-weight:700;color:#1e293b;">${authorLine}</div>
        <div style="font-size:12px;color:#94a3b8;margin-top:2px;">Clinical Pharmacist · Pharm D</div>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:8px;background:${accentColor};border-radius:100px;padding:10px 22px;">
      <span style="font-size:15px;font-weight:700;color:white;letter-spacing:-0.2px;">Read article →</span>
    </div>
  </div>
</div>
</body>
</html>`
}

// ─── Post definitions ─────────────────────────────────────────────────────────

const POSTS = [

  // 1. Clinical Pharmacist vs Pharmacist
  {
    slug: 'clinical-pharmacist-vs-pharmacist',
    title: 'Clinical Pharmacist vs Pharmacist',
    subtitle: "What's the difference — and why does it matter for your care?",
    category: 'Awareness',
    html: base(
      'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
      '#0369a1',
      '#e0f2fe',
      '#0369a1',
      'Awareness',
      'Clinical Pharmacist vs Pharmacist',
      "What's the difference — and why does it matter for your care?",
      'Dr Priyanka Deventhiran',
      /* decor */ `
      <!-- Background blob -->
      <svg style="position:absolute;top:-80px;right:-80px;opacity:0.12;" width="520" height="520" viewBox="0 0 520 520">
        <circle cx="260" cy="260" r="260" fill="#0369a1"/>
      </svg>
      <!-- Large pill icon -->
      <div style="position:absolute;top:48px;right:80px;font-size:180px;opacity:0.18;transform:rotate(-20deg);user-select:none;">💊</div>
      <!-- Stethoscope -->
      <div style="position:absolute;bottom:100px;right:120px;font-size:120px;opacity:0.15;transform:rotate(15deg);user-select:none;">🩺</div>
      <!-- Floating card: Pharm D badge -->
      <div style="position:absolute;top:170px;right:72px;background:white;border-radius:16px;padding:16px 24px;box-shadow:0 8px 32px rgba(3,105,161,0.15);border:1px solid #e0f2fe;">
        <div style="font-size:11px;font-weight:700;color:#0369a1;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">Clinical Pharmacist</div>
        <div style="font-size:22px;font-weight:900;color:#0f172a;">Pharm D</div>
        <div style="font-size:11px;color:#64748b;margin-top:4px;">6-Year Programme</div>
      </div>
      <div style="position:absolute;top:310px;right:72px;background:white;border-radius:16px;padding:16px 24px;box-shadow:0 8px 32px rgba(3,105,161,0.1);border:1px solid #f1f5f9;">
        <div style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">Pharmacy Dispenser</div>
        <div style="font-size:22px;font-weight:900;color:#334155;">B Pharm</div>
        <div style="font-size:11px;color:#94a3b8;margin-top:4px;">Dispensing focus</div>
      </div>
      `
    )
  },

  // 2. Healthcare professionals India
  {
    slug: 'healthcare-professionals-india',
    html: base(
      'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 60%, #f8fafc 100%)',
      '#0369a1',
      '#e0f2fe',
      '#0369a1',
      'Awareness',
      'Who Does What in Indian Healthcare',
      'A simple guide to every professional on your care team',
      'Dr Priyanka Deventhiran',
      /* decor */ `
      <svg style="position:absolute;top:-100px;right:-100px;opacity:0.1;" width="500" height="500" viewBox="0 0 500 500">
        <circle cx="250" cy="250" r="250" fill="#0369a1"/>
      </svg>
      <!-- Emoji grid of professionals -->
      <div style="position:absolute;top:50px;right:60px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;">
        ${['👨‍⚕️','💊','🩺','🏥','💉','🧬'].map(e =>
          `<div style="width:72px;height:72px;background:white;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:32px;box-shadow:0 4px 16px rgba(0,0,0,0.06);border:1px solid #e0f2fe;">${e}</div>`
        ).join('')}
      </div>
      <div style="position:absolute;bottom:155px;right:60px;background:white;border-radius:12px;padding:10px 20px;box-shadow:0 4px 16px rgba(3,105,161,0.1);border:1px solid #e0f2fe;">
        <span style="font-size:13px;font-weight:600;color:#0369a1;">10 roles explained</span>
      </div>
      `
    )
  },

  // 3. Why I started DrD MedCare
  {
    slug: 'why-i-started-drd-medcare',
    html: base(
      'linear-gradient(135deg, #f0fdf9 0%, #ccfbf1 50%, #99f6e4 100%)',
      '#0f766e',
      '#ccfbf1',
      '#0f766e',
      'Our Story',
      "Why I Started Dr D's MedCare",
      'A preventable tragedy. A gap nobody was filling. A decision to act.',
      'Dr Priyanka Deventhiran',
      /* decor */ `
      <svg style="position:absolute;top:-80px;right:-80px;opacity:0.15;" width="480" height="480" viewBox="0 0 480 480">
        <circle cx="240" cy="240" r="240" fill="#0f766e"/>
      </svg>
      <div style="position:absolute;top:52px;right:80px;font-size:160px;opacity:0.2;transform:rotate(-10deg);">❤️</div>
      <!-- Quote card -->
      <div style="position:absolute;bottom:140px;right:60px;background:white;border-radius:16px;padding:20px 24px;box-shadow:0 8px 32px rgba(15,118,110,0.15);border-left:4px solid #0f766e;max-width:320px;">
        <p style="font-size:14px;color:#334155;line-height:1.6;font-style:italic;">"Patient counselling — the missing pill in Indian healthcare."</p>
      </div>
      <div style="position:absolute;top:200px;right:72px;font-size:80px;opacity:0.15;">💙</div>
      `
    )
  },

  // 4. Drug food interactions India
  {
    slug: 'drug-food-interactions-india',
    html: base(
      'linear-gradient(135deg, #fffbeb 0%, #fef3c7 60%, #fde68a 100%)',
      '#b45309',
      '#fef3c7',
      '#b45309',
      'Education',
      'Drug-Food Interactions Every Indian Patient Should Know',
      'Dal, milk, banana, tea — foods that can silently affect your medicines',
      'Dr Priyanka Deventhiran',
      /* decor */ `
      <svg style="position:absolute;top:-80px;right:-80px;opacity:0.12;" width="480" height="480" viewBox="0 0 480 480">
        <circle cx="240" cy="240" r="240" fill="#b45309"/>
      </svg>
      <!-- Food emoji grid -->
      <div style="position:absolute;top:44px;right:64px;display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        ${['🥛','🍌','☕','💊'].map((e,i) =>
          `<div style="width:80px;height:80px;background:white;border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:36px;box-shadow:0 4px 20px rgba(180,83,9,0.12);border:1px solid #fde68a;">${e}</div>`
        ).join('')}
      </div>
      <!-- Warning pill -->
      <div style="position:absolute;bottom:120px;right:64px;background:white;border-radius:12px;padding:10px 18px;box-shadow:0 4px 16px rgba(180,83,9,0.12);display:flex;align-items:center;gap:8px;border:1px solid #fde68a;">
        <span style="font-size:18px;">⚠️</span>
        <span style="font-size:13px;font-weight:600;color:#b45309;">6 interactions covered</span>
      </div>
      `
    )
  },

  // 6. Meningitis symptoms India
  {
    slug: 'meningitis-symptoms-india',
    html: base(
      'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 60%, #ddd6fe 100%)',
      '#7c3aed',
      '#ede9fe',
      '#7c3aed',
      'Education',
      'Meningitis: Warning Signs Every Indian Family Must Know',
      'Bacterial meningitis can turn fatal within 24 hours — know the signs',
      'Dr Priyanka Deventhiran',
      /* decor */ `
      <svg style="position:absolute;top:-80px;right:-80px;opacity:0.12;" width="480" height="480" viewBox="0 0 480 480">
        <circle cx="240" cy="240" r="240" fill="#7c3aed"/>
      </svg>
      <div style="position:absolute;top:48px;right:80px;font-size:160px;opacity:0.18;transform:rotate(-10deg);user-select:none;">🧠</div>
      <!-- Warning card -->
      <div style="position:absolute;top:180px;right:64px;background:white;border-radius:16px;padding:18px 22px;box-shadow:0 8px 32px rgba(124,58,237,0.15);border:1px solid #ede9fe;width:280px;">
        <div style="font-size:11px;font-weight:700;color:#7c3aed;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;">Warning signs</div>
        ${['🤕 Sudden severe headache', '🌡️ High fever', '🔒 Stiff neck'].map(s =>
          `<div style="font-size:13px;color:#1e293b;font-weight:600;padding:5px 0;border-bottom:1px solid #f1f5f9;">${s}</div>`
        ).join('')}
      </div>
      <!-- Glass test badge -->
      <div style="position:absolute;bottom:115px;right:64px;background:#fef2f2;border-radius:12px;padding:10px 18px;box-shadow:0 4px 16px rgba(220,38,38,0.1);display:flex;align-items:center;gap:8px;border:1px solid #fecaca;">
        <span style="font-size:16px;">🔴</span>
        <span style="font-size:13px;font-weight:600;color:#dc2626;">Do the glass test</span>
      </div>
      `
    )
  },

  // 5. Why finish antibiotics
  {
    slug: 'why-you-must-finish-antibiotics',
    html: base(
      'linear-gradient(135deg, #fffbeb 0%, #fef3c7 60%, #fed7aa 100%)',
      '#b45309',
      '#fef3c7',
      '#b45309',
      'Education',
      'Why Stopping Antibiotics Midway Is Dangerous',
      'Feeling better is not the finish line — it is the halfway point',
      'Dr Priyanka Deventhiran',
      /* decor */ `
      <svg style="position:absolute;top:-80px;right:-80px;opacity:0.12;" width="480" height="480" viewBox="0 0 480 480">
        <circle cx="240" cy="240" r="240" fill="#c2410c"/>
      </svg>
      <div style="position:absolute;top:48px;right:80px;font-size:160px;opacity:0.2;transform:rotate(10deg);">💊</div>
      <!-- Progress bar card -->
      <div style="position:absolute;top:210px;right:64px;background:white;border-radius:16px;padding:20px 24px;box-shadow:0 8px 24px rgba(180,83,9,0.12);width:280px;border:1px solid #fde68a;">
        <div style="font-size:11px;font-weight:700;color:#b45309;letter-spacing:0.8px;text-transform:uppercase;margin-bottom:12px;">Your antibiotic course</div>
        <div style="height:8px;background:#fde68a;border-radius:8px;overflow:hidden;">
          <div style="height:100%;width:45%;background:linear-gradient(90deg,#f59e0b,#d97706);border-radius:8px;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:8px;">
          <span style="font-size:11px;color:#92400e;font-weight:600;">Day 3 — Feeling better</span>
          <span style="font-size:11px;color:#94a3b8;">Day 7</span>
        </div>
      </div>
      <div style="position:absolute;bottom:110px;right:64px;background:#fef2f2;border-radius:12px;padding:10px 18px;box-shadow:0 4px 16px rgba(220,38,38,0.08);display:flex;align-items:center;gap:8px;border:1px solid #fecaca;">
        <span style="font-size:16px;">🦠</span>
        <span style="font-size:13px;font-weight:600;color:#dc2626;">Resistant bacteria survive</span>
      </div>
      `
    )
  },
]

// ─── Generator ───────────────────────────────────────────────────────────────

async function run() {
  console.log('Launching browser…')
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  for (const post of POSTS) {
    console.log(`Generating: ${post.slug}`)
    const page = await browser.newPage()
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
    await page.setContent(post.html, { waitUntil: 'networkidle0' })

    const outPath = path.join(OUT_DIR, `${post.slug}.jpg`)
    await page.screenshot({ path: outPath, type: 'jpeg', quality: 85, clip: { x: 0, y: 0, width: 1200, height: 630 } })
    console.log(`  ✓ Saved ${post.slug}.png`)
    await page.close()
  }

  await browser.close()
  console.log('\nAll OG images generated in /public/og/')
}

run().catch(console.error)
