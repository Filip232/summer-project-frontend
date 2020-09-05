import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from "@/views/Register.vue";
import storage from '@/store';
import Estimate from "../views/Estimate.vue";
import CreateEstimate from "../views/Create-Estimate.vue";
import RoomDetails from "../views/Room-Details.vue"
import Game from "../views/game.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuthorisation: false,
            isBack: false
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            requiresAuthorisation: true,
            isBack: false
        }
    },
    {
        path: '/estimate',
        name: 'Estimate',
        component: Estimate,
        meta: {
            isBack: false
        }
    },
    {
        path: '/create-estimate',
        name: 'Create-Estimate',
        component: CreateEstimate,
        meta: {
            isBack: true
        }
    },
    {
        path: '/room-details',
        name: 'Room-Details',
        component: RoomDetails,
        meta: {
            isBack: true
        }
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
