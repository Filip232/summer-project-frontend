import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'
import VuexPersistence from 'vuex-persist'
import {AccountType} from "@/models/AccountType";
import {Job} from "@/models/Job";

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

Vue.use(Vuex)

interface Account {
    type: AccountType,
    regon: string,
    email: string,
    password: string,
}

interface Estimate {
    ownerId: number,
    job: Job,
    location: string,
    bathroom: number,
    livingroom: number,
    kitchen: number,
    bedroom: number,
    hall: number,
    basement: number,
    garage: number,
    room: number,
    wardrobe: number
}

interface RoomDetails {
    roomName: string,
    roomArea: number,
    walls: {
        measurement1: number,
        measurement2: number,
        measurement3: number,
        wallType: number
    }[]
}

interface RootState {
    accounts: Account[];
    activeUser: {
        name: string,
        id: number
    };
    estimate: Estimate[];
    roomDetails: RoomDetails[];
}

export default new Vuex.Store<RootState>({
    state: {
        accounts: [],
        activeUser: {
            name: '',
            id: -1
        },
        estimate: [],
        roomDetails: []
    },
    mutations: {
        addNewUser(state, info: Account) {
            const newAccount: Account = {...info};
            if (newAccount.type !== AccountType.company) {
                delete newAccount.regon;
            }
            state.accounts.push(newAccount);
        },
        activeUser(state, {user, id}: { user: string, id: number }) {
            state.activeUser.name = user;
            state.activeUser.id = id;
        },
        logout(state) {
            state.activeUser.name = '';
            state.activeUser.id = -1;
        },
        addNewEstimate(state, info: Estimate) {
            state.estimate.push({...info, ownerId: state.activeUser.id});
        },
        deleteEstimate(state, index) {
            state.estimate.splice(index, 1);
        },
        roomDetails(state, info: RoomDetails){
            state.roomDetails.push({...info});
        }
    },
    actions: {
        getLogin ({ commit, state }, {login, password}) {
            for (let i = 0; i < state.accounts.length; i++) {
                if (state.accounts[i].email === login && state.accounts[i].password === password) {
                    return true;
                }
            }
            return false;
        },
    },
    getters: {
        getEstimateCurrentUser(state) {
            return state.estimate.filter(estimate => estimate.ownerId === state.activeUser.id)
        },
    },
    modules: {},
    plugins: [vuexLocal.plugin]
} as StoreOptions<RootState>)

