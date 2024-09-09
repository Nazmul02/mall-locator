import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import LoginPage from './views/LoginPage.vue';
import RegisterPage from './views/RegisterPage.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
    {
        path: '/home',
        component: HomePage,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        component: LoginPage,
        meta: { guest: true }
    },
    {
        path: '/register',
        component: RegisterPage,
        meta: { guest: true }
    },
    { path: '/', redirect: '/login' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Route guard for authentication
router.beforeEach((to, from, next) => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const guestOnly = to.matched.some(record => record.meta.guest);

        if (requiresAuth && !user) {
            next('/login');  // Redirect to login if not authenticated
        } else if (guestOnly && user) {
            next('/home');  // Redirect to home if already authenticated
        } else {
            next();  // Proceed normally
        }
    });
});

export default router;
