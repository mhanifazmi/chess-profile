const REFERENCE_ROUTES = [
    {
        path: "/references",
        name: "reference.index",
        meta: { layout: "default-layout", title: "References" },
        component: () => import("../../pages/reference/index"),
    },
    {
        path: "/references/create",
        name: "reference.create",
        meta: { layout: "default-layout", title: "References - Create" },
        component: () => import("../../pages/reference/create"),
    },
    {
        path: "/references/:id",
        name: "reference.show",
        meta: { layout: "default-layout", title: "References - Details" },
        component: () => import("../../pages/reference/show"),
    },
    {
        path: "/references/:id/edit",
        name: "reference.edit",
        meta: { layout: "default-layout", title: "References - Edit" },
        component: () => import("../../pages/reference/edit"),
    },
    {
        path: "/references/:id/delete",
        name: "reference.delete",
        meta: { layout: "default-layout", title: "References - Delete" },
    },
];

export default REFERENCE_ROUTES;
