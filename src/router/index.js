import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path:"/admin",
        component: () => import("../components/admins/layouts/Layout.vue"),
        meta: {
            authenticatedAdmin: true
        },
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
            {
                path: "customers",
                name: "admin.customer",
                component: () => import("@/views/admins/customers/Customer.vue"),
                meta: {description: 'Khách hàng'}
            },
        ]
    },
    {
        path: "/admin/login",
        name: "admin.login",
        component: () => import("../views/admins/auth/Login.vue"),
        meta: {
            authenticatedAdmin: false
        }
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
                path: "rooms",
                name: "room",
                component: () => import("@/views/users/Room.vue"),
            },
            {
                path: "gallery",
                name: "gallery",
                component: () => import("@/views/users/Gallery.vue"),
            },
            {
                path: "bookings",
                name: "booking",
                component: () => import("@/views/users/Booking.vue"),
            },
            {
                path: "login",
                name: "login",
                component: () => import("../views/users/Login.vue"),
            },
            {
                path: "register",
                name: "register",
                component: () => import("../views/users/Register.vue"),
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


router.beforeEach(async (to, from, next) => {
    const adminAuthenticated = localStorage.getItem('tokenAdmin') ? true : false;
  
    if (to.meta.authenticatedAdmin && !adminAuthenticated) {
      next({ name: 'admin.login'});
    } else {
       next();
    }
  });
  
  export default router;