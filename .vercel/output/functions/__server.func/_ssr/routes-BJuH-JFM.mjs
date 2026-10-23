import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as previewPathPrefix } from "./router-O_-Qjsx4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BJuH-JFM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function pwaHref() {
	if (typeof window === "undefined") return "/shivang/index.html";
	return `${previewPathPrefix(window.location.hostname, window.location.pathname) || ""}/shivang/index.html${window.location.search || ""}`;
}
function OpenIndexHtml() {
	(0, import_react.useEffect)(() => {
		const href = pwaHref();
		if (!window.location.pathname.endsWith("/shivang/index.html")) window.location.replace(href);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		style: {
			minHeight: "100vh",
			margin: 0,
			background: "#000",
			color: "#e8eef7",
			display: "grid",
			placeItems: "center",
			fontFamily: "system-ui, sans-serif",
			textAlign: "center",
			padding: 24
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: 18,
					fontWeight: 700,
					margin: "0 0 8px"
				},
				children: "Shivang Stocks Researcher"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					margin: "0 0 16px",
					color: "#9fb0c3"
				},
				children: "Opening index.html…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "shivang/index.html",
				style: {
					color: "#38bdf8",
					fontSize: 16
				},
				children: "Open index.html"
			})
		] })
	});
}
//#endregion
export { OpenIndexHtml as component };
