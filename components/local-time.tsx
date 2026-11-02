"use client";
import { useEffect, useState } from "react";
function formatTime() { return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit", second: "2-digit", timeZoneName: "short" }).format(new Date()); }
export function LocalTime() { const [time, setTime] = useState<string>(); useEffect(() => { const tick = () => setTime(formatTime()); tick(); const id = window.setInterval(tick, 1000); return () => window.clearInterval(id); }, []); return <span className="local-time" aria-label={time ? `Local time ${time}` : "Local time loading"}>{time ?? "LOCAL TIME"}</span>; }
