import {createRouter, createWebHistory} from "vue-router";
import Home from "@/components/Home.vue";
import AuthForm from "@/components/AuthForm.vue";

export default createRouter({
    routes: [
        {
            path: '/SpyGame', component: Home,
        },
        {
            path: '/SpyGame/auth', component: AuthForm
        }
    ],
    history: createWebHistory()
});