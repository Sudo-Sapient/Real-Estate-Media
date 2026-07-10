"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={diagonal ? "M6 18 18 6M9 6h9v9" : "M4 12h16m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Logo() {
  return <span className="sudo-logo" aria-label="Sudo Estate"><span>SUDO</span><i /><span>ESTATE</span></span>;
}

function IntroLoader() {
  return (
    <div className="intro-loader" aria-hidden="true">
      <div className="intro-loader__top"><Logo /></div>
      <div className="intro-loader__statement"><div className="clip-line"><span>A listing is seen.</span></div><div className="clip-line"><span><em>A campaign is felt.</em></span></div></div>
      <div className="intro-loader__bar" />
    </div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const links = [["Work", "#work"], ["How it works", "#process"], ["Contact", "#contact"]];

  return (
    <header className="focus-nav">
      <a href="#top"><Logo /></a>
      <nav>{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <a className="focus-nav__cta" href="#contact">Send a project <Arrow diagonal /></a>
      <button className="focus-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}><span /><span /></button>
      <AnimatePresence>
        {open && <motion.div className="focus-mobile-menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: .45, ease: EASE }}><Logo />{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<Arrow diagonal /></a>)}</motion.div>}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    if (reduceMotion) return;
    gsap.from(".focus-hero__line span", { yPercent: 115, duration: 1, stagger: .075, delay: 1.05, ease: "power4.out" });
    gsap.from(".focus-hero__fade", { opacity: 0, y: 18, duration: .75, stagger: .08, delay: 1.28, ease: "power3.out" });
    gsap.to(".focus-hero__image img", { scale: 1.08, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: .6 } });
  }, { scope: ref, dependencies: [reduceMotion] });

  return (
    <section id="top" ref={ref} className="focus-hero">
      <Navigation />
      <div className="focus-hero__image"><Image src="/estate/hero-villa.jpg" alt="Cinematic luxury property advertisement" fill priority sizes="100vw" className="object-cover" /><div /></div>
      <div className="focus-hero__content">
        <p className="focus-eyebrow focus-hero__fade">AI-assisted property films · Human-directed</p>
        <h1>
          <span className="focus-hero__line"><span>Turn property assets</span></span>
          <span className="focus-hero__line"><span>into <em>cinematic ads.</em></span></span>
        </h1>
        <div className="focus-hero__bottom focus-hero__fade">
          <p>Send your renders, photographs, floor plans, or listing URL. We create campaign-ready films and social assets.</p>
          <div><a className="focus-button focus-button--light" href="#work">See the transformation <Arrow /></a><a className="focus-button focus-button--ghost" href="#contact">Send a project <Arrow diagonal /></a></div>
        </div>
      </div>
    </section>
  );
}

function Transformation() {
  const [position, setPosition] = useState(52);
  return (
    <section id="work" className="focus-proof">
      <div className="focus-section-head">
        <span className="focus-eyebrow">What you send → what we create</span>
        <h2>From static listing<br />to <em>campaign-ready creative.</em></h2>
        <p>This self-initiated concept study demonstrates our intended treatment. It is not presented as client work or a performance case study.</p>
      </div>
      <div className="focus-compare">
        <Image src="/estate/living-room.jpg" alt="Original property listing asset" fill sizes="100vw" className="object-cover focus-compare__source" />
        <div className="focus-compare__source-label">Source asset</div>
        <div className="focus-compare__result" style={{ width: `${position}%` }}>
          <div className="focus-compare__result-inner">
            <Image src="/estate/interior.jpg" alt="Sudo Estate campaign treatment" fill sizes="100vw" className="object-cover" />
            <div className="focus-compare__grade" />
            <div className="focus-compare__copy"><small>A SUDO ESTATE CONCEPT</small><strong>Live beyond<br /><em>the expected.</em></strong></div>
          </div>
          <div className="focus-compare__result-label">Campaign treatment</div>
        </div>
        <div className="focus-compare__handle" style={{ left: `${position}%` }}><span>↔</span></div>
        <input type="range" min="12" max="88" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label="Compare source property asset with campaign treatment" />
      </div>
      <div className="focus-proof__outputs"><span>Hero property film</span><span>Opening hooks</span><span>9:16 · 4:5 · 1:1 cuts</span><span>Campaign stills</span></div>
    </section>
  );
}

const benefits = [
  ["01", "Launch faster", "Create campaign-ready property films without waiting for a traditional shoot or rebuilding production from zero."],
  ["02", "Create more", "Turn one approved direction into multiple hooks, formats, stills, and social variations."],
  ["03", "Stay controlled", "Every output is human-directed and reviewed for visual consistency, realism, and brand alignment."],
];

function Benefits() {
  return (
    <section className="focus-benefits">
      <div className="focus-benefits__title"><span className="focus-eyebrow">Why Sudo Estate</span><h2>Launch faster.<br />Create more.<br /><em>Stay on brand.</em></h2></div>
      <div className="focus-benefits__list">{benefits.map(([number, title, copy]) => <article key={number}><span>/{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
  );
}

const steps = [
  ["01", "Send the property", "Share the listing or project URL, available assets, brand references, and launch objective."],
  ["02", "Approve the direction", "We present the campaign idea, visual treatment, and storyboard before full production."],
  ["03", "Receive the campaign", "After review, we deliver the approved films, hooks, formats, and campaign assets."],
];

function Process() {
  return (
    <section id="process" className="focus-process">
      <div className="focus-section-head focus-section-head--dark"><span className="focus-eyebrow">How it works</span><h2>Send it.<br />Approve it.<br /><em>Launch it.</em></h2><p>Start with one property. If the working relationship and output are right, we can scale into recurring or portfolio-wide production.</p></div>
      <div className="focus-process__steps">{steps.map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
    </section>
  );
}

function SpecCampaign() {
  return (
    <section className="focus-spec">
      <div className="focus-spec__visual"><Image src="/estate/modern-home.jpg" alt="Spec property launch campaign" fill sizes="60vw" className="object-cover" /><div /><span>Independent spec campaign</span><strong>THE<br /><em>AFTER DARK</em><br />CUT</strong></div>
      <div className="focus-spec__content"><span className="focus-eyebrow">An honest sample scope</span><h2>One property.<br /><em>One launch world.</em></h2><p>For a project with existing renders, photographs, a brochure, and brand guidelines, a focused first engagement could include:</p><ul><li>Campaign direction and storyboard</li><li>One hero property film</li><li>Multiple opening hooks</li><li>Vertical, portrait, and square cuts</li><li>Campaign stills and launch copy</li></ul><small>This is an illustrative spec scope—not completed client work or a performance claim.</small><a href="#contact">Start with one property <Arrow diagonal /></a></div>
    </section>
  );
}

type FormStatus = "idle" | "sending" | "success" | "error";

function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending"); setMessage("");
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || "Unable to send your project.");
      form.reset(); setStatus("success");
    } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Unable to send your project."); }
  }

  return (
    <section id="contact" className="focus-contact">
      <div className="focus-contact__intro"><span className="focus-eyebrow">Start with one property</span><h2>Send us the project.<br /><em>We’ll show you what it could become.</em></h2><p>A listing, a development launch, or a portfolio conversation. We’ll recommend the simplest sensible starting point.</p></div>
      <div className="focus-contact__form">
        <AnimatePresence mode="wait">
          {status === "success" ? <motion.div key="success" className="focus-success" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}><span>✓</span><h3>Project received.</h3><p>We’ll review the property and reply with the best next step.</p><button onClick={() => setStatus("idle")}>Send another project</button></motion.div> :
          <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="focus-form-row"><label><span>Your name</span><input name="name" required autoComplete="name" placeholder="Name" /></label><label><span>Work email</span><input name="email" required type="email" autoComplete="email" placeholder="Email" /></label></div>
            <div className="focus-form-row"><label><span>Company</span><input name="company" required autoComplete="organization" placeholder="Company or brokerage" /></label><label><span>WhatsApp <em>(optional)</em></span><input name="phone" type="tel" autoComplete="tel" placeholder="Phone" /></label></div>
            <label><span>Property or project URL</span><input name="listingUrl" required type="url" placeholder="Paste the live link" /></label>
            <label><span>What should this campaign achieve?</span><textarea name="goal" rows={3} placeholder="Launch awareness, stronger enquiries, a faster sale…" /></label>
            <input name="engagement" type="hidden" value="Initial project enquiry" /><input name="propertyType" type="hidden" value="To be discussed" /><input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
            {status === "error" && <p className="focus-form-error">{message}</p>}
            <button className="focus-submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send the project"}<Arrow diagonal /></button>
          </motion.form>}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="focus-footer">
      <div className="focus-footer__top"><span className="focus-eyebrow">Have a property worth remembering?</span><a href="#contact">Start with one project <Arrow diagonal /></a></div>
      <a href="#contact" className="focus-footer__statement">LET’S MAKE<br /><em>THE LISTING MOVE.</em></a>
      <div className="focus-footer__bottom">
        <div><Logo /><p>AI-assisted property films.<br />Human-directed from brief to delivery.</p></div>
        <nav><a href="#work">Work</a><a href="#process">How it works</a><a href="#contact">Contact</a></nav>
        <div className="focus-footer__availability"><span>Available for select projects</span><strong>India · Remote worldwide</strong></div>
      </div>
      <div className="focus-footer__legal"><span>© {new Date().getFullYear()} Sudo Estate</span><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}

export default function SudoEstateOnboarding() {
  return <main className="focus-site"><IntroLoader /><Hero /><Transformation /><Benefits /><Process /><SpecCampaign /><Contact /><Footer /></main>;
}
