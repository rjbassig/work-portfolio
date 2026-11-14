"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

export type CarouselSlide = { id: string; title: string; caption: string };

export function ProjectCarousel<T extends CarouselSlide>({
  slides,
  label,
  reportHref,
  renderChart,
}: {
  slides: T[];
  label: string;
  reportHref?: string;
  renderChart: (slide: T, index: number) => ReactNode;
}) {
  const cards = [slides[slides.length - 1], ...slides, slides[0]];
  const [trackIndex, setTrackIndex] = useState(1);
  const [width, setWidth] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const resetFrames = useRef<number[]>([]);
  const active = (trackIndex + slides.length - 1) % slides.length;

  const move = (direction: -1 | 1) => {
    if (transitioning) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimate(false);
      setTrackIndex(index => {
        const next = index + direction;
        return next === 0 ? slides.length : next === cards.length - 1 ? 1 : next;
      });
      requestAnimationFrame(() => setAnimate(true));
      return;
    }
    setTransitioning(true);
    setTrackIndex(index => index + direction);
  };

  useLayoutEffect(() => {
    const node = viewport.current;
    if (!node) return;
    const update = () => setWidth(node.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => resetFrames.current.forEach(cancelAnimationFrame), []);

  const mobile = width < 700;
  const cardWidth = Math.max(1, Math.min(width * (mobile ? 0.86 : 0.8), 920));
  const gap = mobile ? 12 : 22;
  const offset = width / 2 - cardWidth / 2 - trackIndex * (cardWidth + gap);
  const interactive = (target: EventTarget | null) => target instanceof Element && Boolean(target.closest("button, a, input, select, .research-chart, .crash-live-chart"));
  const settle = () => {
    if (trackIndex !== 0 && trackIndex !== cards.length - 1) {
      setTransitioning(false);
      return;
    }
    setAnimate(false);
    setTrackIndex(trackIndex === 0 ? slides.length : 1);
    const first = requestAnimationFrame(() => {
      const second = requestAnimationFrame(() => {
        setAnimate(true);
        setTransitioning(false);
      });
      resetFrames.current.push(second);
    });
    resetFrames.current.push(first);
  };

  return <section className="immersive" tabIndex={0} aria-roledescription="carousel" aria-label={label} onKeyDown={event => {
    if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
  }}>
    <div className="immersive-viewport" ref={viewport} onPointerDown={event => {
      if (!interactive(event.target)) touchStart.current = event.clientX;
    }} onPointerUp={event => {
      if (touchStart.current === null) return;
      const distance = event.clientX - touchStart.current;
      touchStart.current = null;
      if (Math.abs(distance) > 42) move(distance > 0 ? -1 : 1);
    }}>
      {width > 0 && <div className={`immersive-track${animate ? "" : " instant"}`} onTransitionEnd={event => {
        if (event.target === event.currentTarget && event.propertyName === "transform") settle();
      }} style={{ gap, transform: `translate3d(${offset}px,0,0)` }}>
        {cards.map((slide, index) => {
          const sourceIndex = (index + slides.length - 1) % slides.length;
          const isActive = index === trackIndex;
          return <article key={`${slide.id}-${index}`} className={`immersive-card ${isActive ? "active" : ""}`} style={{ flexBasis: cardWidth }} onClick={event => {
            if (interactive(event.target) || isActive || Math.abs(index - trackIndex) !== 1) return;
            move(index < trackIndex ? -1 : 1);
          }} aria-hidden={!isActive}>
            <header><span>{String(sourceIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span><h2>{slide.title}</h2></header>
            {renderChart(slide, sourceIndex)}
            <p>{slide.caption}</p>
          </article>;
        })}
      </div>}
    </div>
    <div className="immersive-controls">
      <button type="button" onClick={() => move(-1)} disabled={transitioning} aria-label="Previous visualization">←</button>
      <span>{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
      <button type="button" onClick={() => move(1)} disabled={transitioning} aria-label="Next visualization">→</button>
      {reportHref && <a href={reportHref}>VIEW RESEARCH REPORT ↗</a>}
    </div>
  </section>;
}
