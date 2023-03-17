import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/gallery",
        name: "gallery",
        component: () => import("@/views/Gallery.vue"),
    },
    {
        path: "/",
        name: "room",
        component: () => import("@/views/Room.vue"),
    },
    {
        path: "/add",
        name: "room.add",
        component: () => import("@/views/RoomAdd.vue"),
    },
    {
        path: "/rooms/:id",
        name: "room.edit",
        component: () => import("@/views/RoomEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;