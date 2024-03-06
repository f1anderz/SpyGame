import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/components/pages/HomePage.vue";
import AuthPage from "@/components/pages/AuthPage.vue";
import NotFoundPage from '@/components/pages/NotFoundPage.vue';
import RulesPage from '@/components/pages/RulesPage.vue';
import LocationsWorkshopPage from '@/components/pages/LocationsWorkshopPage.vue';

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