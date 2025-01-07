import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    // history: createWebHistory('https://luguim.github.io/World-Ranks/'),
    history: createWebHashHistory(),
    
    routes :[
        {
            path:'/home',
            name: 'Home',
            component: () => import('../views/allCountries.vue')
        },
        {
            path: '/country/:name',
            name: 'country',
            component: () => import('../views/country.vue'),
            props: true,
        }
    ]
})

export default router
