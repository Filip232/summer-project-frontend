import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

Vue.use(Vuex)

interface RootState {
    userName: string
}

export default new Vuex.Store<RootState>({
    state: {
        userName: ''
    },
    mutations: {
        changeUserName(state, name){
            state.userName = name;
        }
    },
    actions: {

    },
    getters: {

    },
    modules: {},
    plugins: [vuexLocal.plugin]
} as StoreOptions<RootState>)

