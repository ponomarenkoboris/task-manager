<template>
    <div class="container">
        <article ref="modalWind" class="universal-wrapper">
            <div class="title-wrapper">
                <p><strong>{{ appointment }}</strong></p>
                <span ref="closeModalBtn" class="close-card-icon">
                    <i class="fas fa-times"></i>
                </span>
            </div>
            <div class="form-wrapper">
                <input type="text" class="new-goal__name" v-model="newGoal.goalName" placeholder="Goal name">
                <input type="number" class="new-goal__priority" v-model="newGoal.goalPriority" placeholder="Choose priority (from 1 to whatever you want)">
                <input type="text" class="new-goal__description" v-model="newGoal.description" placeholder="Description">
            </div>
            <div class="create-btn-wrapper">
                <button class="btn-create" @click="submitGoal">Create Goal!</button>
            </div>
        </article>
    </div>
</template>

<script>
/* eslint-disable */
import { ref, reactive } from 'vue';
import { Goal } from '../utils/classes/goal.js';
import { useStore } from 'vuex';
import { useEventListener, onClickOutside } from '@vueuse/core';

export default {
    name: 'UniversalForm',
    props: {
        appointment: String
    },
    setup(props, { emit }) {
        const modalWind = ref(null);
        const closeModalBtn = ref(null);
        const store = useStore();

        useEventListener(closeModalBtn, 'click', () => {
            emit('closeModal');
        });

        onClickOutside(modalWind, () => {
            emit('closeModal');
        });

        const newGoal = reactive({ 
            goalPriority: '',
            goalName: '', 
            description: '' 
        });

        function submitGoal() {
            const { goalPriority, goalName, description } = newGoal;
            if (!description.trim() || !goalName.trim()) return;
            store.commit('addGoal', new Goal(4, goalPriority, goalName, description));
            newGoal.goalName = '';
            newGoal.description = '';
            console.log('all goals: ', store.getters.goals)
            emit('closeModal');
        }

        return {
            newGoal,
            submitGoal,
            modalWind,
            closeModalBtn
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba($color: #000000, $alpha: .8);
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #fff;

    .title-wrapper {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-around;
        margin-top: 20px;

        .close-card-icon {
            cursor: pointer;
            font-size: 20px
        }
    }

    .form-wrapper {
        display: flex;
        flex-direction: column;
        width: 90%;

        .new-goal__name,
        .new-goal__priority,
        .new-goal__description {
            ::placeholder {
                color: #ffffff;
            }
            color: #ffffff;
            height: 30px;
            padding: 3px 10px;
            outline: none;
            background-color: inherit;
            border: none;
            border-bottom: 1px solid #fff;
            margin-top: 40px;
            transition: .20s ease-in-out;
            
            &:focus {
                border-radius: 20px;
                border: 1px solid #ffffff;
            }
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        input[type=number] {
            -moz-appearance:textfield;
        }
        
    }

    .universal-wrapper {
        width: 500px;
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #fff;
        border-radius: 20px;
        
        .create-btn-wrapper {
            height: 20%;
            width: 30%;
            display: flex;
            align-items: center;
            justify-content: center;

            .btn-create {
                padding: 10px 15px;
                cursor: pointer;
                background-color: inherit;
                outline: none;
                border-radius: 20px;
                border: none;
                color: #ffffff;
                transition: backgronud-color .33s linear;

                &:hover {
                    color: #000000;
                    background-color: rgba($color: #ffffff, $alpha: .8);
                }

                &:active {
                    color: #ffffff;
                    background-color: rgba($color: #ffffff, $alpha: 1);
                }
            }
        }
    }
}

</style>