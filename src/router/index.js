import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/components/HomePage.vue";
import NotFoundPage from '@/components/NotFoundPage.vue';
import RulesPage from '@/components/RulesPage.vue';
import LocationsWorkshopPage from '@/components/LocationsWorkshopPage.vue';
import RoomPage from '@/components/RoomPage.vue';
import JoinRoomPage from '@/components/JoinRoomPage.vue';

export default createRouter({
    routes: [
        {
            path: '/SpyGame', component: HomePage,
        },
        {
            path: '/SpyGame/rules', component: RulesPage
        },
        {
            path: '/SpyGame/locations', component: LocationsWorkshopPage
        },
        {
            path: '/SpyGame/join', component: JoinRoomPage
        },
        {
            path: '/SpyGame/room/:id', component: RoomPage
        },
        {
            path: '/:pathMatch(.*)*', component: NotFoundPage
        }
    ],
    history: createWebHistory()
});