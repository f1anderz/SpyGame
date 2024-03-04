import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/components/HomePage.vue";
import AuthForm from "@/components/AuthPage.vue";

export default createRouter({
    routes: [
        {
            path: '/SpyGame', component: HomePage,
        },
        {
            path: '/SpyGame/auth', component: AuthForm
        }
    ],
    history: createWebHistory()
});