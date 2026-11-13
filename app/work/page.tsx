import { CDTechMark } from "@/components/cdtech-mark";
import { ProjectIndex } from "@/components/project-index";
import { projects } from "@/data/site";
import styles from "./work.module.css";

function LogoMark({ src, alt }: { src: string; alt: string }) {
  return <span className={styles.mark}><img src={src} alt={alt} /></span>;
}

export default function WorkPage() {
  return <section className="shell listing-page">
    <p className="eyebrow">01 / WORK</p>
    <div className="listing-head">
      <h1>projects / work</h1>
      <p>a couple of projects / work i&apos;ve done over the past few years.</p>
    </div>
    <ProjectIndex items={projects} />

    <section className={styles.group} aria-labelledby="experience-heading">
      <div className={styles.entry}>
        <div className={styles.sectionLabel}>
          <p id="experience-heading" className="eyebrow">02 / EXPERIENCE</p>
        </div>
        <div className={styles.logoCell}><CDTechMark /></div>
        <div className={styles.details}>
          <div className={styles.meta}><span>CDTech / Overloaded</span><span>Jan 2022 – Sep 2024</span></div>
          <h2>Data Science Analytics</h2>
          <p>Collected, cleaned, and analyzed customer and transactional data to improve operational workflows, identify recurring issues, and support customer fulfillment.</p>
        </div>
      </div>

      <div className={styles.entry}>
        <div className={styles.sectionLabel} aria-hidden="true" />
        <div className={styles.logoCell}><LogoMark src="/ucsd-logo-monochrome.png" alt="UC San Diego logo" /></div>
        <div className={styles.details}>
          <div className={styles.meta}><span>UC San Diego</span><span>Jan 2026 – Jun 2026</span></div>
          <h2>Undergraduate ML/AI Researcher</h2>
          <p>Analyzed geospatial and economic data with statistical methods and machine learning to investigate geographic patterns and relationships.</p>
        </div>
      </div>
    </section>

    <section className={styles.group} aria-labelledby="organizations-heading">
      <div className={styles.entry}>
        <div className={styles.sectionLabel}>
          <p id="organizations-heading" className="eyebrow">03 / ORGANIZATIONS</p>
        </div>
        <div className={styles.logoCell}><LogoMark src="/dataworks-logo-monochrome.png" alt="DataWorks UCSD logo" /></div>
        <div className={styles.details}>
          <div className={styles.meta}><span>DataWorks UCSD</span><span>Sep 2026 – Present</span></div>
          <h2>Project &amp; Consulting Member</h2>
          <p>Participating in collaborative project management and consulting activities focused on data-driven problem-solving.</p>
        </div>
      </div>

      <div className={styles.entry}>
        <div className={styles.sectionLabel} aria-hidden="true" />
        <div className={styles.logoCell}><LogoMark src="/ds3-logo.png" alt="Data Science Student Society logo" /></div>
        <div className={styles.details}>
          <div className={styles.meta}><span>Data Science Student Society (DS3)</span><span>Nov 2024 – Nov 2025</span></div>
          <h2>Data Science Researcher</h2>
          <p>Conducted data science research using Python, statistical analysis, and machine learning. Developed and evaluated predictive models to investigate patterns and test hypotheses.</p>
        </div>
      </div>
    </section>
  </section>;
}
