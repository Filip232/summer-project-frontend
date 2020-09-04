// @ts-nocheck
import {createLocalVue, shallowMount, Wrapper} from "@vue/test-utils";
import vuerouter from "vue-router";
import RoomDetails from "@/views/Room-Details.vue"
import {ValidationProvider} from "vee-validate";

const localVue = createLocalVue();
localVue.use(vuerouter);
const router = new vuerouter()

let wrapper;
beforeEach(() => {
    wrapper = shallowMount(RoomDetails, {
        router,
        localVue,
        stubs: {
            ValidationProvider
        },
        mocks: {
            $store: {
                commit: () => {
                }
            }
        }
    })
})

describe('wallsAmount',()=>{
    let figureBox: Wrapper<Vue>;
    describe('when amount in input change',()=>{
        beforeEach(()=>{
            figureBox = wrapper.find('#number');
        })
        it('should push x times to walls',async ()=>{
            await figureBox.setValue(2);
            expect(wrapper.vm.walls.length).toBe(2);
        })
    })
})

describe('onSubmit', () => {
    let commitSpy;
    let routerSpy;
    let validateSpy;
    beforeEach(() =>{
        commitSpy = jest.spyOn(wrapper.vm.$store, 'commit').mockReturnValue();
        routerSpy = jest.spyOn(wrapper.vm.$router, 'push').mockReturnValue();
        validateSpy = wrapper.vm.$refs.roomdetails.validate = jest.fn();
        wrapper.vm.roomName = 'kitchen';
        wrapper.vm.roomArea = 50;
        wrapper.vm.walls = [{measurement1: 1, measurement2: 3, measurement3: 4, wallType: 4}, {measurement1: 11, measurement2: 3, measurement3: 7, wallType: 2}];
    })
    afterEach(() => {
        commitSpy.mockRestore();
        routerSpy.mockRestore();
        delete wrapper.vm.$refs.roomdetails.validate;
    })
    describe('when onSubmit is triggered', () => {
        beforeEach(async () => {
            validateSpy.mockResolvedValue(true);
            wrapper.vm.onSubmit();
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                })
            })
        })
        it('send info to store',() => {
            expect(commitSpy).toBeCalledTimes(1)
            let roomName = 'kitchen';
            let roomArea = 50;
            let walls = [{measurement1: 1, measurement2: 3, measurement3: 0, wallType: 4}, {measurement1: 11, measurement2: 3, measurement3: 7, wallType: 2}];
            expect(walls.length).toBe(2);
            expect(commitSpy).toHaveBeenCalledWith('roomDetails', {
                roomName: roomName,
                roomArea: roomArea,
                walls: walls
            });
        })
        it('reditect to /estimate',()=>{
            expect(routerSpy).toBeCalledTimes(1);
            expect(routerSpy).toHaveBeenCalledWith('/estimate');
        })
    })
    it('when validate returns false then commit is not triggered', async () => {
        validateSpy.mockResolvedValue(false);
        wrapper.vm.onSubmit();
        await new Promise((resolve) => {
            setTimeout(() => {
                expect(commitSpy).not.toBeCalled()
                resolve()
            });
        })
    })
})