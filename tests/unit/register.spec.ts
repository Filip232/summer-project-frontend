// @ts-nocheck
import {AccountType} from "@/models/AccountType";
import Register from "@/views/Register.vue";
import {shallowMount, createLocalVue} from "@vue/test-utils";
import vuerouter from 'vue-router';
import {setConfig} from "vee-validate/dist/types/config";


const localVue = createLocalVue();
localVue.use(vuerouter);
const router = new vuerouter()

let wrapper;
beforeEach(() => {
    wrapper = shallowMount(Register, {
        router,
        localVue,
        mocks: {
            $store: {
                commit: () => {
                }
            }
        }
    })
})

describe('isRegon', () => {
    it('when select = company then returns true', () => {
        wrapper.vm.select = AccountType.company;
        expect(wrapper.vm.isRegon).toBeTruthy();
    })
    it('when select = person then returns false', () => {
        wrapper.vm.select = AccountType.person;
        expect(wrapper.vm.isRegon).toBeFalsy();
    })
    it('when select = other then returns false', () => {
        wrapper.vm.select = AccountType.other;
        expect(wrapper.vm.isRegon).toBeFalsy();
    })
})

describe('onSubmit', () => {
    let storeCommitSpy
    let routerSpy
    let validateSpy
    beforeEach(() => {
        storeCommitSpy = jest.spyOn(wrapper.vm.$store, 'commit').mockReturnValue();
        routerSpy = jest.spyOn(wrapper.vm.$router, 'push').mockReturnValue();
        validateSpy = wrapper.vm.$refs.registerform.validate = jest.fn();
        wrapper.vm.select = AccountType.company;
        wrapper.vm.email = 'elo@elo.elo';
        wrapper.vm.password = 'elo';
        wrapper.vm.regon = 23456789;
    })
    afterEach(() => {
        storeCommitSpy.mockRestore();
        routerSpy.mockRestore();
        delete wrapper.vm.$refs.registerform.validate;
    })
    describe('when validate returns true', () => {
        beforeEach(async () => {
            validateSpy.mockResolvedValue(true);
            wrapper.vm.onSubmit();
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                })
            })
        })
        it('then commit is triggered', () => {
            expect(storeCommitSpy).toBeCalledTimes(1)
            let select = AccountType.company;
            let email = 'elo@elo.elo';
            let password = 'elo';
            let regon = 23456789;
            expect(storeCommitSpy).toHaveBeenCalledWith('addNewUser', {
                type: select,
                email: email,
                password: password,
                regon: regon,
            })

        })
        it('then redirect to "/"', () => {
            expect(routerSpy).toBeCalledTimes(1);
            expect(routerSpy).toHaveBeenCalledWith('/');
        })
    })
    it('when validate returns false then commit is not triggered', async () => {
        validateSpy.mockResolvedValue(false);
        wrapper.vm.onSubmit();
        await new Promise((resolve) => {
            setTimeout(() => {
                expect(storeCommitSpy).not.toBeCalled()
                resolve()
            });
        })
    })

})