<template>
    <div id="app">
        <header class="p-3 text-bg-dark">
            <div class="container" style="max-width: 1110px;">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <router-link to="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <img class="nav_logo" src="../assets/white_logo_svg.svg" alt="">
                    </router-link>

                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><router-link to="/subscriptions" class="nav-link px-2 text-white"
                                style="font-size: calc(14px + 4 * (100vw / 1440));">ПОДПИСКИ</router-link></li>
                        <li><router-link to="/feed" class="nav-link px-2 text-white"
                                style="font-size: calc(14px + 4 * (100vw / 1440));">РЕКОМЕНДАЦИИ</router-link></li>
                        <li><router-link to="/blog" class="nav-link px-2 text-white"
                                style="font-size: calc(14px + 4 * (100vw / 1440));">БЛОГ</router-link></li>
                    </ul>

                    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 search-input" role="search">
                        <input type="search" class="form-control form-control-dark" placeholder="поиск" aria-label="Search"
                            style="font-size: calc(14px + 2 * (100vw / 1440));">
                    </form>

                    <div class="text-end">
                        <div v-if="currentUser">
                            <router-link to="/profile" type="button" class="btn btn-outline-light me-2"
                                style="font-size: calc(14px + 4 * (100vw / 1440)); --bs-btn-padding-x: 1.4rem; --bs-btn-padding-y: 0.2rem;">ПРОФИЛЬ</router-link>
                            <router-link to="/favourite" type="button" class="btn btn-warning"
                                style="font-size: calc(14px + 4 * (100vw / 1440)); --bs-btn-padding-x: 1.4rem; --bs-btn-padding-y: 0.2rem;">ИЗБРАННОЕ</router-link>
                        </div>
                        <div v-else>
                            <router-link to="/login" type="button" class="btn btn-outline-light me-2"
                                style="font-size: calc(14px + 4 * (100vw / 1440)); --bs-btn-padding-x: 1.4rem; --bs-btn-padding-y: 0.2rem;">ВХОД</router-link>
                            <router-link to="/register" type="button" class="btn btn-warning"
                                style="font-size: calc(14px + 4 * (100vw / 1440)); --bs-btn-padding-x: 1.4rem; --bs-btn-padding-y: 0.2rem;">РЕГИСТРАЦИЯ</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: "NavBar",
    data() {
        return {};

    },
    computed: { // вычисляемые свойства
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
            window.location.href = '/login'; // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
        }
    }
};
</script>

<style>
body {
    font-family: "Disket Mono" !important;
}

.search-input {
    max-width: 180px !important;
}

.form-control-dark {
    border-color: var(--bs-gray);
}

.form-control-dark:focus {
    border-color: #fff;
    box-shadow: 0 0 0 .25rem rgba(255, 255, 255, .25);
}

.text-small {
    font-size: 85%;
}

.dropdown-toggle:not(:focus) {
    outline: 0;
}

.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}

.b-example-divider {
    width: 100%;
    height: 3rem;
    background-color: rgba(0, 0, 0, .1);
    border: solid rgba(0, 0, 0, .15);
    border-width: 1px 0;
    box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.b-example-vr {
    flex-shrink: 0;
    width: 1.5rem;
    height: 100vh;
}

.bi {
    vertical-align: -.125em;
    fill: currentColor;
}

.nav-scroller {
    position: relative;
    z-index: 2;
    height: 2.75rem;
    overflow-y: hidden;
}

.nav-scroller .nav {
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
}

.btn-bd-primary {
    --bd-violet-bg: #712cf9;
    --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

    --bs-btn-font-weight: 600;
    --bs-btn-color: var(--bs-white);
    --bs-btn-bg: var(--bd-violet-bg);
    --bs-btn-border-color: var(--bd-violet-bg);
    --bs-btn-hover-color: var(--bs-white);
    --bs-btn-hover-bg: #6528e0;
    --bs-btn-hover-border-color: #6528e0;
    --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
    --bs-btn-active-color: var(--bs-btn-hover-color);
    --bs-btn-active-bg: #5a23c8;
    --bs-btn-active-border-color: #5a23c8;
}

.bd-mode-toggle {
    z-index: 1500;
}

.bd-mode-toggle .dropdown-menu .active .bi {
    display: block !important;
}

.nav_logo {
    width: 60px;
    height: 52px;
}

.text-bg-dark {
    background-color: #4C2E05 !important;
}

.btn-outline-light {
    color: #000000 !important;
    --bs-btn-bg: #ffffff !important;
}

.btn-warning {
    --bs-btn-bg: #EB7D1C !important;
    --bs-btn-border-color: #EB7D1C !important;
}
</style>