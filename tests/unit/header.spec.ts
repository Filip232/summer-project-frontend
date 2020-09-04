// @ts-nocheck
import Header from "@/components/Header.vue";
import {shallowMount, createLocalVue} from "@vue/test-utils";
import vuerouter from "vue-router";
import store from '@/store/index'

const localVue = createLocalVue();
localVue.use(vuerouter);
const router = new vuerouter()

let wrapper;
beforeEach(() => {
    wrapper = shallowMount(Header, {
        router,
        localVue,
        mocks: {
            $store: {
                commit: () => {
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

describe('showMenu', () => {
    it('when menu is hidden', function () {
        wrapper.vm.isVisible = false;
        wrapper.vm.showMenu();
        expect(wrapper.vm.isVisible).toBeTruthy();
    });
    it('when menu is shown', function () {
        wrapper.vm.isVisible = true;
        wrapper.vm.showMenu();
        expect(wrapper.vm.isVisible).toBeFalsy();
    });
})

describe('back', () => {
    it('when back is triggered', () => {
        const backSpy = jest.spyOn(wrapper.vm.$router,'back').mockReturnValue();
        wrapper.vm.back();
        expect(backSpy).toBeCalledTimes(1);
        backSpy.mockRestore();
    });
})
