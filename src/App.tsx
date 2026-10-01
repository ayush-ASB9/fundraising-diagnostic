import React, { useState, useEffect, useRef } from 'react'

const FORM_URL = 'https://makeform.ai/f/u9P8Z0It'

function scrollToForm() {
  document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })
}

function Label({ children, gold }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <p style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '10px',
      letterSpacing: '0.16em',
      color: gold ? 'var(--accent)' : 'var(--ink-faint)',
      marginBottom: '1.25rem',
      textTransform: 'uppercase',
    }}>
      {children}
    </p>
  )
}

function Rule() {
  return <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />
}

function SectionWrap({ id, children, bg, style }: {
  id?: string
  children: React.ReactNode
  bg?: string
  style?: React.CSSProperties
}) {
  return (
    <section id={id} style={{
      borderBottom: '1px solid var(--border)',
      padding: 'clamp(4rem, 7vw, 6rem) 2rem',
      backgroundColor: bg ?? 'transparent',
      ...style,
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {children}
      </div>
    </section>
  )
}

function SectionHeading({ children, maxWidth }: { children: React.ReactNode; maxWidth?: string }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
      fontWeight: 400,
      lineHeight: 1.08,
      letterSpacing: '-0.015em',
      marginBottom: '3rem',
      maxWidth: maxWidth ?? '700px',
      color: 'var(--ink-dark)',
    }}>
      {children}
    </h2>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!visible) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed', bottom: '5.5rem', right: '1.5rem', zIndex: 60,
        width: '38px', height: '38px',
        backgroundColor: 'rgba(9,9,9,0.85)',
        border: '1px solid var(--border-strong)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(8px)',
        transition: 'opacity 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.opacity = '1' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.opacity = '0.8' }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-muted)', lineHeight: 1 }}>↑</span>
    </button>
  )
}

