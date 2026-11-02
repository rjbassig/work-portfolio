import Link from "next/link";
import { ProjectIndex } from "@/components/project-index";
import { Arrow } from "@/components/icons";
import { projects } from "@/data/site";
import { SocialIcons } from "@/components/social-icons";
import { Saturn } from "@/components/saturn";
import { TrophyIcon } from "@/components/trophy-icon";
const introStyle = { fontFamily: "Manrope, Arial, sans-serif", fontSize: 16, fontWeight: 400, lineHeight: 1.62 };
export default function Home() { return <><section className="shell home-intro"><h1>randall bassig</h1><SocialIcons labels /><div className="intro-grid"><p className="intro-context" style={introStyle}>Data Science<br />UC San Diego</p><div className="intro-copy"><p style={introStyle}>Hi, I&apos;m Randall. I study Data Science at UCSD, exploring machine learning, AI infrastructure, and the systems that make it useful.</p><p style={introStyle}>Outside of school, I read, write, train, play chess, and make music.</p></div><Saturn /></div></section><section className="shell work-section"><div className="section-head"><p className="eyebrow">01 / SELECTED WORK</p><Link href="/work" className="text-link">View all work <Arrow /></Link></div><ProjectIndex items={projects} /></section><section className="shell home-log"><p className="eyebrow">CURRENT RECORD</p><div style={{ gap: 14, alignItems: "center" }}><TrophyIcon size={30} /><p>DataHacks UCSD — 1st Place, Cloud Development. Built a wildfire simulation and visualization application that modeled geographic spread and direction.</p></div><span>ARCHIVE / 001</span></section></>; }
