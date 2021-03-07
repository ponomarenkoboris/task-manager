<template>
    <div class="container">
        <article ref="modalWind" class="universal-wrapper">
            <div class="title-wrapper">
                <p><strong>{{ appointment }}</strong></p>
                <p ref="closeModalBtn" class="close-card-icon">&times;</p>
            </div>
            <div class="form-wrapper">
                <input type="text" class="new-goal__name" v-model="newGoal.goalName" placeholder="Goal name">
                <input type="number" class="new-goal__priority" v-model="newGoal.goalPriority" placeholder="Choose priority">
                <input type="text" class="new-goal__description" v-model="newGoal.description" placeholder="Description">
            </div>
            <div class="btn" @click="submitGoal">Create Goal!</div>
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
            goalPriority: 0,
            goalName: '', 
            description: '' 
        });

        function submitGoal() {
            const { goalPriority, goalName, description } = newGoal;
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
    justify-content: center;

    ::placeholder {
        color: red;
    }

    .title-wrapper {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-around;

        .close-card-icon {
            cursor: pointer;
        }
    }

    .form-wrapper {
        display: flex;
        flex-direction: column;
        width: 90%;
    }

    .universal-wrapper {
        width: 500px;
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #fff;
        border-radius: 20px;
        
    }
}

</style>