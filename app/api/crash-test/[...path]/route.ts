import { NextRequest } from "next/server";

const dashboard = "https://crashtest.rjbassig.dev/api/research";

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const response = await fetch(`${dashboard}/${path.join("/")}${request.nextUrl.search}`, { cache: "no-store" });
  return new Response(response.body, {
    status: response.status,
    headers: { "content-type": response.headers.get("content-type") ?? "application/json", "cache-control": "no-store" },
  });
}
