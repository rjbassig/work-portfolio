"use client";
import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
type Point = { position_km: [number, number, number] };
function Earth() { const ref = useRef<THREE.Group>(null); useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * .03; }); return <group ref={ref}><mesh><sphereGeometry args={[1, 64, 64]} /><meshStandardMaterial color="#2c6282" roughness={.8} metalness={.05} /></mesh><mesh scale={1.025}><sphereGeometry args={[1, 64, 64]} /><meshBasicMaterial color="#9fe1ff" transparent opacity={.12} side={THREE.BackSide} /></mesh></group>; }
function Orbit({ points, color, selected }: { points: Point[]; color: string; selected: boolean }) { const line = useMemo(() => new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(point => new THREE.Vector3(...point.position_km).multiplyScalar(1 / 6371))), new THREE.LineBasicMaterial({ color, transparent: true, opacity: selected ? .95 : .38 })), [points, color, selected]); const position = points[Math.floor(points.length / 2)]?.position_km; return <><primitive object={line} />{position && <mesh position={new THREE.Vector3(...position).multiplyScalar(1 / 6371)}><sphereGeometry args={[selected ? .045 : .025, 16, 16]} /><meshBasicMaterial color={color} /></mesh>}</>; }
export function OrbitRiskScene({ trajectories, selected }: { trajectories: { points: Point[] }[]; selected: number }) {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const update = () => setLight(document.documentElement.dataset.theme === "light");
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);
  // Space remains black in both themes; only the UI chrome changes with the theme.
  const background = "#05070a";
  const selectedColor = light ? "#245f68" : "#9fe1ff";
  const orbitColor = light ? "#6c8585" : "#657987";
  return <div className="scene" aria-label="Interactive three-dimensional Earth with public-TLE trajectories"><Canvas camera={{ position: [0, 2.5, 5.2], fov: 44 }} dpr={[1, 1.5]}><color attach="background" args={[background]} /><ambientLight intensity={.5} /><directionalLight position={[5, 3, 4]} intensity={2} color={light ? "#7b8f90" : "#b9e6ff"} /><Stars radius={50} depth={20} count={700} factor={2} saturation={0} fade speed={.2} /><Earth />{trajectories.map((trajectory, index) => <Orbit key={index} points={trajectory.points} color={index === selected ? selectedColor : orbitColor} selected={index === selected} />)}<OrbitControls enablePan={false} minDistance={3} maxDistance={10} autoRotate autoRotateSpeed={.15} /></Canvas></div>;
}
