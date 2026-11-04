"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { KnightMark } from "./knight-mark";
import { SocialIcons } from "./social-icons";
const links = [["/", "00 home"], ["/work", "01 work"], ["/writing", "02 writing"], ["/personal", "03 personal"]] as const;
export function Header() {
  const path = usePathname(); const navRef = useRef<HTMLElement>(null); const [indicator, setIndicator] = useState({ x: 0, y: 0, ready: false });
  useLayoutEffect(() => {
    const update = () => { const nav = navRef.current; const active = nav?.querySelector<HTMLAnchorElement>('a[aria-current="page"]'); if (!nav || !active) return; const navBox = nav.getBoundingClientRect(); const linkBox = active.getBoundingClientRect(); const mobile = window.matchMedia("(max-width: 800px)").matches; setIndicator(mobile ? { x: linkBox.left - navBox.left + linkBox.width / 2 - 1.5, y: linkBox.bottom - navBox.top + 5, ready: true } : { x: 0, y: linkBox.top - navBox.top + linkBox.height / 2 - 1.5, ready: true }); };
    update(); const observer = new ResizeObserver(update); if (navRef.current) observer.observe(navRef.current); window.addEventListener("resize", update); return () => { observer.disconnect(); window.removeEventListener("resize", update); };
  }, [path]);
  return <aside className="site-header"><Link href="/" className="wordmark" aria-label="randall bassig home"><KnightMark label /></Link><nav ref={navRef} aria-label="Main navigation">{links.map(([href, label]) => { const active = href === "/" ? path === "/" : path.startsWith(href); return <Link className={active ? "active" : ""} href={href} key={href} aria-current={active ? "page" : undefined}>{label}</Link>; })}<span className={`nav-indicator${indicator.ready ? " ready" : ""}`} aria-hidden="true" style={{ transform: `translate3d(${indicator.x}px, ${indicator.y}px, 0)` }} /></nav><div className="rail-bottom"><SocialIcons /></div></aside>;
}
