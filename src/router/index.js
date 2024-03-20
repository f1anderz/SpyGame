import {createRouter, createWebHistory} from "vue-router";

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), routes: [{
        path: '/', name: 'home', component: () => import('@/views/HomePage.vue'),
    }, {
        path: '/rules', name: 'rules', component: () => import('@/views/RulesPage.vue')
    }, {
        path: '/locations', name: 'locations', component: () => import('@/views/LocationsWorkshopPage.vue')
    }, {
        path: '/join', name: 'join-room', component: () => import('@/views/JoinRoomPage.vue')
    }, {
        path: '/room/:id', name: 'room', component: () => import('@/views/RoomPage.vue')
    }, {
        path: '/game/:id', name: 'game', component: () => import('@/views/GamePage.vue')
    }, {
        path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundPage.vue')
    }]
});