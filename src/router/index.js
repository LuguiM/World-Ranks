import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    // history: createWebHistory('https://luguim.github.io/World-Ranks/'),
    history: createWebHistory(),
    
    routes :[
        {
            path:'/',
            name: 'Home',
            component: () => import('../views/allCountries.vue')
        },
        {
            path: '/country/:name',
            name: 'country',
            component: () => import('../views/country.vue')
        }
    ]
})

export default router
