<template>
    <div class="container mb-4" style="max-width: 1110px; padding-top: 50px">
        <form @submit="handleRegister">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-dark text-white" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">

                            <div class="mb-md-2 mt-md-2 pb-5">

                                <h2 class="fw-bold mb-5 text-uppercase">Регистрация</h2>

                                <div class="form-outline form-white mb-3">
                                    <input class="form-control form-control-lg" v-model="user.username" required />
                                    <label class="form-label" for="typeEmailX">Username</label>
                                </div>

                                <div class="form-outline form-white mb-3">
                                    <input type="email" id="typeEmailX" class="form-control form-control-lg"
                                        v-model="user.email" required />
                                    <label class="form-label" for="typeEmailX">Email</label>
                                </div>

                                <div class="form-outline form-white mb-3">
                                    <input class="form-control form-control-lg" v-model="user.first_name" required />
                                    <label class="form-label" for="typeEmailX">Имя</label>
                                </div>

                                <div class="form-outline form-white mb-3">
                                    <input class="form-control form-control-lg" v-model="user.last_name" required />
                                    <label class="form-label" for="typeEmailX">Фамилия</label>
                                </div>

                                <div class="form-outline form-white mb-3">
                                    <input type="password" id="typePasswordX" class="form-control form-control-lg"
                                        v-model="user.password" required />
                                    <label class="form-label" for="typePasswordX">Пароль</label>
                                </div>
                                <button class="btn btn-outline-light btn-lg px-5" type="submit">
                                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                    <span>Регистрация</span>
                                </button>
                            </div>

                            <div class="mb-2">
                                <p class="mb-0">Уже есть аккаунт?</p>
                                <router-link to="/login" class="text-white-50 fw-bold">Войти</router-link>
                            </div>

                            <div class="form-group mb-2">
                                <div v-if="successMessage" class="alert alert-success" role="alert">{{ successMessage }}
                                </div>
                            </div>
                            <div class="form-group mb-2">
                                <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
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
    name: 'registerUser',
    data() {
        return {
            user: {
                username: "",
                email: "",
                first_name: "",
                last_name: "",
                role_id: 2,
                password: ""
            },
            successful: false,
            successMessage: '',
            errorMessage: ''
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
    mounted() {
        if (this.loggedIn) {
            // Авторизация прошла успешно, переходим к главной странице.
            // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
            window.location.href = '/login';
        }
    },
    methods: {
        handleRegister(e) {
            this.loading = true;
            e.preventDefault();
            this.successMessage = '';
            this.errorMessage = '';
            this.$store.dispatch("auth/register", this.user) // обращаемся к методу register, который определён в auth.service.js
                .then(data => {
                    this.successMessage = data.message;
                    this.successful = true;
                })
                .catch(e => {
                    this.loading = false;
                    this.errorMessage = e.response.data.message;
                });
        }
    }
};
</script>