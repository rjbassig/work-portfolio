import styles from "./cdtech-mark.module.css";

export function CDTechMark() {
  return <span className={styles.mark} aria-label="CDTech"><img className={styles.image} src="/cdtech-logo-monochrome.png" alt="" /></span>;
}
