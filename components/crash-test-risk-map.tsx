"use client";

import * as maplibregl from "maplibre-gl";
import type { MapGeoJSONFeature } from "maplibre-gl";
import proj4 from "proj4";
import { feature } from "topojson-client";
import { useEffect, useRef, useState } from "react";

maplibregl.setWorkerUrl(new URL("maplibre-gl/dist/maplibre-gl-worker.mjs", import.meta.url).toString());

proj4.defs("EPSG:2230", "+proj=lcc +lat_0=32.1666666666667 +lon_0=-116.25 +lat_1=32.7833333333333 +lat_2=33.8833333333333 +x_0=2000000 +y_0=500000 +datum=NAD83 +units=us-ft +no_defs +type=crs");

type Metric = { police_beat: string; predicted_mean: number; observed_mean: number; relative_risk: number };
type BeatResponse = { topology: { objects: { data: object } }; metrics: Metric[] };

function toWgs84(value: unknown): unknown {
  if (!Array.isArray(value)) return value;
  if (typeof value[0] === "number" && typeof value[1] === "number") return proj4("EPSG:2230", "WGS84", [value[0], value[1]]);
  return value.map(toWgs84);
}

function reproject(geometry: GeoJSON.Geometry): void {
  if ("coordinates" in geometry) geometry.coordinates = toWgs84(geometry.coordinates) as never;
  else geometry.geometries.forEach(reproject);
}

export function CrashTestRiskMap() {
  const node = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("Loading official SDPD beat boundaries…");

  useEffect(() => {
    let map: maplibregl.Map | null = null;
    let cancelled = false;
    fetch("/api/crash-test/api/geography/beats")
      .then(response => response.ok ? response.json() as Promise<BeatResponse> : Promise.reject(new Error("Verified map data unavailable")))
      .then(data => {
        if (cancelled || !node.current) return;
        const geo = feature(data.topology as never, data.topology.objects.data as never) as unknown as GeoJSON.FeatureCollection;
        geo.features.forEach(item => { if (item.geometry) reproject(item.geometry); });
        const metrics = new Map(data.metrics.map(item => [String(item.police_beat), item]));
        geo.features.forEach(item => {
          const beat = String(item.properties?.beat ?? "");
          item.properties = { ...item.properties, ...metrics.get(beat), beat };
        });
        map = new maplibregl.Map({
          container: node.current,
          style: { version: 8, sources: {}, layers: [{ id: "background", type: "background", paint: { "background-color": "#151919" } }] },
          center: [-117.14, 32.77],
          zoom: 9.6,
        });
        map.on("load", () => {
          if (!map) return;
          map.addSource("beats", { type: "geojson", data: geo });
          map.addLayer({ id: "beat-fill", type: "fill", source: "beats", paint: { "fill-color": ["interpolate", ["linear"], ["coalesce", ["get", "relative_risk"], 0], 0, "#132237", 1, "#2368ae", 2.5, "#9ed6ff"], "fill-opacity": .82 } });
          map.addLayer({ id: "beat-line", type: "line", source: "beats", paint: { "line-color": "#a6d3f2", "line-width": .55, "line-opacity": .65 } });
          map.on("mouseenter", "beat-fill", () => { map?.getCanvas().style.setProperty("cursor", "pointer"); });
          map.on("mouseleave", "beat-fill", () => { map?.getCanvas().style.setProperty("cursor", ""); });
          map.on("click", "beat-fill", event => {
            const item = event.features?.[0] as MapGeoJSONFeature | undefined;
            const metric = metrics.get(String(item?.properties?.beat ?? ""));
            if (!metric) return;
            new maplibregl.Popup({ closeButton: false, offset: 8 })
              .setLngLat(event.lngLat)
              .setHTML(`<strong>BEAT ${metric.police_beat}</strong><br/>Observed: ${metric.observed_mean.toFixed(2)} reports / week<br/>Forecast: ${metric.predicted_mean.toFixed(2)} reports / week<br/>Relative risk: ${metric.relative_risk.toFixed(2)}×`)
              .addTo(map!);
          });
          setMessage("");
        });
      })
      .catch(error => setMessage(error instanceof Error ? error.message : "Verified map data unavailable"));
    return () => { cancelled = true; map?.remove(); };
  }, []);

  return <div className="crash-map" aria-label="Interactive map of aggregate San Diego Police beat collision risk"><div ref={node} className="crash-map-canvas" />{message && <div className="crash-map-message">{message}</div>}<div className="crash-map-legend"><span>LOWER RELATIVE RISK</span><i /><span>HIGHER</span></div></div>;
}
