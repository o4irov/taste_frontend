<template>
    <div class="container" style="max-width: 1110px; padding-top: 50px">
        <form @submit="handleLogin">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-dark text-white" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">

                            <div class="mb-md-5 mt-md-4 pb-5">

                                <h2 class="fw-bold mb-2 text-uppercase">Вход</h2>
                                <p class="text-white-50 mb-5">Введите email или username и пароль</p>

                                <div class="form-outline form-white mb-4">
                                    <input id="typeEmailX" class="form-control form-control-lg" v-model="user.login"
                                        required />
                                    <label class="form-label" for="typeEmailX">email/username</label>
                                </div>

                                <div class="form-outline form-white mb-4">
                                    <input type="password" id="typePasswordX" class="form-control form-control-lg"
                                        v-model="user.password" required />
                                    <label class="form-label" for="typePasswordX">Пароль</label>
                                </div>
                                <button class="btn btn-outline-light btn-lg px-5" type="submit">
                                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                    <span>Войти</span>
                                </button>
                            </div>

                            <div class="mb-2">
                                <p class="mb-0">Ещё нет аккаунта?</p>
                                <router-link to="/register" class="text-white-50 fw-bold">Регистрация</router-link>
                            </div>

                            <div class="form-group">
                                <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    name: 'loginUser',
    data() {
        return {
            user: {
                login: "",
                password: ""
            },
            loading: false,
            message: ''
        };
    },
    computed: { // вычисляемые свойства
        loggedIn() {
            return this.$store.state.auth.status.loggedIn; // $store - локальное хранилище
        }
    },
    created() {
        if (this.loggedIn) {
            // Авторизация прошла успешно, переходим к главной странице.
            // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
            window.location.href = '/';
        }
    },
    methods: {
        handleLogin(e) {
            e.preventDefault();
            this.loading = true;
            this.$store.dispatch("auth/login", this.user) // обращаемся к методу login, который определён в auth.service.js
                .then(() => {
                    window.location.href = '/feed'; // авторизация прошла успешно, переходим к главной странице. Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                })
                .catch(e => {
                    this.loading = false;
                    this.message = e.response.data.message;
                }
                );
        }
    }
};
</script>