const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

const apiUrl = 'http://localhost/lab11_ci/ci4/public';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/artikel',
        component: Artikel,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/about',
        component: About,
        meta: {
            requiresAuth: true
        }
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {

    const isAuthenticated =
        localStorage.getItem('isLoggedIn') === 'true';

    if (
        to.matched.some(
            record => record.meta.requiresAuth
        ) &&
        !isAuthenticated
    ) {

        alert(
            'Akses Ditolak! Anda harus login terlebih dahulu.'
        );

        next('/login');

    } else {

        next();
    }

});


/* =====================================
   AXIOS INTERCEPTOR PRAKTIKUM 14
===================================== */

axios.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem('userToken');

        if (token) {

            config.headers['Authorization'] =
                'Bearer ' + token;
        }

        return config;
    },

    (error) => {

        return Promise.reject(error);
    }
);


axios.interceptors.response.use(

    (response) => {

        return response;
    },

    (error) => {

        if (
            error.response &&
            error.response.status === 401
        ) {

            alert(
                'Sesi Anda telah berakhir atau Token tidak sah. Silakan login kembali.'
            );

            localStorage.clear();

            window.location.href = '#/login';

            window.location.reload();
        }

        return Promise.reject(error);
    }
);


/* =====================================
   VUE APP
===================================== */

const app = createApp({

    data() {
        return {
            isLoggedIn: false
        }
    },

    mounted() {

        this.isLoggedIn =
            localStorage.getItem('isLoggedIn') === 'true';

    },

    methods: {

        logout() {

            if (
                confirm(
                    'Apakah Anda yakin ingin keluar aplikasi?'
                )
            ) {

                localStorage.removeItem(
                    'isLoggedIn'
                );

                localStorage.removeItem(
                    'userToken'
                );

                this.isLoggedIn = false;

                this.$router.push('/');
            }

        }

    }

});

app.use(router);

app.mount('#app');