import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/components/HomePage.vue";
import AuthPage from "@/components/AuthPage.vue";
import NotFoundPage from '@/components/NotFoundPage.vue';
import RulesPage from '@/components/RulesPage.vue';
import LocationsWorkshopPage from '@/components/LocationsWorkshopPage.vue';

export default createRouter({
    routes: [
        {
            path: '/SpyGame', component: HomePage,
        },
        {
            path: '/SpyGame/auth', component: AuthPage
        },
        {
            path: '/SpyGame/rules', component: RulesPage
        },
        {
            path: '/SpyGame/locations', component: LocationsWorkshopPage
        },
        {
            path: '/:pathMatch(.*)*', component: NotFoundPage
        }
    ],
    history: createWebHistory()
});