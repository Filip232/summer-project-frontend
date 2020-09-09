import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import storage from '@/store';
import Game from "../views/game.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/game.exe',
        name: 'Game',
        component: Game
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if ((storage.state.user.id === '')) {
        return storage.dispatch('createUser')
            .then(() => next());
    }

    return storage.dispatch('validateUser')
        .then(validationResult => {
            if (validationResult) {
                return next()
            } else {
                return storage.dispatch('createUser')
                    .then(() => next());
            }
        })
})


export default router
