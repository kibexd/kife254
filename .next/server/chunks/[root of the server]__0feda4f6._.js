module.exports = {

"[project]/.next-internal/server/app/api/admin/subscribers/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[project]/lib/subscribers.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addSubscriber": (()=>addSubscriber),
    "deleteAllSubscribers": (()=>deleteAllSubscribers),
    "deleteSubscriber": (()=>deleteSubscriber),
    "getRecentSubscribers": (()=>getRecentSubscribers),
    "getSubscriberCount": (()=>getSubscriberCount),
    "getSubscribers": (()=>getSubscribers),
    "getSubscribersByStatus": (()=>getSubscribersByStatus),
    "isEmailSubscribed": (()=>isEmailSubscribed),
    "updateSubscriberStatus": (()=>updateSubscriberStatus)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const SUBSCRIBERS_FILE = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'subscribers.json');
// Ensure the data directory exists
async function ensureDataDirectory() {
    const dataDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data');
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].access(dataDir);
    } catch  {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].mkdir(dataDir, {
            recursive: true
        });
    }
}
// Ensure the subscribers file exists
async function ensureSubscribersFile() {
    await ensureDataDirectory();
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].access(SUBSCRIBERS_FILE);
    } catch  {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(SUBSCRIBERS_FILE, JSON.stringify([], null, 2));
    }
}
async function getSubscribers() {
    await ensureSubscribersFile();
    try {
        const data = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(SUBSCRIBERS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch  {
        return [];
    }
}
async function isEmailSubscribed(email) {
    const subscribers = await getSubscribers();
    return subscribers.some((subscriber)=>subscriber.email.toLowerCase() === email.toLowerCase());
}
async function addSubscriber(subscriber) {
    const subscribers = await getSubscribers();
    // Double-check to prevent duplicates
    const existingSubscriber = subscribers.find((s)=>s.email.toLowerCase() === subscriber.email.toLowerCase());
    if (existingSubscriber) {
        throw new Error('Email already subscribed');
    }
    subscribers.push(subscriber);
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}
async function getSubscriberCount() {
    const subscribers = await getSubscribers();
    return subscribers.length;
}
async function getRecentSubscribers(limit = 10) {
    const subscribers = await getSubscribers();
    return subscribers.sort((a, b)=>new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime()).slice(0, limit);
}
async function deleteSubscriber(email) {
    const subscribers = await getSubscribers();
    const initialLength = subscribers.length;
    const updatedSubscribers = subscribers.filter((subscriber)=>subscriber.email.toLowerCase() !== email.toLowerCase());
    if (updatedSubscribers.length === initialLength) {
        // Email not found
        return false;
    }
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(SUBSCRIBERS_FILE, JSON.stringify(updatedSubscribers, null, 2));
    return true;
}
async function deleteAllSubscribers() {
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(SUBSCRIBERS_FILE, JSON.stringify([], null, 2));
}
async function updateSubscriberStatus(email, status, emailSent, notificationSent, errorMessage) {
    const subscribers = await getSubscribers();
    const subscriberIndex = subscribers.findIndex((sub)=>sub.email.toLowerCase() === email.toLowerCase());
    if (subscriberIndex !== -1) {
        subscribers[subscriberIndex] = {
            ...subscribers[subscriberIndex],
            status,
            emailSent: emailSent ?? subscribers[subscriberIndex].emailSent,
            notificationSent: notificationSent ?? subscribers[subscriberIndex].notificationSent,
            errorMessage: errorMessage || subscribers[subscriberIndex].errorMessage
        };
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
    }
}
async function getSubscribersByStatus(status) {
    const subscribers = await getSubscribers();
    if (!status) return subscribers;
    return subscribers.filter((sub)=>sub.status === status);
}
}}),
"[project]/app/api/admin/subscribers/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DELETE": (()=>DELETE),
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$4_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.4_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subscribers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/subscribers.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit');
        const recent = searchParams.get('recent');
        if (recent === 'true') {
            const limitNum = limit ? parseInt(limit) : 10;
            const subscribers = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subscribers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRecentSubscribers"])(limitNum);
            const total = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subscribers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSubscriberCount"])();
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$4_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                subscribers,
                total,
                showing: subscribers.length
            });
        } else {
            const subscribers = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subscribers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSubscribers"])();
            const total = subscribers.length;
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$4_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                subscribers,
                total
            });
        }
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$4_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to fetch subscribers',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');
        const deleteAll = searchParams.get('deleteAll');
        const deleteByStatus = searchParams.get('deleteByStatus');
        if (deleteAll === 'true') {
            // Delete all subscribers
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subscribers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteAllSubscribers"])();
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$4_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                message: 'All subscribers deleted successfully'
            });
        } else if (deleteByStatus) {
            // Delete subscribers by status
            const validStatuses = [
                'pending',
                'success',
                'failed'
            ];
            if (!validStatuses.includes(deleteByStatus)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$4_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Invalid status. Must be pending, success, or failed'
                }, {
                    status: 400
                });
            }
            // Get subscribers with the specified status
            const subscribersToDelete = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subscribers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSubscribersByStatus"])(deleteByStatus);
            // Delete each subscriber
            let deletedCount = 0;
            for (const subscriber of subscribersToDelete){
                const deleted = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subscribers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteSubscriber"])(subscriber.email);
                if (deleted) deletedCount++;
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$4_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                message: `${deletedCount} ${deleteByStatus} subscribers deleted successfully`
            });
        } else if (email) {
            // Delete specific subscriber
            const deleted = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subscribers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteSubscriber"])(email);
            if (deleted) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$4_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    message: 'Subscriber deleted successfully'
                });
            } else {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$4_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Subscriber not found'
                }, {
                    status: 404
                });
            }
        } else {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$4_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Email parameter is required'
            }, {
                status: 400
            });
        }
    } catch (error) {
        console.error('Error deleting subscriber:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$4_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to delete subscriber',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__0feda4f6._.js.map