import {createRouter, createWebHistory} from "vue-router";

export default createRouter({
    routes: [{
        path: '/SpyGame', component: () => import('@/views/HomePage.vue'),
    }, {
        path: '/SpyGame/rules', component: () => import('@/views/RulesPage.vue')
    }, {
        path: '/SpyGame/locations', component: () => import('@/views/LocationsWorkshopPage.vue')
    }, {
        path: '/SpyGame/join', component: () => import('@/views/JoinRoomPage.vue')
    }, {
        path: '/SpyGame/room/:id', component: () => import('@/views/RoomPage.vue')
    }, {
        path: '/:pathMatch(.*)*', component: () => import('@/views/NotFoundPage.vue')
    }], history: createWebHistory()
});