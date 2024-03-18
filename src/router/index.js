import {createRouter, createWebHistory} from "vue-router";

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), routes: [{
        path: '/SpyGame', name: 'home', component: () => import('@/views/HomePage.vue'),
    }, {
        path: '/SpyGame/rules', name: 'rules', component: () => import('@/views/RulesPage.vue')
    }, {
        path: '/SpyGame/locations', name: 'locations', component: () => import('@/views/LocationsWorkshopPage.vue')
    }, {
        path: '/SpyGame/join', name: 'join-room', component: () => import('@/views/JoinRoomPage.vue')
    }, {
        path: '/SpyGame/room/:id', name: 'room', component: () => import('@/views/RoomPage.vue')
    }, {
        path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundPage.vue')
    }]
});