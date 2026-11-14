"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ProjectCarousel } from "@/components/project-carousel";

type Row = Record<string, string | number | boolean>;
export type GridcastFigure = "replay" | "accuracy" | "coverage" | "importance" | "market";

const slides: { title: string; caption: string; figure: GridcastFigure }[] = [
  { title: "Forecast replay", caption: "Observed and 24-hour forecasts with pre-fold 90% split-conformal intervals.", figure: "replay" },
  { title: "Held-out accuracy", caption: "MAE across direct horizons; all candidates use eligible held-out origins.", figure: "accuracy" },
  { title: "Interval coverage", caption: "Empirical coverage for validation-selected models against nominal 90%.", figure: "coverage" },
  { title: "Feature importance", caption: "Validation-only XGBoost permutation importance; diagnostic, not causal.", figure: "importance" },
  { title: "Market history", caption: "Daily CAISO actual system demand and NP15 day-ahead total LMP.", figure: "market" },
];
const files: Record<GridcastFigure, string> = { replay: "replay", accuracy: "accuracy", coverage: "coverage", importance: "importance", market: "market-history" };
const kinds: Record<GridcastFigure, number> = { replay: 0, accuracy: 1, coverage: 2, importance: 3, market: 4 };
const colors = ["#e4e8e2", "#8fc6ad", "#c1a370", "#7e9e9a", "#c88774", "#a1b0ae"];
const names: Record<string, string> = { persistence: "Persistence", seasonal_naive: "Weekly seasonal", ridge_100: "Ridge", ridge_1: "Ridge", xgboost: "XGBoost", lightgbm: "LightGBM", gru: "GRU" };
const n = (value: unknown) => Number(value);
const line = (points: { x: number; y: number }[]) => points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
const range = (values: number[]) => { const low = Math.min(...values), high = Math.max(...values), pad = (high - low || 1) * .08; return [low - pad, high + pad] as const; };

function Chart({ title, controls, children }: { title: string; controls: ReactNode; children: ReactNode }) { return <div className="research-chart"><div className="research-chart-head"><span>{title}</span><div>{controls}</div></div>{children}</div>; }

function Plot({ rows, fields, unit, label }: { rows: Row[]; fields: { key: string; name: string; color: string; dashed?: boolean }[]; unit: string; label: (row: Row) => string }) {
  const [hover, setHover] = useState<number | null>(null); const w = 900, h = 310, p = 48;
  const values = rows.flatMap(row => fields.map(field => n(row[field.key]))).filter(Number.isFinite);
  if (!rows.length || !values.length) return <div className="chart-loading">NO VERIFIED DATA AVAILABLE</div>;
  const [low, high] = range(values); const point = (row: Row, index: number, key: string) => ({ x: p + index / Math.max(rows.length - 1, 1) * (w - p * 2), y: h - p - (n(row[key]) - low) / (high - low) * (h - p * 2) });
  return <div className="research-plot" onPointerMove={event => { const box = event.currentTarget.getBoundingClientRect(); setHover(Math.max(0, Math.min(rows.length - 1, Math.round((event.clientX - box.left) / box.width * Math.max(rows.length - 1, 0))))); }} onPointerLeave={() => setHover(null)}><svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label(rows[hover ?? 0])}>{[.2, .4, .6, .8].map(fraction => <line key={fraction} className="chart-grid" x1={p} x2={w - p} y1={p + fraction * (h - p * 2)} y2={p + fraction * (h - p * 2)} />)}{fields.map(field => <path key={field.key} className={field.dashed ? "chart-line dashed" : "chart-line"} stroke={field.color} d={line(rows.map((row, index) => point(row, index, field.key)))} />)}{hover !== null && <><line className="chart-cursor" x1={point(rows[hover], hover, fields[0].key).x} x2={point(rows[hover], hover, fields[0].key).x} y1={p} y2={h - p} />{fields.map(field => { const q = point(rows[hover], hover, field.key); return <circle key={field.key} cx={q.x} cy={q.y} r="4" fill={field.color} />; })}</>}<text className="chart-axis" x={p} y={h - 5}>{low.toFixed(unit === "MW" ? 0 : 1)} {unit}</text><text className="chart-axis" x={w - p} y={h - 5} textAnchor="end">{high.toFixed(unit === "MW" ? 0 : 1)} {unit}</text></svg>{hover !== null && <div className="chart-tooltip"><b>{label(rows[hover])}</b>{fields.map(field => <span key={field.key}>{field.name}: {n(rows[hover][field.key]).toLocaleString(undefined, { maximumFractionDigits: 2 })} {unit}</span>)}</div>}</div>;
}

function Bars({ title, rows, value, label, suffix = "", controls }: { title: string; rows: Row[]; value: string; label: string; suffix?: string; controls: ReactNode }) {
  const w = 900, h = 310, p = 46, max = Math.max(...rows.map(row => n(row[value])), 1);
  return <Chart title={title} controls={controls}><div className="research-plot"><svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title}>{rows.map((row, index) => { const y = p + index * (h - p * 2) / rows.length, width = Math.max(0, n(row[value]) / max * (w - 250)), name = value === "coverage" ? `${row.horizon}h` : String(row.feature), display = value === "coverage" ? (n(row[value]) * 100).toFixed(1) : n(row[value]).toFixed(2); return <g key={name}><text className="chart-axis" x={p} y={y + 15}>{name}</text><rect className="chart-bar" x="230" y={y} width={width} height="19"><title>{`${name}: ${display}${suffix}`}</title></rect><text className="chart-axis" x={238 + width} y={y + 15}>{display}{suffix}</text></g>; })}</svg><div className="chart-note">{label}</div></div></Chart>;
}

