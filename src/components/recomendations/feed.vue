<template>
    <div id="app">
        <div class="container" style="max-width: 1110px;">
            <h4>РЕКОМЕНДАЦИИ</h4>
            <ul v-for="(el, index) in posts" :key="index" class="list-group mt-3">
                <li class="list-group-item">
                    <div style="display: flex;">
                        <img src="https://img.povar.ru/mobile/b9/bb/00/d3/buuzi_klassicheskii_recept-571569.JPG"
                            height="230px" alt="test" />
                        <div>
                            <h5>{{ el.post.title.toUpperCase() }}</h5>
                            <p>АВТОР: {{ el.author.username.toUpperCase() }}</p>
                            <p> <i class="fa-regular fa-heart"></i> {{ el.post.likes }} <i class="fa-regular fa-eye"></i> {{ el.post.views }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import http from "../../http-common";

export default {
    name: "feedUnauthenticated",
    data() {
        return {
            posts: []
        };
    },
    methods: {
        getPosts() {
            http
                .get("/posts")
                .then(response => {
                    this.posts = response.data;
                    // console.log(this.posts);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.getPosts();
    }
}
</script>

<style></style>