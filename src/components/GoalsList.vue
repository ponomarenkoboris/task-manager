<template>
    <article class="main-card">
        <div class="main-card-title-wrapper">
            <p class="main-card__title">Goals</p>
            <button class="new-goal-btn" @click="showForm">Create new</button>
        </div>
        <article class="main-card__goals-list">
            <div class="goal-wrapper" v-for="(goal, idx) in number" :key="idx">
                <div class="goal-priority-wrapper">
                    <p class="goal-priority">PRIORITY</p>
                </div>
                <div class="goal-text-wrapper">
                    <p class="goal-text">TEXT</p>
                </div>
                <div class="goal-percentage-of-completion-wrapper">
                    <p class="goal-percentage">58%</p>
                </div>
            </div>
        </article>
    </article>
    <UniversalForm v-if="formController" @close="showForm" :appointment="'New Goal Is Here!'"/>
</template>

<script>
import { Goal } from '../utils/classes/goal.js';
import UniversalForm from '../components/UniversalForm';
import { ref } from 'vue';

export default {
    name: 'GoalsList',
    components: {
        UniversalForm
    },
    setup() {
        const number = 10;
        const formController = ref(false);
        
        function testMove (idx) {
            const testClass = new Goal();
            testClass.test(idx)
        }

        function showForm() {
            formController.value = !formController.value
        }

        return {
            number,
            testMove,
            formController,
            showForm
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
    border: 1px solid #fff;

    .main-card-title-wrapper {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        text-align: center;
        border-bottom: 3px solid #fff;

        .main-card__title {
            text-transform: uppercase;
            font-weight: bold;
        }

        .new-goal-btn {
            cursor: pointer;
            padding: 5px 10px;
            color: #fff;
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
            border-bottom: 1px solid #fff;

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