import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/components/HomePage.vue";
import AuthForm from "@/components/AuthPage.vue";
import NotFoundPage from '@/components/NotFoundPage.vue';

export default createRouter({
    routes: [
        {
            path: '/SpyGame', component: HomePage,
        },
        {
            path: '/SpyGame/auth', component: AuthForm
        },
        {
            path: '/:pathMatch(.*)*', component: NotFoundPage
        }
    ],
    history: createWebHistory()
});