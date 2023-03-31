import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path:"/admin",
        component: () => import("../components/admins/layouts/Layout.vue"),
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: () => import("../views/admins/Dashboard.vue"),
                meta: {description: 'Tổng quan'}
            },
            {
                path: "rooms",
                name: "admin.room",
                component: () => import("@/views/admins/rooms/Room.vue"),
                meta: {description: 'Phòng'}
            },
            {
                path: "bookings",
                name: "admin.booking",
                component: () => import("@/views/admins/bookings/Booking.vue"),
                meta: {description: 'Đơn đặt'}
            },
        ]
    },
    {
        path: "/",
        component: () => import("../components/users/layouts/Layout.vue"),
        children: [
            {
                path: "/",
                name: "home",
                component: () => import("@/views/users/Home.vue"),
            },
            {
                path: "/rooms",
                name: "room",
                component: () => import("@/views/users/Room.vue"),
            },
            {
                path: "/gallery",
                name: "gallery",
                component: () => import("@/views/users/Gallery.vue"),
            },
            {
                path: "/:pathMatch(.*)*",
                name: "notfound",
                component: () => import("@/views/NotFound.vue"),
            }
        ]
        
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;