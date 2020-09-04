// @ts-nocheck
import CreateEstimate from "@/views/Create-Estimate.vue";
import {shallowMount, createLocalVue} from "@vue/test-utils";
import vuerouter from 'vue-router';
import {Job} from "@/models/Job";


const localVue = createLocalVue();
localVue.use(vuerouter);
const router = new vuerouter()

let wrapper;
beforeEach(() => {
    wrapper = shallowMount(CreateEstimate, {
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

describe('onSubmit', () => {
    let storeCommitSpy
    let routerSpy
    let validateSpy
    let location = 'Małopolska';
    let job = Job.multi;
    let bathroom = 2;
    let livingroom = 3;
    let kitchen = 0;
    let bedroom = 4;
    let hall = 7;
    let basement = 1;
    let garage = 3;
    let room = 5;
    let wardrobe = 1;
    beforeEach(() => {
        storeCommitSpy = jest.spyOn(wrapper.vm.$store, 'commit').mockReturnValue();
        routerSpy = jest.spyOn(wrapper.vm.$router, 'push').mockReturnValue();
        validateSpy = wrapper.vm.$refs.estimateform.validate = jest.fn();
        wrapper.vm.location = location;
        wrapper.vm.job = job;
        wrapper.vm.rooms[0].amount = bathroom;
        wrapper.vm.rooms[1].amount = livingroom;
        wrapper.vm.rooms[2].amount = kitchen;
        wrapper.vm.rooms[3].amount = bedroom;
        wrapper.vm.rooms[4].amount = hall;
        wrapper.vm.rooms[5].amount = basement;
        wrapper.vm.rooms[6].amount = garage;
        wrapper.vm.rooms[7].amount = room;
        wrapper.vm.rooms[8].amount = wardrobe;
    })
    afterEach(() => {
        storeCommitSpy.mockRestore();
        routerSpy.mockRestore();
        delete wrapper.vm.$refs.estimateform.validate;
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
            expect(storeCommitSpy).toBeCalledTimes(1);
            expect(storeCommitSpy).toHaveBeenCalledWith('addNewEstimate', {
                location: location,
                job: job,
                bathroom: bathroom,
                livingroom: livingroom,
                kitchen: kitchen,
                bedroom: bedroom,
                hall:  hall,
                basement: basement,
                garage: garage,
                room: room,
                wardrobe: wardrobe
            })
        })
        it('then redirect to "/estimate"', () => {
            expect(routerSpy).toBeCalledTimes(1);
            expect(routerSpy).toHaveBeenCalledWith('/estimate');
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