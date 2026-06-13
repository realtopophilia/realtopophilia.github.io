"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

const LINKS = [
  ["Writing", "#writing"],
  ["Work", "#work"],
  ["Silly Stuff", "#silly"],
  ["About", "#about"],
];

//  Fixed nav (gains a blurred bar after scroll) + top scroll-progress meter.
export default function Chrome({ brand = "Topophilia", github = "#" }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress, width: "100%" }} />
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#top" className="nav-brand">
          <span className="dot" />
          {brand}
        </a>
        <div className="nav-links">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
          <a className="nav-cta" href={github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </nav>
    </>
  );
}
