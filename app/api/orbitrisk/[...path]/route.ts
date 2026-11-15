import { NextRequest } from "next/server";

const upstreamBase = "https://orbitrisk.vercel.app/api/research";

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const upstream = new URL(`${upstreamBase}/${path.join("/")}`);
  request.nextUrl.searchParams.forEach((value, key) => upstream.searchParams.set(key, value));
  const response = await fetch(upstream, { next: { revalidate: 60 } });
  return new Response(response.body, { status: response.status, headers: { "Content-Type": response.headers.get("Content-Type") || "application/json" } });
}
