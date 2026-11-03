"use client";

import { useEffect, useState } from "react";
import { Saturn } from "./saturn";
import styles from "./cinematic-intro.module.css";

export function CinematicIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setVisible(false);
      return;
    }

    document.documentElement.dataset.cinematicIntro = "active";
    const reveal = window.setTimeout(() => { document.documentElement.dataset.cinematicIntro = "reveal"; }, 3180);
    const finish = window.setTimeout(() => { delete document.documentElement.dataset.cinematicIntro; setVisible(false); }, 3600);
    return () => { window.clearTimeout(reveal); window.clearTimeout(finish); delete document.documentElement.dataset.cinematicIntro; };
  }, []);

  if (!visible) return null;
  return <div className={styles.intro} aria-hidden="true"><Saturn className="cinematic-saturn" interactive={false} cinematic /></div>;
}
