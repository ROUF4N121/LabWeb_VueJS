const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// Sesuaikan dengan lokasi project CI4 milikmu
const apiUrl = 'http://localhost/lab11_ci/ci4/public';

// Daftar route
const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/artikel',
        component: Artikel
    },
    {
        path: '/about',
        component: About
    }
];

// Membuat router
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// Menjalankan Vue
const app = createApp({});

app.use(router);

app.mount('#app');