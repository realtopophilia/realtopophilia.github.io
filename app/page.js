import { site, writing, work, silly } from "@/data/content";
import HeroCanvas from "@/components/HeroCanvas";
import Chrome from "@/components/Chrome";
import Writing from "@/components/Writing";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main id="top">
      <Chrome brand={site.name} github={site.github} />

      {/* ============================ HERO ============================ */}
      <header className="hero">
        <HeroCanvas />
        <div className="hero-inner wrap">
          <Reveal>
            <p className="eyebrow">{site.author} · Pittsburgh</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1>
              {site.name}
              <span className="meaning">/ {site.meaning}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="hero-statement">
              Changing the shape of <span className="grad">American cities.</span>
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="hero-sub">{site.intro}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="hero-meta">
              <a className="btn btn-primary" href="#writing">
                Read the writing <span className="arrow">→</span>
              </a>
              <a className="btn" href="#work">
                See the work <span className="arrow">→</span>
              </a>
            </div>
          </Reveal>
        </div>
        <div className="scroll-cue">
          <span>Scroll</span>
          <span className="bar" />
        </div>
      </header>

      {/* ============================ INTRO ============================ */}
      <section className="intro">
        <div className="wrap intro-grid">
          <Reveal>
            <p>
              A blog in three registers:{" "}
              <span>personal essays, urban-policy memos, and small tools I build to understand the
              places I love.</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="intro-stats">
              <div className="stat">
                <b>3</b>
                <span>RIVERS · ONE CITY</span>
              </div>
              <div className="stat">
                <b>{work.length}</b>
                <span>SHIPPED PROJECTS</span>
              </div>
              <div className="stat">
                <b>∞</b>
                <span>THINGS TO FIX</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ WRITING ============================ */}
      <section className="section" id="writing">
        <div className="wrap">
          <div className="section-head">
            <Reveal>
              <p className="eyebrow">01 — Writing</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2>
                Essays and <em>policy memos</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Long-form thinking on cities and a running file of short, sharp memos on how to
                build them better.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <Writing posts={writing} />
          </Reveal>
        </div>
      </section>

      {/* ============================ WORK ============================ */}
      <section className="section work" id="work">
        <div className="wrap">
          <div className="section-head">
            <Reveal>
              <p className="eyebrow">02 — Work</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2>
                Vibecoded <em>civic tools</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Real, shipped products — mostly built fast, for Pittsburgh, to answer a question I
                couldn’t otherwise answer.
              </p>
            </Reveal>
          </div>
          <div className="work-grid">
            {work.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 0.08}>
                <a
                  className="card"
                  href={w.href}
                  target={w.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  style={{ "--h": w.accent }}
                >
                  <div className="card-top">
                    <span className="card-status">{w.status}</span>
                    <span className="card-num">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{w.title}</h3>
                  <p>{w.blurb}</p>
                  <div className="card-foot">
                    <div className="tag-row">
                      {w.tags.map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="card-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ SILLY ============================ */}
      <section className="section" id="silly">
        <div className="wrap">
          <div className="section-head">
            <Reveal>
              <p className="eyebrow">03 — Silly Stuff</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2>
                For <em>no reason</em> at all
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>Experiments, toys, and things that exist only because they were fun to make.</p>
            </Reveal>
          </div>
          <div className="silly-grid">
            {silly.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <a className="silly-item" href={s.href}>
                  <span className="emoji" aria-hidden="true">
                    {["🎬", "🏋️", "🗺️", "🛰️", "🎲", "✨"][i % 6]}
                  </span>
                  <h4>{s.title}</h4>
                  <p>{s.blurb}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ ABOUT ============================ */}
      <section className="section about" id="about">
        <div className="wrap about-grid">
          <div>
            <Reveal>
              <p className="eyebrow">04 — About</p>
            </Reveal>
            <Reveal delay={0.06}>
              <p style={{ marginTop: 24 }}>
                I’m <strong>{site.author}</strong>, a data analyst in Pittsburgh who writes about
                cities and builds small tools to understand them.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                <strong>Topophilia</strong> means <em>love of place</em>. This site is where my
                three obsessions meet: writing honestly about where I live, arguing for policy that
                makes cities more affordable and equitable, and shipping civic software fast enough
                to actually be useful.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p>
                None of it is precious. The memos are short, the code is vibecoded, and the goal is
                always the same — a city that more people can afford to love.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="contact-card">
              <p className="eyebrow">Get in touch</p>
              <a className="contact-link" href={`mailto:${site.email}`}>
                <span>Email</span>
                <span>{site.email} ↗</span>
              </a>
              <a className="contact-link" href={site.github} target="_blank" rel="noreferrer">
                <span>GitHub</span>
                <span>@realtopophilia ↗</span>
              </a>
              <a className="contact-link" href="#writing">
                <span>Latest essay</span>
                <span>Read now ↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ FOOTER ============================ */}
      <footer>
        <div className="wrap footer-row">
          <div className="footer-brand">
            {site.name} <em>/ {site.meaning}</em>
          </div>
          <p>© {new Date().getFullYear()} {site.author} · Built in Pittsburgh</p>
        </div>
      </footer>
    </main>
  );
}
