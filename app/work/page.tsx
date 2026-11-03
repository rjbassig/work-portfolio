import { ProjectIndex } from "@/components/project-index";
import { projects } from "@/data/site";
import { CDTechMark } from "@/components/cdtech-mark";
import styles from "./work.module.css";
export default function WorkPage() { return <section className="shell listing-page"><p className="eyebrow">01 / WORK</p><div className="listing-head"><h1>projects / work</h1><p>a couple of projects / work i&apos;ve done over the past few years.</p></div><ProjectIndex items={projects} /><section className={`experience ${styles.experience}`}><div className={styles.left}><p className="eyebrow">02 / EXPERIENCE</p><CDTechMark /></div><div className={styles.details}><section><span>CDTech / Overloaded</span><h2>Data Science &amp; AI Engineer</h2><p>Developing data-driven systems and AI-powered solutions, with a focus on machine learning, intelligent automation, and scalable software infrastructure.</p></section></div></section></section>; }
