import { createFileRoute } from "@tanstack/react-router";

const ALLOW = new Set([
  "query1.finance.yahoo.com",
  "query2.finance.yahoo.com",
  "www.screener.in",
  "screener.in",
  "api.tickertape.in",
  "quotes-api.tickertape.in",
  "groww.in",
  "www.groww.in",
  "www.moneycontrol.com",
  "priceapi.moneycontrol.com",
]);

function quietJson(reason: string) {
  return new Response(JSON.stringify({ proxyError: true, reason }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export const Route = createFileRoute("/api/market")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const target = new URL(request.url).searchParams.get("u") || "";
        let parsed: URL;
        try {
          parsed = new URL(target);
        } catch {
          return quietJson("bad url");
        }
        if (parsed.protocol !== "https:" || !ALLOW.has(parsed.hostname)) {
          return quietJson("blocked");
        }
        try {
          const upstream = await fetch(parsed.toString(), {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
              Accept: "application/json,text/html,text/plain,*/*",
              "Accept-Language": "en-IN,en;q=0.9",
            },
            redirect: "follow",
            signal: AbortSignal.timeout(14000),
          });
          const buf = await upstream.arrayBuffer();
          const body = buf.byteLength > 2_500_000 ? buf.slice(0, 2_500_000) : buf;
          return new Response(body, {
            status: 200,
            headers: {
              "content-type": upstream.headers.get("content-type") || "text/plain; charset=utf-8",
              "cache-control": upstream.ok ? "public, max-age=60" : "no-store",
              "x-upstream-status": String(upstream.status),
            },
          });
        } catch {
          return quietJson("upstream failed");
        }
      },
    },
  },
});
