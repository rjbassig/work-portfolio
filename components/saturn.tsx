"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./saturn.module.css";

function makeTexture(kind: "planet" | "rings") {
  const canvas = document.createElement("canvas"); canvas.width = canvas.height = 512;
  const context = canvas.getContext("2d")!;
  if (kind === "planet") {
    ["#d8bc7d", "#a9814d", "#d6b578", "#745235", "#c9a568", "#553b28", "#b58a51"].forEach((color, index) => { context.fillStyle = color; context.fillRect(0, index * 74, 512, 76); });
    for (let index = 0; index < 58; index += 1) { context.fillStyle = `rgba(52,33,18,${0.025 + (index % 6) * 0.01})`; context.fillRect(0, index * 9, 512, 2 + (index % 3)); }
  } else for (let radius = 38; radius < 256; radius += 6) { context.beginPath(); context.strokeStyle = `rgba(218,190,137,${radius % 18 === 0 ? 0.7 : 0.18})`; context.lineWidth = radius % 18 === 0 ? 2.5 : 1; context.arc(256, 256, radius, 0, Math.PI * 2); context.stroke(); }
  const result = new THREE.CanvasTexture(canvas); result.colorSpace = THREE.SRGBColorSpace; return result;
}

function SaturnModel({ reducedMotion }: { reducedMotion: boolean }) {
  const planetTexture = useMemo(() => makeTexture("planet"), []); const ringTexture = useMemo(() => makeTexture("rings"), []); const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (!reducedMotion && group.current) group.current.rotation.y += delta * 0.025; });
  return <group ref={group} rotation={[0.22, 0, -0.13]}><mesh><sphereGeometry args={[1, 72, 72]} /><meshStandardMaterial map={planetTexture} roughness={0.86} /></mesh><mesh rotation={[Math.PI / 2, 0, 0]}><ringGeometry args={[1.35, 2.28, 160]} /><meshStandardMaterial map={ringTexture} transparent opacity={0.72} side={THREE.DoubleSide} depthWrite={false} roughness={0.78} /></mesh></group>;
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) { return <Canvas className={styles.canvas} camera={{ position: [0, 1.25, 4.7], fov: 34 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}><ambientLight intensity={0.52} /><directionalLight position={[3, 3, 4]} intensity={2.2} color="#ffe4ae" /><pointLight position={[-3, -1, 1]} intensity={0.32} color="#b9824b" /><SaturnModel reducedMotion={reducedMotion} /><OrbitControls enableRotate enablePan={false} enableZoom={false} enableDamping dampingFactor={0.075} autoRotate={!reducedMotion} autoRotateSpeed={0.22} minPolarAngle={0.18} maxPolarAngle={Math.PI - 0.18} target={[0, 0, 0]} /></Canvas>; }
function Fallback() { return <div className={styles.fallback} aria-hidden="true"><i /><b /><em /></div>; }

export function Saturn() {
  const [webgl, setWebgl] = useState(false); const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => { const media = window.matchMedia("(prefers-reduced-motion: reduce)"); const update = () => setReducedMotion(media.matches); update(); media.addEventListener("change", update); const canvas = document.createElement("canvas"); setWebgl(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"))); return () => media.removeEventListener("change", update); }, []);
  return <div className={styles.shell} aria-label="Interactive 3D Saturn. Drag horizontally or vertically to orbit around the planet.">{webgl ? <Scene reducedMotion={reducedMotion} /> : <Fallback />}</div>;
}
