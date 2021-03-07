<template>
    <section id="goals-list">
        <article class="main-card">
            <div class="main-card-title-wrapper">
                <p class="main-card__title">Goals</p>
                <div class="pugination-controllers-wrapper">
                    <div v-show="totalPages.length > 1" class="pugination-controllers">
                        <span class="controller-wrapper">
                            <i ref="control-prev" class="fas fa-angle-left"></i>
                        </span>
                        <p class="pugination__counter">{{ currentPage }} / {{ totalPages }}</p>
                        <span class="controller-wrapper">
                            <i ref="control-next" class="fas fa-angle-right"></i>
                        </span>
                    </div>
                </div>
                <button class="new-goal-btn" ref="create-new-goal">Create new</button>
            </div>
            <div class="headlines-wrapper">
                <div class="headline-item">
                    <p ref="priority-sort" class="goal__status priority">Priority</p>
                </div>
                <div class="headline-item center">
                    <p class="goal__name">Goal name</p>
                </div>
                <div class="headline-item">
                    <p class="goal__done-persent">Done</p>
                </div>
            </div>
            <article class="main-card__goals-list">
                <div class="goal-wrapper" v-for="(goal, idx) in renderGoalsOnPage" :key="idx" @click="testMove(goal)">
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
            <article v-if="totalPages > 1" class="total-goals-wrapper">
                <p class="total__goals"><strong>TOTAL</strong>: {{ allGoals.length }}</p>
            </article>
        </article>
        <UniversalForm v-if="formController" @closeModal="closeModal" :appointment="'Creat new Goal!'"/>
    </section>
</template>

<script>
/* eslint-disable */
import { Goal } from '../utils/classes/goal.js';
import UniversalForm from '../components/UniversalForm';
import { ref, computed, watch, watchEffect } from 'vue';
import { useEventListener, templateRef } from '@vueuse/core';
import { useStore } from 'vuex';

export default {
    name: 'GoalsList',
    components: {
        UniversalForm
    },
    setup() {
        // TODO add goals sort by priority
        const store = useStore();
        const formController = ref(false);
        const createNewGoal = templateRef('create-new-goal');
        const allGoals = computed(() => {
            return store.getters.goals.map(item => new Goal(item.id, item.priority, item.name, item.tasks));
        });
        const controllerPrev = templateRef('control-prev');
        const controllerNext = templateRef('control-next');
        const prioritySort = templateRef('priority-sort');
        const maxOnPage = 10;
        const totalPages = computed(() => Math.ceil(allGoals.value.length / maxOnPage));
        const currentPage = ref(1); // default value
        const renderGoalsOnPage = ref(allGoals.value.slice(0, maxOnPage));// default value

        watchEffect(() => renderGoalsOnPage.value = allGoals.value.slice(0, maxOnPage));

        watch(currentPage, (curr, prev) => {
            if (curr > prev) {
                renderGoalsOnPage.value = allGoals.value.slice(prev * maxOnPage, curr * maxOnPage);
                return;
            }
            if (curr < prev) {
                renderGoalsOnPage.value = allGoals.value.slice((curr - 1) * maxOnPage, (prev - 1) * maxOnPage);
                return;
            }
        });

        useEventListener(prioritySort, 'click', () => {
            console.log('sort function')
        });

        useEventListener(controllerNext, 'click', () => {
            if (currentPage.value === totalPages.value) return;
            ++currentPage.value;
        });

        useEventListener(controllerPrev, 'click', () => {
            if (currentPage.value === 1) return;
            --currentPage.value;
        });
        
        useEventListener(createNewGoal, 'click', () => {
            formController.value = true;
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
            allGoals,
            renderGoalsOnPage,
            closeModal,
            totalPages,
            currentPage
        }
    }
}
</script>

<style lang="scss" scoped>
.main-card {
    width: 25%;
    max-height: 681px;
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

        .pugination-controllers-wrapper {
            display: flex;

            .pugination-controllers {
                display: flex;

                .controller-wrapper {
                    font-size: 20px;
                    cursor: pointer;
                }

                .pugination__counter {
                    display: block;
                    margin: 0 10px;
                }
            }
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
    
    .headlines-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 3px solid #ccc;
        
        .headline-item {
            height: 100%;
            width: 15%;
            text-align: center;
            cursor: default;
        }

        .priority {
            cursor: pointer;
        }

        .center {
            width: 70%;
            text-align: center;
        }
    }

    .main-card__goals-list {
        width: 100%;

        .goal-wrapper {
            display: flex;
            justify-content: space-between;
            border-top: 1px solid #ccc;

            .goal-priority-wrapper,
            .goal-percentage-of-completion-wrapper {
                width: 15%;
                text-align: center;
            }
            .goal-text-wrapper {
                width: 70%;
                text-align: center;
            }
        }
    }

    .total-goals-wrapper {
        border-top: 1px solid #ccc;
    }
}
</style>