function ResearchChart({ kind, rows }: { kind: number; rows: Row[] }) {
  const [target, setTarget] = useState<"demand" | "price">("demand"), [windowSize, setWindowSize] = useState(168); const data = useMemo(() => rows.filter(row => row.target === target), [rows, target]); const unit = target === "demand" ? "MW" : "USD/MWh"; const targetButton = <button type="button" onClick={() => setTarget(target === "demand" ? "price" : "demand")}>{target}</button>;
  if (kind === 0) return <Chart title={`${target.toUpperCase()} / ${target === "demand" ? "LIGHTGBM" : "RIDGE_100"} / 24H`} controls={<>{targetButton}<button type="button" onClick={() => setWindowSize(windowSize === 168 ? 48 : 168)}>{windowSize === 168 ? "7D" : "2D"}</button></>}><Plot rows={data.slice(-windowSize)} unit={unit} label={row => new Date(String(row.target_time)).toLocaleString()} fields={[{ key: "actual", name: "Observed", color: colors[0] }, { key: "prediction", name: "Forecast", color: colors[1] }, { key: "lower", name: "Lower 90%", color: "#628f84", dashed: true }, { key: "upper", name: "Upper 90%", color: "#628f84", dashed: true }]} /></Chart>;
  if (kind === 1) { const models = [...new Set(data.map(row => String(row.model)))], horizons = [1, 6, 24, 48, 168], w = 900, h = 310, p = 48, [low, high] = range(data.map(row => n(row.mae))), x = (value: number) => p + horizons.indexOf(value) / 4 * (w - p * 2), y = (value: number) => h - p - (value - low) / (high - low) * (h - p * 2); return <Chart title={`${target.toUpperCase()} / HELD-OUT MAE`} controls={targetButton}><div className="research-plot"><svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Held-out model accuracy by horizon">{models.map((model, index) => { const modelRows = data.filter(row => row.model === model).sort((a, b) => n(a.horizon) - n(b.horizon)); return <g key={model}><path className="chart-line" stroke={colors[index]} d={line(modelRows.map(row => ({ x: x(n(row.horizon)), y: y(n(row.mae)) })))} />{modelRows.map(row => <circle key={String(row.horizon)} cx={x(n(row.horizon))} cy={y(n(row.mae))} r="4" fill={colors[index]}><title>{`${names[model]} · ${row.horizon}h · ${n(row.mae).toFixed(2)} ${unit}`}</title></circle>)}</g>; })}{horizons.map(value => <text key={value} className="chart-axis" x={x(value)} y={h - 14} textAnchor="middle">{value}h</text>)}</svg><div className="chart-legend">{models.map((model, index) => <span key={model}><i style={{ background: colors[index] }} />{names[model]}</span>)}</div></div></Chart>; }
  if (kind === 2) return <Bars title={`${target.toUpperCase()} / EMPIRICAL COVERAGE`} rows={[...data].sort((a, b) => n(a.horizon) - n(b.horizon))} value="coverage" label="Empirical coverage (%)" suffix="%" controls={targetButton} />;
  if (kind === 3) return <Bars title={`${target.toUpperCase()} / XGBOOST PERMUTATION IMPORTANCE`} rows={[...data].sort((a, b) => n(b.mae_increase) - n(a.mae_increase)).slice(0, 8)} value="mae_increase" label="MAE increase after permutation" controls={targetButton} />;
  return <Chart title={target === "demand" ? "CAISO ACTUAL SYSTEM DEMAND" : "NP15 DAY-AHEAD TOTAL LMP"} controls={<>{targetButton}<button type="button" onClick={() => setWindowSize(windowSize === 168 ? 730 : 168)}>{windowSize === 168 ? "ALL" : "6M"}</button></>}><Plot rows={data.slice(-windowSize)} unit={unit} label={row => new Date(String(row.date)).toLocaleDateString()} fields={[{ key: "value", name: "Daily mean", color: target === "demand" ? colors[1] : colors[2] }]} /></Chart>;
}

export function GridcastResearchFigure({ figure }: { figure: GridcastFigure }) { const [rows, setRows] = useState<Row[] | null>(null), [failed, setFailed] = useState(false); useEffect(() => { let current = true; fetch(`/gridcast/data/${files[figure]}.json`).then(response => { if (!response.ok) throw new Error("Data export unavailable"); return response.json() as Promise<Row[]>; }).then(data => { if (current) setRows(data); }).catch(() => { if (current) setFailed(true); }); return () => { current = false; }; }, [figure]); return <div className="report-figure">{rows ? <ResearchChart kind={kinds[figure]} rows={rows} /> : <div className="chart-loading">{failed ? "VERIFIED DATA EXPORT UNAVAILABLE" : "LOADING VERIFIED RESEARCH DATA"}</div>}</div>; }

export function GridcastCarousel() {
  const [data, setData] = useState<Row[][] | null>(null);
  useEffect(() => {
    Promise.all(slides.map(slide => fetch(`/gridcast/data/${files[slide.figure]}.json`).then(response => {
      if (!response.ok) throw new Error("Data export unavailable");
      return response.json() as Promise<Row[]>;
    }))).then(setData).catch(() => setData([]));
  }, []);
  return <ProjectCarousel slides={slides.map(slide => ({ ...slide, id: slide.figure }))} label="Interactive GridCast research visualizations" reportHref="/work/gridcast/report" renderChart={(_, index) => data?.[index] ? <ResearchChart kind={index} rows={data[index]} /> : <div className="chart-loading">{data ? "VERIFIED DATA EXPORT UNAVAILABLE" : "LOADING VERIFIED RESEARCH DATA"}</div>} />;
}
