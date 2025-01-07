import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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