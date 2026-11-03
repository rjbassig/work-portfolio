"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./saturn.module.css";

function makePlanetTexture() {
  const width = 1024; const height = 512; const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height;
  const context = canvas.getContext("2d")!; const image = context.createImageData(width, height); const colors = [[67, 42, 27], [114, 75, 39], [181, 133, 69], [225, 190, 111], [245, 220, 151]];
  for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) { const latitude = y / height; const longitude = x / width * Math.PI * 2; const broadBands = Math.sin(latitude * 16 + Math.sin(longitude * 2 + latitude * 5) * 1.1) * .68; const fineBands = Math.sin(latitude * 43 + Math.sin(longitude * 5 - latitude * 7) * .55) * .23 + Math.sin(latitude * 89 + Math.sin(longitude * 3) * .4) * .07; const level = Math.max(0, Math.min(colors.length - 1.01, 2.25 + broadBands + fineBands + Math.sin(latitude * 6) * .34)); const lower = Math.floor(level); const mix = level - lower; const first = colors[lower]; const second = colors[Math.min(lower + 1, colors.length - 1)]; const shade = .89 + Math.sin(longitude * 3 + latitude * 10) * .04; const offset = (y * width + x) * 4; image.data[offset] = (first[0] + (second[0] - first[0]) * mix) * shade; image.data[offset + 1] = (first[1] + (second[1] - first[1]) * mix) * shade; image.data[offset + 2] = (first[2] + (second[2] - first[2]) * mix) * shade; image.data[offset + 3] = 255; }
  context.putImageData(image, 0, 0); const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 4; return texture;
}

function SaturnModel({ reducedMotion, cinematic }: { reducedMotion: boolean; cinematic: boolean }) {
  const planetTexture = useMemo(makePlanetTexture, []); const system = useRef<THREE.Group>(null); const tilt = useRef<THREE.Group>(null); const planetSpin = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (reducedMotion || !system.current || !tilt.current || !planetSpin.current) return;
    const time = state.clock.getElapsedTime();
    if (cinematic) {
      const growth = time < 0.5 ? time / 0.5 : Math.min((time - 0.5) / 1.7, 1);
      const scale = time < 0.5 ? 0.82 + growth * .13 : time < 2.2 ? .95 + (1.95 - .95) * (1 - (1 - growth) * (1 - growth)) : 1.95 + (10 - 1.95) * Math.pow(Math.min((time - 2.2) / 1, 1), 3);
      const acceleration = Math.min((time - 2.2) / 1, 1);
      const speed = time < 0.5 ? .45 : time < 2.2 ? .7 + growth * 3.8 : 4.5 + acceleration * acceleration * 22;
      const tiltProgress = time < 2.2 ? Math.min(time / 2.2, 1) : 1 + acceleration * acceleration * .18;
      system.current.scale.setScalar(scale);
      planetSpin.current.rotateY(delta * speed);
      tilt.current.rotation.x = .24 + .22 * tiltProgress;
      tilt.current.rotation.z = -.12 + .04 * tiltProgress;
      return;
    }
    planetSpin.current.rotateY(delta * .12);
  });
  const ringMaterial = { transparent: true, side: THREE.DoubleSide, depthWrite: false, roughness: .62, metalness: .04 };
  return <group ref={system}><group ref={tilt} rotation={[.24, 0, -.12]}><group ref={planetSpin}><mesh><sphereGeometry args={[1, 112, 112]} /><meshStandardMaterial map={planetTexture} bumpMap={planetTexture} bumpScale={.045} roughness={.78} metalness={.02} /></mesh><mesh scale={1.022}><sphereGeometry args={[1, 112, 112]} /><meshBasicMaterial color="#f1d599" transparent opacity={.075} side={THREE.BackSide} /></mesh></group><group rotation={[Math.PI / 2, 0, 0]}><mesh><ringGeometry args={[1.3, 1.46, 192]} /><meshStandardMaterial {...ringMaterial} color="#80603c" opacity={.3} /></mesh><mesh><ringGeometry args={[1.49, 1.73, 256]} /><meshStandardMaterial {...ringMaterial} color="#e4c98e" opacity={.6} /></mesh><mesh><ringGeometry args={[1.79, 1.91, 256]} /><meshStandardMaterial {...ringMaterial} color="#805d38" opacity={.16} /></mesh><mesh><ringGeometry args={[1.96, 2.12, 256]} /><meshStandardMaterial {...ringMaterial} color="#d7b878" opacity={.44} /></mesh><mesh><ringGeometry args={[2.16, 2.32, 256]} /><meshStandardMaterial {...ringMaterial} color="#f0d9a5" opacity={.25} /></mesh></group></group></group>;
}

function Scene({ reducedMotion, interactive, cinematic }: { reducedMotion: boolean; interactive: boolean; cinematic: boolean }) { return <Canvas className={styles.canvas} camera={{ position: cinematic ? [0, 2, 6.7] : [0, 1.25, 5.9], fov: cinematic ? 45 : 48, near: 0.01, far: 100 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}><hemisphereLight color="#fff1c9" groundColor="#1a1009" intensity={0.5} /><ambientLight intensity={0.28} /><directionalLight position={[3, 3, 4]} intensity={2.35} color="#ffe4ae" /><pointLight position={[-3, -1, 1]} intensity={0.38} color="#b9824b" /><SaturnModel reducedMotion={reducedMotion} cinematic={cinematic} />{interactive && <OrbitControls enableRotate enablePan={false} enableZoom={false} enableDamping dampingFactor={0.075} autoRotate={!reducedMotion} autoRotateSpeed={0.22} minPolarAngle={0.18} maxPolarAngle={Math.PI - 0.18} target={[0, 0, 0]} />}</Canvas>; }
function Fallback() { return <div className={styles.fallback} aria-hidden="true"><i /><b /><em /></div>; }

export function Saturn({ className = "", interactive = true, cinematic = false }: { className?: string; interactive?: boolean; cinematic?: boolean }) {
  const [webgl, setWebgl] = useState(false); const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => { const media = window.matchMedia("(prefers-reduced-motion: reduce)"); const update = () => setReducedMotion(media.matches); update(); media.addEventListener("change", update); const canvas = document.createElement("canvas"); setWebgl(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"))); return () => media.removeEventListener("change", update); }, []);
  return <div className={`${styles.shell} ${className}`} aria-label={interactive ? "Interactive 3D Saturn. Drag horizontally or vertically to orbit around the planet." : "Saturn animation"}>{webgl ? <Scene reducedMotion={reducedMotion} interactive={interactive} cinematic={cinematic} /> : <Fallback />}</div>;
}
