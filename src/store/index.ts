import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'
import VuexPersistence from 'vuex-persist'
import {Api} from "@/api";

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

Vue.use(Vuex)

interface RootState {
    user: {
        name: string,
        id: string
        stats: {
            win: number,
            loose: number
        }
    },
}

export default new Vuex.Store<RootState>({
    state: {
        user: {
            name: '',
            id: '',
            stats: {
                win: 0,
                loose: 0
            }
        }
    },
    mutations: {
        changeUserName(state, name) {
            state.user.name = name;
            Api.fetch('users/' +state.user.id, {
                method: 'PATCH',
                body: JSON.stringify({name}),
            })
        },
        changeUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        async createUser({commit}) {
            const {user} = await Api.fetch('users', {
                method: 'POST',
            })
                .then(res => res.json());
            commit('changeUser', user);

        },
        async validateUser({state}) {
            // const {user} = await Api.fetch('users/' + state.user.id)
            //     .then(res => res.json())
            // return !!user;\
            return true;
        }
    },
    getters: {},
    modules: {},
    plugins: [vuexLocal.plugin]
} as StoreOptions<RootState>)

