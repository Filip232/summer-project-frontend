// @ts-nocheck
import store from '@/store/index.ts'
import {AccountType} from "@/models/AccountType";
import {Job} from "@/models/Job";

describe('addNewUser', () => {
    it('when it start accounts is empty', () => {
        expect(store.state.accounts).toStrictEqual([]);
    })
    describe('when register is triggerd', () => {
        afterEach(() => {
            store.state.accounts = [];
        })
        it('and AccountType is person', () => {
            let siema = {
                type: AccountType.person,
                email: 'elo@elo.elo',
                password: 'elo',
                regon: '',
            };
            store.commit('addNewUser', siema);
            expect(store.state.accounts).toHaveLength(1);
            expect(store.state.accounts[0].regon).toBe(undefined);
        })
        it('and AccountType is company', () => {
            let siema = {
                type: AccountType.company,
                email: 'elo@elo.elo',
                password: 'elo',
                regon: '123456',
            };
            store.commit('addNewUser', siema);
            expect(store.state.accounts).toHaveLength(1);
            expect(store.state.accounts[0].regon).toBe('123456');
        })
        it('and AccountType is other', () => {
            let siema = {
                type: AccountType.other,
                email: 'elo@elo.elo',
                password: 'elo',
                regon: '',
            };
            store.commit('addNewUser', siema);
            expect(store.state.accounts).toHaveLength(1);
            expect(store.state.accounts[0].regon).toBe(undefined);
        })
    })
})

describe('activeUser', () => {
    afterEach(() => {
        store.state.activeUser = {name: '', id: -1};
    })
    it('before login', () => {
        expect(store.state.activeUser).toStrictEqual({name: '', id: -1});
    })
    it('when user is logging in', () => {
        let siema = {
            user: 'elo@elo.elo',
            id: 7
        };
        store.commit('activeUser', siema);
        expect(store.state.activeUser).toStrictEqual({name: 'elo@elo.elo', id: 7});
    })
})

describe('logout', () => {
    beforeEach(() => {
        let siema = {
            user: 'elo@elo.elo',
            id: 7
        };
        store.commit('activeUser', siema);
    })
    it('when user press logout button', () => {
        store.commit('logout');
        expect(store.state.activeUser).toStrictEqual({name: '', id: -1});
    })
})

describe('addNewEstimate', () => {
    it('when it start estimate is empty', () => {
        expect(store.state.estimate).toStrictEqual([]);
    })
    describe('when create new is triggerd', () => {
        beforeEach(() => {
            let siema = {
                user: 'elo@elo.elo',
                id: 7
            };
            store.commit('activeUser', siema);
        })
        afterEach(() => {
            store.commit('logout');
            store.state.estimate = [];
        })
        it('then add new record', () => {
            let siema = {
                location: 'Małopolska',
                job: Job.multi,
                bathroom: 1,
                livingroom: 1,
                kitchen: 1,
                bedroom: 1,
                hall: 1,
                basement: 0,
                garage: 0,
                room: 4,
                wardrobe: 0
            }
            store.commit('addNewEstimate', siema)
            expect(store.state.estimate[0]).toStrictEqual({
                location: 'Małopolska',
                job: Job.multi,
                bathroom: 1,
                livingroom: 1,
                kitchen: 1,
                bedroom: 1,
                hall: 1,
                basement: 0,
                garage: 0,
                room: 4,
                wardrobe: 0,
                ownerId: 7
            });
            expect(store.state.estimate).toHaveLength(1);
        })
    })
})

describe('deleteEstimate', () => {
    beforeEach(() => {
        store.state.estimate = [];
    })
    it('when it start estimate is empty', () => {
        expect(store.state.estimate).toStrictEqual([]);
    })
    describe('when it has record', () => {
        beforeEach(() => {
            let siema = {
                location: 'Małopolska',
                job: Job.multi,
                bathroom: 1,
                livingroom: 1,
                kitchen: 1,
                bedroom: 1,
                hall: 1,
                basement: 0,
                garage: 0,
                room: 4,
                wardrobe: 0
            }
            store.commit('addNewEstimate', siema);
        })
        afterEach(() => {
            store.state.estimate = [];
        })
        it('then delete is triggered and record removed', () => {
            let index = 0;
            store.commit('deleteEstimate', index);
            expect(store.state.estimate).toHaveLength(0);
        })
    })
})

describe('getLogin', () => {
    beforeEach(() => {
        let acc = {
            type: AccountType.person,
            email: 'elo@elo.elo',
            password: 'elo',
            regon: '',
        };
        store.commit('addNewUser', acc);
    })
    afterEach(() => {
        store.state.accounts = [];
    })
    describe('when login is correct', () => {
        let loginTrue = {
            login: 'elo@elo.elo',
            password: 'elo'
        };
        it('then its true', async () => {
            const eloTrue = await store.dispatch('getLogin', loginTrue)
            expect(eloTrue).toBeTruthy();
        })
    })
    describe('when login is incorrect', () => {
        let loginFalse = {
            login: 'elo@elo.elo',
            password: '123'
        };
        it('then its false', async () => {
            const eloFalse = await store.dispatch('getLogin', loginFalse);
            expect(eloFalse).toBeFalsy();
        })
    })
})

describe('roomDetails', () => {
    beforeEach(() => {
        store.state.roomDetails = [];
    })
    it('when it start estimate is empty', () => {
        expect(store.state.roomDetails).toStrictEqual([]);
    })
    describe('when commit is triggered', () => {
        beforeEach(() => {
            let siema = {
                roomName: 'kitchen',
                roomArea: 50,
                walls: [{measurement1: 1, measurement2: 3, measurement3: 0, wallType: 4}, {measurement1: 11, measurement2: 3, measurement3: 7, wallType: 2}]
            }
            store.commit('roomDetails', siema);
        })
        it('then record should be added',()=>{
            expect(store.state.roomDetails).toHaveLength(1);
        })
    })
})

describe('getEstimateCurrentUser',() => {
    beforeEach(() => {
        let newEstimateRecord = {
            location: 'Małopolska',
            job: Job.multi,
            bathroom: 1,
            livingroom: 1,
            kitchen: 1,
            bedroom: 1,
            hall: 1,
            basement: 0,
            garage: 0,
            room: 4,
            wardrobe: 0
        }
        store.commit('addNewEstimate', newEstimateRecord);
        store.commit('addNewEstimate', newEstimateRecord);
        store.commit('addNewEstimate', newEstimateRecord);
    })
    afterEach(() => {
        store.state.estimate = [];
    })
    it('then should have 3 new records', () => {
        expect(store.getters.getEstimateCurrentUser).toHaveLength(3);
    })
})

