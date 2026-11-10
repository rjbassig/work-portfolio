"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const slides = [
  { image: "/crash-test/collision_history.png", title: "Historical collision patterns", caption: "Monthly San Diego Police collision reports. Unit: reports per month." },
  { image: "/crash-test/model_comparison.png", title: "Held-out model comparison", caption: "2025 count error. Unit: MAE, collisions per beat-week." },
  { image: "/crash-test/risk_ranking.png", title: "Relative risk ranking", caption: "Held-out mean weekly reports for the model’s highest-ranked police beats." },
  { image: "/crash-test/calibration.png", title: "Occurrence calibration", caption: "2025 observed frequency versus probabilities calibrated on 2024 only." },
  { image: "/crash-test/feature_importance.png", title: "Feature importance", caption: "Held-out permutation importance. Predictive association is not causal explanation." },
];

export function CrashTestCarousel() {
  const cards = [slides[slides.length - 1], ...slides, slides[0]];
  const [trackIndex, setTrackIndex] = useState(1), [width, setWidth] = useState(0), [animate, setAnimate] = useState(true), [transitioning, setTransitioning] = useState(false);
  const viewport = useRef<HTMLDivElement>(null), touch = useRef<number | null>(null), resetFrame = useRef<number | null>(null);
  const active = (trackIndex + slides.length - 1) % slides.length;
  const move = (direction: -1 | 1) => { if (transitioning) return; if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setAnimate(false); setTrackIndex(index => { const next = index + direction; return next === 0 ? slides.length : next === cards.length - 1 ? 1 : next; }); requestAnimationFrame(() => setAnimate(true)); return; } setTransitioning(true); setTrackIndex(index => index + direction); };
  useLayoutEffect(() => { const node = viewport.current; if (!node) return; const update = () => setWidth(node.clientWidth); update(); const observer = new ResizeObserver(update); observer.observe(node); return () => observer.disconnect(); }, []);
  useEffect(() => () => { if (resetFrame.current !== null) cancelAnimationFrame(resetFrame.current); }, []);
  const mobile = width < 700, cardWidth = Math.max(1, Math.min(width * (mobile ? .86 : .8), 920)), gap = mobile ? 12 : 22, offset = width / 2 - cardWidth / 2 - trackIndex * (cardWidth + gap);
  const settle = () => { if (trackIndex !== 0 && trackIndex !== cards.length - 1) { setTransitioning(false); return; } setAnimate(false); setTrackIndex(trackIndex === 0 ? slides.length : 1); resetFrame.current = requestAnimationFrame(() => { resetFrame.current = requestAnimationFrame(() => { setAnimate(true); setTransitioning(false); }); }); };
  return <section className="crash-test-carousel immersive" tabIndex={0} aria-roledescription="carousel" aria-label="CRASH TEST research visualizations" onKeyDown={event => { if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } if (event.key === "ArrowRight") { event.preventDefault(); move(1); } }}><div className="immersive-viewport" ref={viewport} onPointerDown={event => { touch.current = event.clientX; }} onPointerUp={event => { if (touch.current === null) return; const distance = event.clientX - touch.current; touch.current = null; if (Math.abs(distance) > 42) move(distance > 0 ? -1 : 1); }}>{width > 0 && <div className={`immersive-track${animate ? "" : " instant"}`} onTransitionEnd={event => { if (event.target === event.currentTarget && event.propertyName === "transform") settle(); }} style={{ gap, transform: `translate3d(${offset}px,0,0)` }}>{cards.map((slide, index) => { const sourceIndex = (index + slides.length - 1) % slides.length, isActive = index === trackIndex; return <article key={`${slide.image}-${index}`} className={`immersive-card ${isActive ? "active" : ""}`} style={{ flexBasis: cardWidth }} onClick={() => { if (!isActive && Math.abs(index - trackIndex) === 1) move(index < trackIndex ? -1 : 1); }} aria-hidden={!isActive}><header><span>{String(sourceIndex + 1).padStart(2, "0")} / 05</span><h2>{slide.title}</h2></header><div className="crash-test-chart"><Image src={slide.image} alt={slide.title} fill sizes="(max-width: 700px) 86vw, 920px" priority={sourceIndex === 0} /></div><p>{slide.caption}</p></article>; })}</div>}</div><div className="immersive-controls"><button type="button" onClick={() => move(-1)} disabled={transitioning} aria-label="Previous visualization">←</button><span>{String(active + 1).padStart(2, "0")} / 05</span><button type="button" onClick={() => move(1)} disabled={transitioning} aria-label="Next visualization">→</button></div></section>;
}
