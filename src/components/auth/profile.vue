<template>
    <div class="container">
        <header>
            <h3>
                Профиль <strong>{{ currentUser.username }}</strong>
            </h3>
        </header>
        <p>
            <strong>Токен JWT:</strong>
            <!--вообще токен нельзя выводить на веб-странице, но для ознакомления он будет отображён на странице профиля пользователя-->
            {{ currentUser.accessToken }}
        </p>
        <p>
            <strong>Id:</strong>
            {{ currentUser.id }}
        </p>
        <p>
            <strong>Логин:</strong>
            {{ currentUser.username }}
        </p>
        <a class="item navbar-brand" href @click.prevent="logOut">
            Выйти
        </a>
    </div>
</template>
<script>
export default {
    name: 'profileUser',
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
            window.location.href = '/login'; // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
        }
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/login');
        }
    }
};
</script>