export default function App() {
  const [navScrolled, setNavScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'PROCESS', id: 'process' },
    { label: 'WHAT YOU GET', id: 'deliverables' },
    { label: 'WHY ME', id: 'about' },
    { label: 'PRICING', id: 'pricing' },
  ]

  return (
    <div style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', fontFamily: 'var(--font-body)' }}>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: navScrolled ? '1px solid var(--border)' : '1px solid transparent',
        backgroundColor: navScrolled ? 'rgba(9,9,9,0.96)' : 'transparent',
        backdropFilter: navScrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.3s ease',
        padding: '0 2rem',
        height: '56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', letterSpacing: '0.08em', color: 'var(--ink-dark)' }}>
            AYUSH SINGH
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', color: 'var(--ink-faint)', marginLeft: '10px' }}>
            FUNDRAISING STRATEGY
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <button key={l.id}
              onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' })}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', color: 'var(--ink-muted)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink-dark)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-muted)')}>
              {l.label}
            </button>
          ))}
          <button onClick={scrollToForm} style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em',
            backgroundColor: 'var(--accent)', color: 'var(--primary-foreground)',
            border: 'none', padding: '8px 16px', cursor: 'pointer', transition: 'opacity 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            APPLY →
          </button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--ink-dark)' }}>
          {mobileMenuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div style={{ position: 'fixed', top: '56px', left: 0, right: 0, zIndex: 99, backgroundColor: 'var(--card)', borderBottom: '1px solid var(--border)', padding: '1.5rem 2rem 2rem' }}>
          {navLinks.map(l => (
            <div key={l.id} style={{ borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
              <button onClick={() => { document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false) }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: 'var(--ink-dark)', background: 'none', border: 'none', cursor: 'pointer' }}>
                {l.label}
              </button>
            </div>
          ))}
          <div style={{ marginTop: '1.5rem' }}>
            <button onClick={() => { scrollToForm(); setMobileMenuOpen(false) }} style={{
              width: '100%', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em',
              backgroundColor: 'var(--accent)', color: 'var(--primary-foreground)',
              border: 'none', padding: '14px', cursor: 'pointer',
            }}>
              APPLY FOR THE SPRINT →
            </button>
          </div>
        </div>
      )}

      {/* ─── 01. HERO ─── */}
      <section ref={heroRef} style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: 'clamp(7rem, 12vw, 10rem) 2rem clamp(3.5rem, 6vw, 5.5rem)',
        borderBottom: '1px solid var(--border)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '80px 80px', opacity: 0.35, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to top, var(--background), transparent)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative' }}>
          <Label gold>FUNDRAISING DIAGNOSTIC / 09 DAYS</Label>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(2.8rem, 8vw, 7rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: 'var(--ink-dark)',
            marginBottom: '1.25rem',
          }}>
            YOUR FUNDRAISING<br />
            PROBABLY HAS A<br />
            BOTTLENECK.
          </h1>

          <p style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            color: 'var(--ink-mid)',
            marginBottom: '1.75rem',
          }}>
            I'll help you find it.
          </p>

          <p style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
            color: 'var(--ink-muted)',
            maxWidth: '520px',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
            fontWeight: 300,
          }}>
            A 9-day, founder-led fundraising diagnostic and strategy sprint for startups preparing to raise.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '14px' }}>
            <button onClick={scrollToForm} style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em',
              backgroundColor: 'var(--accent)', color: 'var(--primary-foreground)',
              border: 'none', padding: '16px 32px', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              transition: 'opacity 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              APPLY FOR THE FIRST 2 FREE SLOTS →
            </button>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', color: 'var(--accent)', fontWeight: 400 }}>
                First 2 founders: ₹0
              </span>
              <span style={{ width: '1px', height: '12px', backgroundColor: 'var(--border-strong)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>
                Regular sprint: ₹26,000
              </span>
            </div>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginTop: '2px' }}>
              No funding guarantee. No generic AI report. No recycled template.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 02. THE IDEA ─── */}
      <section style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(3rem, 6vw, 5rem) 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gap: '2rem' }} className="lg:grid-cols-[200px_1fr]">
          <div><Label>THE IDEA</Label></div>
          <div style={{ maxWidth: '640px' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', lineHeight: 1.6, color: 'var(--ink-mid)', marginBottom: '1.5rem' }}>
              Most fundraising problems aren't solved by making a pitch deck prettier.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-muted)', lineHeight: 1.85 }}>
              They can sit underneath the deck:<br />
              the story, the positioning, the evidence,<br />
              the GTM, the investor fit,<br />
              or the fundraising process itself.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-muted)', lineHeight: 1.85, marginTop: '1rem' }}>
              The sprint exists to identify which of those actually matters for the specific company.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 03. WHAT A BOTTLENECK LOOKS LIKE ─── */}
      <SectionWrap bg="var(--card)">
        <Label>WHAT A BOTTLENECK CAN LOOK LIKE</Label>
        <SectionHeading maxWidth="680px">
          THE PROBLEM ISN'T ALWAYS<br />WHAT IT LOOKS LIKE.
        </SectionHeading>

        <div style={{ display: 'grid', gap: '1px', backgroundColor: 'var(--border)' }} className="md:grid-cols-2">
          {[
            {
              think: 'We need to talk to more investors.',
              find: 'The investor universe isn\'t the biggest issue. The company\'s positioning is making it look like a crowded category.',
            },
            {
              think: 'Our deck isn\'t good enough.',
              find: 'The deck isn\'t the main problem. The evidence doesn\'t yet support the story being told.',
            },
            {
              think: 'We need more traction.',
              find: 'The company already has useful evidence, but it isn\'t being presented in a way that answers the investor\'s actual question.',
            },
            {
              think: 'We need a bigger investor list.',
              find: 'The problem is investor fit and prioritisation, not the number of names in the spreadsheet.',
            },
          ].map((ex, i) => (
            <div key={i} style={{
              backgroundColor: 'var(--card)',
              padding: '2rem',
              transition: 'background-color 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#161514')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--card)')}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', color: 'var(--ink-faint)', marginBottom: '0.6rem' }}>YOU THINK:</p>
              <p style={{ fontSize: '0.92rem', color: 'var(--ink-mid)', lineHeight: 1.55, marginBottom: '1.25rem', fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
                "{ex.think}"
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: '0.6rem' }}>THE DIAGNOSTIC MIGHT FIND:</p>
              <p style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', lineHeight: 1.65 }}>{ex.find}</p>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1rem', color: 'var(--ink-muted)', marginTop: '2rem', lineHeight: 1.65 }}>
          The point isn't to give every founder the same answer.<br />
          It's to figure out which problem actually matters.
        </p>
      </SectionWrap>

      {/* ─── 04. WHY THIS EXISTS ─── */}
      <SectionWrap>
        <Label>WHY THIS EXISTS</Label>
        <SectionHeading>
          BEFORE YOU RAISE MORE,<br />
          UNDERSTAND WHAT YOU'RE<br />
          ACTUALLY RAISING WITH.
        </SectionHeading>

        <p style={{ fontSize: '0.95rem', color: 'var(--ink-muted)', lineHeight: 1.8, maxWidth: '520px', marginBottom: '1rem' }}>
          Founders often get advice like:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.75rem' }}>
          {['"make the market bigger"', '"add more traction"', '"improve the deck"', '"talk to more investors"'].map(q => (
            <span key={q} style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.06em',
              color: 'var(--ink-muted)', border: '1px solid var(--border)', padding: '5px 10px',
            }}>{q}</span>
          ))}
        </div>
        <p style={{ fontSize: '0.95rem', color: 'var(--ink-mid)', lineHeight: 1.8, maxWidth: '520px', marginBottom: '1.5rem' }}>
          But the real question is:{' '}
          <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.05rem' }}>
            what is actually affecting this particular raise?
          </em>
        </p>

        <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.75, maxWidth: '500px', marginBottom: '3.5rem', borderLeft: '2px solid var(--border-strong)', paddingLeft: '1rem' }}>
          The expensive part of fundraising isn't always the money. Sometimes it's spending the next 60 days fixing the wrong thing.
        </p>

        <Rule />
        <div style={{ marginTop: '2.5rem' }}>
          {[
            { n: '01', title: 'STORY', desc: 'Can an investor understand the company, problem, wedge and why now?' },
            { n: '02', title: 'POSITIONING', desc: 'What category are you actually competing in, and how are you being perceived?' },
            { n: '03', title: 'EVIDENCE', desc: 'What does current traction, market evidence and customer behaviour actually prove?' },
            { n: '04', title: 'INVESTOR FIT', desc: 'Who should care about this company — and why?' },
            { n: '05', title: 'PROCESS', desc: 'Where is the fundraising process leaking momentum?' },
          ].map((item, i, arr) => (
            <div key={item.n} style={{
              display: 'grid', gridTemplateColumns: '2.5rem 150px 1fr',
              gap: '1.5rem', alignItems: 'start',
              padding: '1.25rem 0',
              borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              transition: 'background 0.15s',
              margin: '0 -1rem', paddingLeft: '1rem', paddingRight: '1rem',
            }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--card)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent)', letterSpacing: '0.1em', paddingTop: '2px' }}>{item.n}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--ink-dark)', paddingTop: '2px' }}>{item.title}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.65 }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </SectionWrap>

      {/* ─── 05. 9-DAY SPRINT ─── */}
      <SectionWrap id="process" bg="var(--card)">
        <Label>THE 9-DAY SPRINT</Label>
        <SectionHeading>
          NINE DAYS.<br />
          ONE CLEARER<br />
          FUNDRAISING STRATEGY.
        </SectionHeading>

        {/* Progression bar */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '2.5rem', border: '1px solid var(--border)' }}>
          {[
            { label: 'UNDERSTAND', days: '01–03' },
            { label: 'PRESSURE-TEST', days: '04–06' },
            { label: 'DECIDE', days: '07–09' },
          ].map((p, i) => (
            <div key={p.label} style={{
              flex: 1, padding: '14px 20px',
              borderRight: i < 2 ? '1px solid var(--border)' : 'none',
              display: 'flex', flexDirection: 'column', gap: '4px',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--ink-faint)', letterSpacing: '0.1em' }}>DAY {p.days}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.12em' }}>{p.label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gap: '0', borderTop: '1px solid var(--border)' }} className="md:grid-cols-3">
          {[
            {
              days: 'DAY 01–03', title: 'UNDERSTAND',
              subtitle: 'Understand the company before making recommendations.',
              items: ['Product', 'Customer', 'Market', 'Competitors', 'Traction', 'GTM', 'Business model', 'Current fundraising narrative', 'Existing investor conversations', 'Current materials'],
              note: 'No recommendations before understanding the company.',
            },
            {
              days: 'DAY 04–06', title: 'PRESSURE-TEST',
              subtitle: 'Pressure-test the raise from multiple angles.',
              items: ['Pitch narrative', 'Investor questions', 'Market positioning', 'Competitive landscape', 'GTM', 'Business model', 'Investor fit', 'Fundraising gaps', 'Objections', 'Outreach strategy'],
              note: 'Human-led analysis supported by AI-assisted research.',
            },
            {
              days: 'DAY 07–09', title: 'DECIDE',
              subtitle: 'Turn findings into decisions.',
              items: ['What to fix first', 'What not to waste time on', 'How to position the company', 'Which investors to prioritise', 'What objections to prepare for', 'How to structure outreach', 'What the next 30–60 days should look like'],
              note: null,
            },
          ].map((phase, i) => (
            <div key={phase.title} style={{
              padding: '2rem',
              borderBottom: '1px solid var(--border)',
              borderRight: i < 2 ? '1px solid var(--border)' : 'none',
            }} className={i < 2 ? 'md:border-r' : ''}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', color: 'var(--ink-faint)' }}>{phase.days}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 400, margin: '0.5rem 0 0.6rem', lineHeight: 1.15, color: 'var(--ink-dark)' }}>{phase.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>{phase.subtitle}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {phase.items.map(item => (
                  <li key={item} style={{ display: 'flex', gap: '8px', alignItems: 'baseline', marginBottom: '5px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--ink-faint)', flexShrink: 0 }}>—</span>
                    <span style={{ fontSize: '0.83rem', color: 'var(--ink-muted)', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
              {phase.note && (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.08em', color: 'var(--accent)', marginTop: '1.25rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                  {phase.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </SectionWrap>

      {/* ─── 06. WHAT HAPPENS AFTER YOU APPLY ─── */}
      <SectionWrap>
        <Label>THE PROCESS</Label>
        <SectionHeading maxWidth="600px">
          WHAT HAPPENS AFTER<br />YOU APPLY?
        </SectionHeading>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '2rem' }}>
          {[
            { n: '01', title: 'APPLY', desc: 'Tell me what you\'re building, where you are in the raise and what\'s currently unclear.' },
            { n: '02', title: 'FIT CHECK', desc: 'I\'ll review whether the sprint actually makes sense for your situation. Not every company is a fit.' },
            { n: '03', title: 'KICKOFF', desc: 'We go through the company, product, fundraising materials, traction and existing context.' },
            { n: '04', title: 'NINE DAYS', desc: 'Research, pressure-testing, analysis and strategic decisions.' },
            { n: '05', title: 'FINAL REVIEW', desc: 'We walk through the findings, priorities and next steps together.' },
          ].map((step, i, arr) => (
            <div key={step.n} style={{
              display: 'grid', gridTemplateColumns: '2.5rem 140px 1fr',
              gap: '1.5rem', alignItems: 'start',
              padding: '1.25rem 0',
              borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              transition: 'background 0.15s',
              margin: '0 -1rem', paddingLeft: '1rem', paddingRight: '1rem',
            }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--card)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--ink-faint)', letterSpacing: '0.1em', paddingTop: '2px' }}>{step.n}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--ink-dark)', paddingTop: '2px' }}>{step.title}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.65 }}>{step.desc}</span>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--ink-muted)', lineHeight: 1.7, maxWidth: '540px', borderLeft: '2px solid var(--accent)', paddingLeft: '1rem' }}>
          This isn't 9 days of me disappearing into a Notion doc.<br />
          Expect founder conversations, questions, challenges and a final strategy review throughout.
        </p>
      </SectionWrap>

      {/* ─── 07. APPROACH / AI ─── */}
      <SectionWrap bg="var(--card)">
        <Label>APPROACH</Label>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
          fontWeight: 400, lineHeight: 1.08, letterSpacing: '-0.015em',
          marginBottom: '0.75rem', color: 'var(--ink-dark)',
        }}>
          AI MAKES THE RESEARCH FASTER.<br />
          I MAKE THE JUDGMENTS.
        </h2>
        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', color: 'var(--ink-muted)', marginBottom: '1rem' }}>
          The system is not the product. The thinking is.
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.7, maxWidth: '480px', marginBottom: '3rem' }}>
          AI can help find 500 investors. The hard part is deciding which 20 actually matter.
        </p>

        <div style={{ display: 'grid', gap: '0', border: '1px solid var(--border-strong)' }} className="md:grid-cols-2">
          <div style={{ padding: '2.5rem', borderBottom: '1px solid var(--border-strong)' }} className="md:border-b-0 md:border-r">
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', color: 'var(--ink-dark)', marginBottom: '1.5rem' }}>HUMAN — AYUSH</p>
            {['Understands the company', 'Reviews the fundraising story', 'Challenges assumptions', 'Interprets research', 'Connects findings across markets', 'Thinks through investor objections', 'Decides what actually matters', 'Turns research into strategy'].map(item => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'baseline', marginBottom: '9px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--accent)', flexShrink: 0 }}>→</span>
                <span style={{ fontSize: '0.88rem', color: 'var(--ink-mid)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '2.5rem', backgroundColor: 'var(--secondary)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', color: 'var(--ink-muted)', marginBottom: '1.5rem' }}>AI-ASSISTED — RESEARCH LAYER</p>
            {['Market research', 'Competitor mapping', 'Investor research', 'Pattern finding', 'Large-scale information synthesis', 'Research organisation', 'First-pass analysis', 'Documentation and follow-up'].map(item => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'baseline', marginBottom: '9px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--ink-faint)', flexShrink: 0 }}>→</span>
                <span style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1rem', color: 'var(--ink-mid)', marginTop: '2rem', lineHeight: 1.5 }}>
          AI helps me move faster. It does not replace judgment.
        </p>
      </SectionWrap>

      {/* ─── 08. WHY ME ─── */}
      <SectionWrap id="about">
        <Label>WHY ME</Label>
        <SectionHeading>WHY ME?</SectionHeading>

        <div style={{ display: 'grid', gap: '1px', backgroundColor: 'var(--border)', marginBottom: '3rem' }} className="md:grid-cols-2">
          {/* Kairos — visually prominent */}
          <div style={{
            backgroundColor: 'var(--card)', padding: '2rem',
            borderBottom: '2px solid var(--accent)',
            position: 'relative', overflow: 'hidden',
          }} className="md:col-span-2">
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', backgroundColor: 'var(--accent)' }} />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: '0.75rem' }}>CURRENTLY</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', marginBottom: '0.75rem', lineHeight: 1.2, color: 'var(--ink-dark)' }}>
              Currently helping Kairos Health (YC F26)
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', lineHeight: 1.7, maxWidth: '620px' }}>
              Researching the U.S. dental market, identifying the right ICP, testing outreach channels and thinking through how to turn a GTM problem into a repeatable system. Real startup work, happening now.
            </p>
          </div>

          {[
            { n: '01', title: '7+ Founders', desc: 'Supported founders with investor research, fundraising strategy, pitch positioning and market research.' },
            { n: '02', title: 'Fundraising + Pitch Work', desc: 'Reviewed and worked through fundraising decks and narratives, including multiple 5–7 revision cycles with one founder.' },
            { n: '03', title: 'Impactful Pitch', desc: 'Collaborated on selected fundraising and M&A work, helping bridge communication between investment banks and founders.' },
            { n: '04', title: '15+ Ideas', desc: 'Researched and pressure-tested 15+ startup ideas across markets, competitors, business models, distribution and validation.' },
          ].map(card => (
            <div key={card.n} style={{
              backgroundColor: 'var(--card)', padding: '2rem',
              transition: 'background-color 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#161514')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--card)')}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--ink-faint)', marginBottom: '0.75rem' }}>{card.n}</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', marginBottom: '0.5rem', lineHeight: 1.2, color: 'var(--ink-dark)' }}>{card.title}</p>
              <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', lineHeight: 1.65 }}>{card.desc}</p>
            </div>
          ))}

          <div style={{ backgroundColor: 'var(--card)', padding: '2rem' }} className="md:col-span-2">
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--ink-faint)', marginBottom: '0.75rem' }}>05</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', marginBottom: '0.5rem', lineHeight: 1.2, color: 'var(--ink-dark)' }}>I actually like the mess.</p>
            <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', lineHeight: 1.7, maxWidth: '580px' }}>
              I don't come into a company with a pre-written fundraising playbook. I like figuring out what is actually happening first — then deciding what deserves attention.
            </p>
          </div>
        </div>

        <div style={{ padding: '2rem', borderTop: '2px solid var(--border-strong)', display: 'grid', gap: '1rem' }} className="md:grid-cols-[1fr_auto]">
          <div>
            <p style={{ fontWeight: 500, letterSpacing: '0.08em', fontSize: '13px', marginBottom: '4px', color: 'var(--ink-dark)' }}>AYUSH SINGH</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--ink-faint)', marginBottom: '1rem' }}>
              BUSINESS · STRATEGY · RESEARCH · AGE 17
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', lineHeight: 1.7, maxWidth: '460px' }}>
              Founder-side researcher and strategist focused on fundraising, market research, validation and messy startup problems.
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--ink-mid)', marginTop: '0.75rem' }}>
              "I care more about being useful than having a fancy title."
            </p>
          </div>
        </div>
      </SectionWrap>

      {/* ─── 09. SAMPLE DIAGNOSTIC ─── */}
      <SectionWrap bg="var(--card)">
        <Label gold>A TINY LOOK AT THE THINKING</Label>
        <SectionHeading maxWidth="560px">
          WHAT THE DIAGNOSTIC<br />ACTUALLY DOES.
        </SectionHeading>

        <div style={{ border: '1px solid var(--border-strong)', maxWidth: '680px' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--secondary)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--ink-muted)', letterSpacing: '0.1em' }}>B2B SAAS · PRE-SEED</span>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--ink-faint)', letterSpacing: '0.1em' }}>ANONYMISED HYPOTHETICAL</span>
            </div>
          </div>

          {[
            {
              step: '01',
              label: 'SYMPTOM',
              labelColor: 'var(--ink-muted)',
              content: '"We\'re not getting investor replies."',
              italic: true,
              bg: 'transparent',
            },
            {
              step: '02',
              label: 'ASSUMPTION',
              labelColor: 'var(--ink-muted)',
              content: 'Outreach volume or targeting must be the issue.',
              italic: false,
              bg: 'transparent',
            },
            {
              step: '03',
              label: 'ANALYSIS',
              labelColor: 'var(--ink-dark)',
              content: 'Investor list is reasonable. The positioning makes the company look crowded. The current evidence doesn\'t support the narrative being pitched.',
              italic: false,
              bg: 'rgba(201,169,110,0.04)',
            },
            {
              step: '04',
              label: 'ACTUAL ISSUE',
              labelColor: 'var(--accent)',
              content: 'Narrative + evidence. Not outreach.',
              italic: false,
              bg: 'rgba(201,169,110,0.06)',
            },
            {
              step: '05',
              label: 'DECISION',
              labelColor: 'var(--accent)',
              content: 'Reframe the narrative → narrow investor universe → strengthen evidence → restart outreach with a clearer pitch.',
              italic: false,
              bg: 'rgba(201,169,110,0.08)',
            },
          ].map((row, i, arr) => (
            <div key={row.step}>
              <div style={{
                display: 'grid', gap: '1.25rem', padding: '1.25rem 1.5rem',
                backgroundColor: row.bg,
              }} className="md:grid-cols-[160px_1fr]">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.1em', color: 'var(--ink-faint)' }}>{row.step}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', color: row.labelColor, paddingTop: '1px' }}>{row.label}</span>
                </div>
                <span style={{
                  fontSize: '0.9rem', color: i >= 3 ? 'var(--ink-mid)' : 'var(--ink-muted)', lineHeight: 1.65,
                  fontStyle: row.italic ? 'italic' : 'normal',
                  fontFamily: row.italic ? 'var(--font-display)' : 'inherit',
                }}>{row.content}</span>
              </div>
              {i < arr.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '0 1.5rem', borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--ink-faint)', letterSpacing: '0.1em', padding: '4px 0' }}>↓</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginTop: '2rem', lineHeight: 1.8, maxWidth: '560px' }}>
          Every diagnostic starts from the company's actual situation. There is no fixed answer sheet.
        </p>
        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--ink-faint)', marginTop: '0.5rem', lineHeight: 1.65 }}>
          This is the type of thinking the sprint is designed to uncover.
        </p>
      </SectionWrap>

      {/* ─── Before/After Bridge ─── */}
      <section style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(2.5rem, 4vw, 3.5rem) 2rem', backgroundColor: 'var(--secondary)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gap: '1px', backgroundColor: 'var(--border)' }} className="md:grid-cols-2">
          <div style={{ padding: '2rem', backgroundColor: 'var(--card)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', color: 'var(--ink-faint)', marginBottom: '0.75rem' }}>BEFORE</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--ink-muted)', lineHeight: 1.4 }}>
              "We're not sure what's wrong."
            </p>
          </div>
          <div style={{ padding: '2rem', backgroundColor: 'var(--card)', borderLeft: '2px solid var(--accent)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: '0.75rem' }}>AFTER</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--ink-dark)', lineHeight: 1.4 }}>
              "We know what is actually worth fixing next."
            </p>
          </div>
        </div>
      </section>

      {/* ─── 10. WHAT YOU GET ─── */}
      <SectionWrap id="deliverables">
        <Label>WHAT YOU GET</Label>
        <SectionHeading>
          THE OUTPUT ISN'T A REPORT.<br />
          IT'S A SET OF DECISIONS.
        </SectionHeading>

        <Rule />
        <div>
          {[
            { n: '01', title: 'Fundraising Audit', desc: 'Narrative, positioning, gaps and likely investor questions.' },
            { n: '02', title: 'Market + Competitor Map', desc: 'Relevant landscape, differentiation, weaknesses and strategic context.' },
            { n: '03', title: 'GTM + Positioning Review', desc: 'Where traction, distribution or positioning may be affecting investor perception.' },
            { n: '04', title: 'Investor Fit Research', desc: 'A targeted investor shortlist with thesis, stage, sector fit and reasoning.' },
            { n: '05', title: 'Outreach System', desc: 'Messaging, prioritisation, follow-ups and pipeline structure.' },
            { n: '06', title: 'Objection Map', desc: 'Likely investor concerns and how to prepare for them.' },
            { n: '07', title: '90-Day Action Plan', desc: 'A practical sequence of priorities after the sprint.' },
          ].map((d, i, arr) => (
            <div key={d.n} style={{
              display: 'grid', gridTemplateColumns: '2.5rem 1fr',
              gap: '1.25rem', padding: '1.25rem 0',
              borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              transition: 'background 0.15s',
              margin: '0 -1rem', paddingLeft: '1rem', paddingRight: '1rem',
            }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--card)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--ink-faint)', letterSpacing: '0.1em', paddingTop: '3px' }}>{d.n}</span>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 1.8vw, 1.1rem)', fontWeight: 400, marginBottom: '3px', color: 'var(--ink-dark)' }}>{d.title}</p>
                <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', lineHeight: 1.6 }}>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', color: 'var(--accent)', marginTop: '1.75rem' }}>
          FINAL STRATEGY WALKTHROUGH INCLUDED
        </p>
      </SectionWrap>

      {/* ─── 11. WHAT I NEED FROM YOU ─── */}
      <SectionWrap bg="var(--card)">
        <div style={{ display: 'grid', gap: '3rem' }} className="md:grid-cols-2">
          <div>
            <Label>WHAT I NEED FROM YOU</Label>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.015em',
              marginBottom: '1.5rem', color: 'var(--ink-dark)',
            }}>
              YOU DON'T NEED<br />PERFECT MATERIALS.
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              But I do need access to relevant context, including:
            </p>
            {[
              'Current pitch deck',
              'Product / demo or product access',
              'Traction / customer information',
              'Current fundraising status',
              'Previous investor conversations',
              'Existing outreach / materials',
              'Founder conversations during the sprint',
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'baseline', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--ink-faint)', flexShrink: 0 }}>—</span>
                <span style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--ink-mid)', marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
              The better the context, the better the diagnosis.
            </p>
          </div>

          {/* Confidentiality */}
          <div>
            <Label>CONFIDENTIALITY</Label>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.015em',
              marginBottom: '1.5rem', color: 'var(--ink-dark)',
            }}>
              YOUR INFORMATION<br />IS TREATED WITH CARE.
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.75 }}>
              Everything shared during the engagement is treated as confidential and used only for the purpose of the diagnostic.
            </p>
          </div>
        </div>
      </SectionWrap>

      {/* ─── 12. NOT FOR EVERYONE / WHO IT'S FOR ─── */}
      <SectionWrap>
        <div style={{ display: 'grid', gap: '3rem' }} className="md:grid-cols-2">
          <div>
            <Label>NOT FOR EVERY FOUNDER</Label>
            <SectionHeading maxWidth="360px">NOT FOR<br />EVERY FOUNDER.</SectionHeading>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--ink-faint)', marginBottom: '1rem' }}>THIS IS NOT:</p>
            {[
              'A funding guarantee',
              'A pitch-deck redesign agency',
              'A generic AI report',
              'A database of random investors',
              'A "10 AI agents" gimmick',
              'A substitute for your fundraising team',
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'baseline', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-faint)' }}>×</span>
                <span style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
            <p style={{ fontSize: '0.86rem', color: 'var(--ink-mid)', lineHeight: 1.75, marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
              It is a focused diagnostic for founders who want to understand what may be affecting their raise — and what to do about it.
            </p>
          </div>

          <div>
            <Label>WHO IT'S FOR</Label>
            <SectionHeading maxWidth="360px">BUILT FOR FOUNDERS<br />ABOUT TO RAISE.</SectionHeading>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--ink-faint)', marginBottom: '1rem' }}>GOOD FIT:</p>
            {[
              'Preparing for a pre-seed / seed raise',
              'Already have a product or meaningful thesis',
              'Have a deck but aren\'t confident in the story',
              'Are unsure which investors actually fit',
              'Getting inconsistent investor feedback',
              'Want an external strategic perspective',
              'Need to turn scattered research into a fundraising plan',
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'baseline', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-dark)' }}>→</span>
                <span style={{ fontSize: '0.88rem', color: 'var(--ink-mid)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--ink-faint)', margin: '1.5rem 0 1rem' }}>NOT IDEAL:</p>
            {[
              'Idea-only projects with no serious fundraising intention',
              'Founders looking for guaranteed investor introductions',
              'Anyone expecting the work to be completely automated',
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'baseline', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-faint)' }}>—</span>
                <span style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>

      {/* ─── 13. PRICING ─── */}
      <SectionWrap id="pricing" bg="var(--card)">
        <Label gold>PRICING</Label>

        {/* Free */}
        <div style={{
          border: '1px solid var(--border-strong)',
          marginBottom: '2px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
          <div style={{ padding: 'clamp(2rem, 4vw, 3.5rem)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', color: 'var(--ink-muted)', marginBottom: '0.6rem' }}>FIRST 2 FOUNDERS</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 10vw, 6.5rem)',
              fontWeight: 400, lineHeight: 1,
              letterSpacing: '-0.03em',
              marginBottom: '0.5rem',
              color: 'var(--accent)',
            }}>₹0</h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: '1.5rem' }}>
              9-DAY FUNDRAISING DIAGNOSTIC + STRATEGY SPRINT
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-mid)', lineHeight: 1.75, maxWidth: '440px', marginBottom: '0.5rem' }}>
              I'm working with the first 2 founders at ₹0 as I refine and document the process. Same depth. No shortcuts.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: '2rem' }}>
              No payment required for either of the first two engagements.
            </p>
            <button onClick={scrollToForm} style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em',
              backgroundColor: 'var(--accent)', color: 'var(--primary-foreground)',
              border: 'none', padding: '14px 28px', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              transition: 'opacity 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              APPLY FOR THE FIRST 2 FREE SLOTS →
            </button>
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '2rem 0' }} />

        {/* Paid */}
        <div style={{ paddingBottom: '0.5rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', color: 'var(--ink-muted)', marginBottom: '0.6rem' }}>REGULAR SPRINT</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 400, lineHeight: 1,
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
            color: 'var(--ink-dark)',
          }}>₹26,000</h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: '0.75rem' }}>
            9-DAY FUNDRAISING DIAGNOSTIC + STRATEGY SPRINT
          </p>
          <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', lineHeight: 1.6, marginBottom: '0.75rem', maxWidth: '440px' }}>
            Includes: full fundraising audit, market + competitor research, investor fit shortlist, outreach system, objection map, and 90-day action plan. Final walkthrough call included.
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--ink-mid)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Same depth as the free slots. No shortcuts.
          </p>
          <button onClick={scrollToForm} style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em',
            backgroundColor: 'transparent', color: 'var(--ink-dark)',
            border: '1px solid var(--border-strong)', padding: '12px 24px', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--ink-dark)'; e.currentTarget.style.color = 'var(--background)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--ink-dark)' }}>
            APPLY FOR THE ₹26,000 SPRINT →
          </button>
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.08em', color: 'var(--ink-faint)', marginTop: '2.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
          Strategic research and advisory work only. No guarantee of funding, introductions or investment outcomes.
        </p>
      </SectionWrap>

      {/* ─── 14. APPLICATION ─── */}
      <section id="apply-form" style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(4rem, 7vw, 6rem) 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Label>APPLICATION</Label>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 400, lineHeight: 1.08, letterSpacing: '-0.015em',
            marginBottom: '1rem', maxWidth: '680px', color: 'var(--ink-dark)',
          }}>
            DON'T START THE RAISE<br />
            WITH MORE OUTREACH.<br />
            START BY UNDERSTANDING<br />
            WHAT'S ACTUALLY BROKEN.
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--ink-muted)', lineHeight: 1.7, maxWidth: '500px', marginBottom: '1.25rem' }}>
            Tell me what you're building, where you are in the raise, what's happened so far, and what currently feels unclear.
          </p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {['Apply', 'I review the context', 'If it looks like a useful fit, we talk'].map((step, i, arr) => (
              <React.Fragment key={step}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', color: i === 0 ? 'var(--accent)' : 'var(--ink-muted)', padding: '5px 10px', border: '1px solid var(--border)', backgroundColor: i === 0 ? 'rgba(201,169,110,0.08)' : 'transparent' }}>
                  {step}
                </span>
                {i < arr.length - 1 && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-faint)' }}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <div style={{ border: '1px solid var(--border)', overflow: 'hidden', backgroundColor: '#fff' }}>
            <iframe
              src={FORM_URL}
              style={{ width: '100%', height: '760px', border: 'none', display: 'block' }}
              title="Apply for Fundraising Diagnostic + Strategy Sprint"
            />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ padding: 'clamp(3rem, 5vw, 4rem) 2rem', borderTop: '2px solid var(--border-strong)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gap: '2rem' }} className="md:grid-cols-2">
          <div>
            <p style={{ fontWeight: 500, letterSpacing: '0.08em', fontSize: '13px', marginBottom: '4px', color: 'var(--ink-dark)' }}>AYUSH SINGH</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--ink-faint)', marginBottom: '1rem' }}>BUSINESS · STRATEGY · RESEARCH · AGE 17</p>
            <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', lineHeight: 1.8 }}>
              Researching companies.<br />
              Breaking down markets.<br />
              Helping founders make sense of messy fundraising problems.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start' }} className="md:items-end">
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.08em', color: 'var(--ink-faint)', lineHeight: 1.9 }} className="md:text-right">
              Fundraising strategy and research engagement.<br />
              No guarantee of funding, introductions<br />
              or investment outcomes.
            </p>
          </div>
        </div>
      </footer>

      {/* ─── BACK TO TOP ─── */}
      <BackToTop />

      {/* ─── STICKY MOBILE CTA ─── */}
      <div className="md:hidden" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: 'var(--card)',
        borderTop: '1px solid var(--border)',
        padding: '12px 1.5rem',
      }}>
        <button onClick={scrollToForm} style={{
          width: '100%',
          fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em',
          backgroundColor: 'var(--accent)', color: 'var(--primary-foreground)',
          border: 'none', padding: '14px', cursor: 'pointer',
        }}>
          APPLY FOR THE SPRINT →
        </button>
      </div>

    </div>
  )
}
