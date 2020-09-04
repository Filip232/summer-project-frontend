// @ts-nocheck
import Home from "@/views/Home.vue";
import {shallowMount, createLocalVue} from "@vue/test-utils";
import vuerouter from 'vue-router';


const localVue = createLocalVue();
localVue.use(vuerouter);
const router = new vuerouter()

let wrapper;
beforeEach(() => {
    wrapper = shallowMount(Home, {
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

describe('logout', () => {
    describe('when logout is triggered', () => {
        it('commit logout', () => {
            const logoutSpy = jest.spyOn(wrapper.vm.$store,'commit').mockReturnValue();
            wrapper.vm.logout();
            expect(logoutSpy).toBeCalledTimes(1);
            expect(logoutSpy).toBeCalledWith('logout');
            logoutSpy.mockRestore();
        })
        it('push to "/"', () => {
            const pushSpy = jest.spyOn(wrapper.vm.$router, 'push').mockReturnValue();
            wrapper.vm.logout();
            expect(pushSpy).toBeCalledTimes(1);
            expect(pushSpy).toBeCalledWith('/');
            pushSpy.mockRestore();
        })
    })
})