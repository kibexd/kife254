(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_bdc7b0f9._.js", {

"[project]/components/theme-provider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeProvider": (()=>ThemeProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ThemeProvider({ children, ...props }) {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Ensure we only render theme-dependent components after hydration
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            setMounted(true);
        }
    }["ThemeProvider.useEffect"], []);
    // Set default theme to dark if system preference is not available
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            if (mounted) {
                const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const currentTheme = localStorage.getItem("theme");
                if (!currentTheme) {
                    // If no theme is set, use system preference or default to dark
                    const newTheme = systemPrefersDark ? "system" : "dark";
                    localStorage.setItem("theme", newTheme);
                }
            }
        }
    }["ThemeProvider.useEffect"], [
        mounted
    ]);
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/theme-provider.tsx",
        lineNumber: 33,
        columnNumber: 10
    }, this);
}
_s(ThemeProvider, "BShlRgxf1Xjno/mi6QXyq9ZqIDE=");
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/contexts/layout-context.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "LayoutProvider": (()=>LayoutProvider),
    "useLayout": (()=>useLayout)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const LayoutContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Debounce utility function
const debounce = (func, delay)=>{
    let timeout;
    return (...args)=>{
        clearTimeout(timeout);
        timeout = setTimeout(()=>func(...args), delay);
    };
};
function LayoutProvider({ children }) {
    _s();
    // Initialize layoutMode to a server-safe default. It will be updated client-side.
    const [layoutMode, setLayoutMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("standard");
    const [isTransitioning, setIsTransitioning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // null means not determined yet
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LayoutProvider.useEffect": ()=>{
            // This effect runs only on the client after initial render
            const initialIsMobile = window.innerWidth < 768;
            setIsMobile(initialIsMobile);
            const savedLayout = localStorage.getItem("layoutMode");
            let initialLayout;
            if (initialIsMobile) {
                initialLayout = "standard";
            } else {
                initialLayout = savedLayout || "sidebar"; // Default to sidebar if desktop and no saved preference
            }
            setLayoutMode(initialLayout);
            const handleResize = {
                "LayoutProvider.useEffect.handleResize": ()=>{
                    const currentIsMobile = window.innerWidth < 768;
                    if (isMobile !== currentIsMobile) {
                        setIsMobile(currentIsMobile);
                    }
                }
            }["LayoutProvider.useEffect.handleResize"];
            const debouncedHandleResize = debounce(handleResize, 100);
            window.addEventListener("resize", debouncedHandleResize);
            return ({
                "LayoutProvider.useEffect": ()=>window.removeEventListener("resize", debouncedHandleResize)
            })["LayoutProvider.useEffect"];
        }
    }["LayoutProvider.useEffect"], []); // Run only once on mount
    // Effect to update layoutMode when isMobile changes (after initial setup)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LayoutProvider.useEffect": ()=>{
            // Only proceed if isMobile has been determined
            if (isMobile === null) return;
            let desiredLayout;
            if (isMobile) {
                desiredLayout = "standard";
            } else {
                const savedLayout = localStorage.getItem("layoutMode");
                desiredLayout = savedLayout || "sidebar";
            }
            if (layoutMode !== desiredLayout) {
                setLayoutMode(desiredLayout);
            }
        }
    }["LayoutProvider.useEffect"], [
        isMobile,
        layoutMode
    ]); // Depend only on isMobile and layoutMode (for comparison)
    const toggleLayout = ()=>{
        // Only allow toggling if isMobile has been determined and it's not mobile
        if (isMobile !== null && !isMobile) {
            setLayoutMode((prev)=>{
                const newMode = prev === "standard" ? "sidebar" : "standard";
                localStorage.setItem("layoutMode", newMode);
                return newMode;
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LayoutContext.Provider, {
        value: {
            layoutMode,
            toggleLayout,
            isTransitioning
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/layout-context.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
_s(LayoutProvider, "z9lZoxo8TonM4Wpq1hYphWzQL58=");
_c = LayoutProvider;
function useLayout() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LayoutContext);
    if (context === undefined) {
        throw new Error("useLayout must be used within a LayoutProvider");
    }
    return context;
}
_s1(useLayout, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "LayoutProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_bdc7b0f9._.js.map