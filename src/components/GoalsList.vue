<template>
    <section id="goals-list">
        <article class="main-card">
            <div class="main-card-title-wrapper">
                <p class="main-card__title">Goals</p>
                <button class="new-goal-btn" ref="createGoalBtn">Create new</button>
            </div>
            <article class="main-card__goals-list">
                <div class="goal-wrapper" v-for="(goal, idx) in goals" :key="idx" @click="testMove(goal)">
                    <div class="goal-priority-wrapper">
                        <p class="goal-priority">{{ goal.priority }}</p>
                    </div>
                    <div class="goal-text-wrapper">
                        <p class="goal-text">{{ goal.name }}</p>
                    </div>
                    <div class="goal-percentage-of-completion-wrapper">
                        <p class="goal-percentage">58%</p>
                    </div>
                </div>
            </article>
        </article>
        <UniversalForm v-if="formController" @closeModal="closeModal" :appointment="'Creat new Goal!'"/>
    </section>
</template>

<script>
import { Goal } from '../utils/classes/goal.js';
import UniversalForm from '../components/UniversalForm';
import { ref, computed } from 'vue';
import { useEventListener } from '@vueuse/core';
import { useStore } from 'vuex';

export default {
    name: 'GoalsList',
    components: {
        UniversalForm
    },
    setup() {
        const store = useStore();
        const formController = ref(false);
        const createGoalBtn = ref(null);
        
        useEventListener(createGoalBtn, 'click', () => {
            formController.value = true;
        });

        const goals = computed(() => {
            return store.getters.goals.map(item => new Goal(item.id, item.priority, item.name, item.tasks));
        });
        
        function testMove (choosenGoal) {
            choosenGoal.testMethod();
        }

        const closeModal = () => {
            formController.value = false;
        }

        return {
            testMove,
            formController,
            createGoalBtn,
            goals,
            closeModal    
        }
    }
}
</script>

<style lang="scss" scoped>
.main-card {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 20px;
    border: 1px solid #ccc;

    .main-card-title-wrapper {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        text-align: center;
        border-bottom: 3px solid #ccc;

        .main-card__title {
            text-transform: uppercase;
            font-weight: bold;
        }

        .new-goal-btn {
            cursor: pointer;
            padding: 5px 10px;
            color: #000;
            background: none;
            border: none;
            border-radius: 20px;
            outline: none;
            transition: .1s linear;

            &:hover {
                background-color: rgba($color: #ccc, $alpha: 1.0);
                color: #000;
            }
        }
    }

    .main-card__goals-list {
        width: 100%;

        .goal-wrapper {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ccc;

            .goal-priority-wrapper,
            .goal-percentage-of-completion-wrapper {
                width: 10%;
                text-align: center;
            }
            .goal-text-wrapper {
                width: 80%;
                text-align: center;
            }
        }
    }
}
</style>