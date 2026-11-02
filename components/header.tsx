"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { KnightMark } from "./knight-mark";
import { SocialIcons } from "./social-icons";
const links = [["/", "00 home"], ["/work", "01 work"], ["/writing", "02 writing"], ["/personal", "03 personal"]] as const;
export function Header() { const path = usePathname(); return <aside className="site-header"><Link href="/" className="wordmark" aria-label="randall bassig home"><KnightMark label /></Link><nav aria-label="Main navigation">{links.map(([href, label]) => <Link className={(href === "/" ? path === "/" : path.startsWith(href)) ? "active" : ""} href={href} key={href}>{label}</Link>)}</nav><div className="rail-bottom"><SocialIcons /></div></aside>; }
