// @ts-nocheck
import {createLocalVue, shallowMount, Wrapper} from "@vue/test-utils";
import WallDetails from "@/components/WallDetails.vue";
import vuerouter from "vue-router";

const localVue = createLocalVue();
localVue.use(vuerouter);
const router = new vuerouter()

let wrapper: Wrapper<Vue>;
beforeEach(() => {
    wrapper = shallowMount(WallDetails, {
        router,
        localVue
    })
})

describe('activeBox',() => {
    let figureBox: Wrapper<Vue>;
    beforeEach(() => {
        figureBox = wrapper.find(".figure-box");
    })
    describe('when box is inactive',() => {
        beforeEach(() => {
            figureBox.element.classList.remove("box-active");
        })
        it('box doesnt have active class', () => {
            expect(figureBox.classes()).not.toContain("box-active");
        })
        it('when clicked box should be active', async () => {
            await figureBox.trigger('click');
            expect(figureBox.classes()).toContain("box-active");
        })
    })
    describe('when box is active', () => {
        let otherBox: Wrapper<Vue>;
        let thirdInput: Wrapper<Vue>;
        beforeEach(async () => {
            otherBox = wrapper.findAll(".figure-box").at(3);
            thirdInput = wrapper.findAll(".d-f-sb-fe").at(2);
            await figureBox.trigger('click');
        })
        it('and is clicked should still be active', async () => {
            await figureBox.trigger('click');
            expect(figureBox.classes()).toContain('box-active');
        })
        it('the other box should be inactive',() => {
            expect(otherBox.classes()).not.toContain('box-active');
            expect(thirdInput.classes()).not.toContain('hidden');
        })
        describe('when the other box is clicked', () => {
            beforeEach(async () => {
                await otherBox.trigger('click');
            })
            it('the other box should be active',() => {
                expect(otherBox.classes()).toContain('box-active');
                expect(thirdInput.classes()).toContain('hidden');
            })
            it('the box should be inactive', () => {
                expect(figureBox.classes()).not.toContain('box-active');
            })
        })
    })
})

describe('onInput1', () =>{
    describe('when something is in input', () => {
        it('emit data to parent', async () => {
            wrapper.vm.measurement1 = 5;
            wrapper.vm.onInput1(wrapper.vm.measurement1);
            await wrapper.vm.$nextTick();
            expect(wrapper.emitted().getInput1Value).toBeTruthy();
            expect(wrapper.emitted().getInput1Value[0][0]).toBe(5);
        })
    })
})

describe('onInput2', () =>{
    describe('when something is in input', () => {
        it('emit data to parent', async () => {
            wrapper.vm.measurement2 = 3;
            wrapper.vm.onInput2(wrapper.vm.measurement2);
            await wrapper.vm.$nextTick();
            expect(wrapper.emitted().getInput2Value).toBeTruthy();
            expect(wrapper.emitted().getInput2Value[0][0]).toBe(3);
        })
    })
})

describe('onInput3', () =>{
    describe('when something is in input', () => {
        it('emit data to parent', async () => {
            wrapper.vm.measurement3 = 17;
            wrapper.vm.onInput3(wrapper.vm.measurement3);
            await wrapper.vm.$nextTick();
            expect(wrapper.emitted().getInput3Value).toBeTruthy();
            expect(wrapper.emitted().getInput3Value[0][0]).toBe(17);
        })
    })
})
