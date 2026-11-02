"use client";
import { useEffect, useState } from "react";
export function ThemeToggle() { const [dark, setDark] = useState(true); useEffect(() => setDark(document.documentElement.dataset.theme !== "light"), []); function toggle() { const next = !dark; setDark(next); document.documentElement.dataset.theme = next ? "dark" : "light"; localStorage.setItem("theme", next ? "dark" : "light"); } return <button className="theme-toggle" type="button" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} mode`}><span aria-hidden="true">{dark ? "◐" : "◑"}</span></button>; }
