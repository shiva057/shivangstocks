import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { previewPathPrefix } from "@/lib/preview-path-prefix";

export const Route = createFileRoute("/")({
  head: () => ({
    scripts: [
      {
        children: `(function(){var h=location.hostname.toLowerCase();var known=h==="preview.grok.genai.mil"||h==="preview.grok.mil"||h==="preview.grokgsac.com";var m=known?location.pathname.match(/^\\/hds-[a-z0-9]+-\\d+-[a-z0-9]+/i):null;var p=m?m[0]:"";if(!/\\/shivang\\/index\\.html$/i.test(location.pathname))location.replace(p+"/shivang/index.html"+location.search);})();`,
      },
    ],
  }),
  component: OpenIndexHtml,
});

function pwaHref() {
  if (typeof window === "undefined") return "/shivang/index.html";
  const prefix = previewPathPrefix(window.location.hostname, window.location.pathname) || "";
  return `${prefix}/shivang/index.html${window.location.search || ""}`;
}

function OpenIndexHtml() {
  useEffect(() => {
    const href = pwaHref();
    if (!window.location.pathname.endsWith("/shivang/index.html")) {
      window.location.replace(href);
    }
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        margin: 0,
        background: "#000",
        color: "#e8eef7",
        display: "grid",
        placeItems: "center",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
        padding: 24,
      }}
    >
      <div>
        <p style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>Shivang Stocks Researcher</p>
        <p style={{ margin: "0 0 16px", color: "#9fb0c3" }}>Opening index.html…</p>
        <a href="shivang/index.html" style={{ color: "#38bdf8", fontSize: 16 }}>
          Open index.html
        </a>
      </div>
    </main>
  );
}
