import type { MetadataRoute } from "next";

const routes = ["", "/work", "/work/gridcast", "/work/gridcast/report", "/work/crash-test", "/work/crash-test/report", "/writing", "/personal"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({ url: `https://rjbassig.dev${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: path === "" ? 1 : 0.7 }));
}
