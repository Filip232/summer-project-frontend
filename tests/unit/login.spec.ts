// @ts-nocheck
import Login from "@/views/Login.vue";
import {shallowMount, createLocalVue} from "@vue/test-utils";
import vuerouter from 'vue-router';


const localVue = createLocalVue();
localVue.use(vuerouter);
const router = new vuerouter()
let jsdomAlert;
let wrapper;
let spyAlert;
beforeEach(() => {
    jsdomAlert = window.alert;
    spyAlert = jest.fn();
    window.alert = spyAlert;
    wrapper = shallowMount(Login, {
        router,
        localVue,
        mocks: {
            $store: {
                commit: () => {
                },
                dispatch: () => {

                },
                state: {
                    accounts: [],
                    activeUser: {
                        name: '',
                        id: -1
                    },
                    estimate: [],
                }
            }
        }
    })
})

afterEach(() => {
    window.alert = jsdomAlert;
})

describe('inputCheckerName', () => {
    describe('when input value is not empty', () => {
        it('visiblename to be true', () => {
            wrapper.vm.login = 'elo';
            wrapper.vm.inputCheckerName();
            expect(wrapper.vm.visiblename).toBe(true);
        })
    })
    describe('when input value is empty', () => {
        it('visiblename to be false', () => {
            wrapper.vm.login = '';
            wrapper.vm.inputCheckerName();
            expect(wrapper.vm.visiblename).toBe(false);
            expect(wrapper.vm.nameInputPlaceholder).not.toBe('');
        })
    })
})

describe('passwordCheckerName', () => {
    describe('when input value is not empty', () => {
        it('visiblepassword to be true', () => {
            wrapper.vm.password = 'elo';
            wrapper.vm.inputCheckerPassword();
            expect(wrapper.vm.visiblepassword).toBe(true);
        })
    })
    describe('when input value is empty', () => {
        it('visiblename to be false', () => {
            wrapper.vm.password = '';
            wrapper.vm.inputCheckerPassword();
            expect(wrapper.vm.visiblepassword).toBe(false);
            expect(wrapper.vm.passwordInputPlaceholder).not.toBe('');
        })
    })
})

describe('focusName', () => {
    describe('when login input is focused', () => {
        it('visible name to be true and placeholder to be empty', () => {
            wrapper.vm.focusName();
            expect(wrapper.vm.visiblename).toBeTruthy();
            expect(wrapper.vm.nameInputPlaceholder).toBe('');
        })
    })
    describe('when password input is focused', () => {
        it('visible password to be true and placeholder to be empty', () => {
            wrapper.vm.focusPassword();
            expect(wrapper.vm.visiblepassword).toBeTruthy();
            expect(wrapper.vm.passwordInputPlaceholder).toBe('');
        })
    })
})

describe('onSubmit', () => {
    let storeCommitSpy;
    let storeDispatchSpy;
    let routerSpy;
    let validateSpy;
    beforeEach(() => {
        storeCommitSpy = jest.spyOn(wrapper.vm.$store, 'commit').mockReturnValue();
        storeDispatchSpy = jest.spyOn(wrapper.vm.$store, 'dispatch').mockResolvedValue();
        routerSpy = jest.spyOn(wrapper.vm.$router, 'push').mockReturnValue();
        validateSpy = wrapper.vm.$refs.loginform.validate = jest.fn();
        wrapper.vm.login = 'elo@elo.elo';
        wrapper.vm.password = 'elo';
    })
    afterEach(() => {
        storeCommitSpy.mockRestore();
        storeDispatchSpy.mockRestore();
        routerSpy.mockRestore();
        delete wrapper.vm.$refs.loginform.validate;
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
        it('when validate returns false then commit is not triggered', async () => {
            validateSpy.mockResolvedValue(false);
            wrapper.vm.onSubmit();
            await new Promise((resolve) => {
                setTimeout(() => {
                    expect(storeCommitSpy).not.toBeCalled();
                    resolve()
                });
            })
        })
        it('when dispatch is undefined then alert is called', () => {
            expect(spyAlert).toBeCalledTimes(1);
        })
        describe('when dispatch returns any data', () => {
            beforeEach(async () => {
                storeDispatchSpy.mockResolvedValueOnce({});
                wrapper.vm.onSubmit();
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    })
                })
            })
            it('then dispatch and commit is triggered', () => {
                let login = 'elo@elo.elo';
                let password = 'elo';
                expect(storeDispatchSpy).toHaveBeenCalledWith('getLogin', {
                    login: login,
                    password: password
                });
                expect(storeCommitSpy).toHaveBeenCalledWith('activeUser', {
                    user: login,
                    id: 7
                })
            })
            it('then redirect to "/home"', () => {
                expect(routerSpy).toBeCalledTimes(1);
                expect(routerSpy).toHaveBeenCalledWith('/home');
            })
        })
    })

})