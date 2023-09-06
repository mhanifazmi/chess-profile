import { createRouter, createWebHistory } from "vue-router";
import REFERENCE_ROUTES from "./web/reference";
import DefaultLayout from "../layout/DefaultLayout";

const routes = [
    {
        path: "/",
        component: DefaultLayout, // Use the layout with navbar
        children: [
            ...REFERENCE_ROUTES,
            {
                path: "/",
                name: "dashboard",
                meta: { layout: "default-layout", title: "Home" },
                component: () => import("../pages/dashboard/index"),
            },
            // Add more routes for pages using the same layout
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    // Update the browser's title tag based on the route's meta field
    document.title = to.meta.title || "Default Title";
    next();
});

export default router;
