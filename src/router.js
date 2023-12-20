import { createWebHistory, createRouter } from "vue-router";
import store from "./store/index";

import feed from './components/recomendations/feed';
import login from "./components/auth/login";
import profile from "./components/auth/profile";
import register from "./components/auth/register";

const routes = [
    {
        path: "/feed",
        name: "feedUnauthenticated",
        component: feed,
        meta: {
            title: "Рекомендации"
        }
    },
    {
        path: "/login",
        name: "loginUser",
        component:login,
        meta: {
            title: "Вход"
        }
    },
    {
        path: "/register",
        name: "registerUser",
        component: register,
        meta: {
            title: "Регистрация"
        }
    },
    {
        path: "/profile",
        name: "profileUser",
        component: profile,
        meta: {
            title: "Профиль пользователя",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach(async (to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Вкус';

    // проверяем наличие токена и срок его действия
    const auth = await store.getters["auth/isTokenActive"];
    if (auth) {
        return next();
    }
    // если токена нет или его срок действия истёк, а страница доступна только авторизованному пользователю,
    // то переходим на страницу входа в систему (ссылка на /login)
    else if (!auth && to.meta.requiredAuth) {
        const user = JSON.parse(localStorage.getItem("user"));
        await store.dispatch("auth/refreshToken", user)
            .then(() => {
                return next();
            })
            .catch(() => {
                return next({ path: "/login" });
            });
        return next({ path: "/login" });
    }
    return next();
});

export default router;