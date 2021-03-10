<template>
    <section id="goals-list">
        <article class="main-card">
            <div class="main-card-title-wrapper">
                <p class="main-card__title">Goals</p>
                <div class="pugination-controllers-wrapper">
                    <div v-show="totalPages > 1" class="pugination-controllers">
                        <span class="controller-wrapper">
                            <i ref="control-prev" class="fas fa-angle-left"></i>
                        </span>
                        <p class="pugination__counter">{{ currentPage + 1 }} / {{ totalPages }}</p>
                        <span class="controller-wrapper">
                            <i ref="control-next" class="fas fa-angle-right"></i>
                        </span>
                    </div>
                </div>
                <button class="new-goal-btn" ref="create-new-goal">Create new</button>
            </div>
            <div class="headlines-wrapper">
                <div class="headline-item">
                    <p class="goal__status">Priority</p>
                </div>
                <div class="headline-item center">
                    <p class="goal__name">Goal name</p>
                </div>
                <div class="headline-item">
                    <p class="goal__done-persent">Done</p>
                </div>
            </div>
            <article class="main-card__goals-list">
                <div class="goal-wrapper" v-for="(goal, idx) in renderGoals" :key="idx" @click="$emit('showDesc', goal)">
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
                <p class="total__goals"><strong>TOTAL</strong>: {{ goalsList.length }}</p>
            </article>
        </article>
    </section>
</template>

<script>
/* eslint-disable */
import UniversalForm from '../components/UniversalForm';
import { ref, computed } from 'vue';
import { useEventListener, templateRef } from '@vueuse/core';
import { useStore } from 'vuex';

export default {
    name: 'GoalsList',
    components: {
        UniversalForm
    },
    emits: ['showDesc'],
    setup(props, { emit }) {
        // refs 
        const openModal = templateRef('create-new-goal');
        const controllerNext = templateRef('control-next');
        const controllerPrev = templateRef('control-prev');
        // all goals
        const goalsList = computed(() => useStore().getters.goals);
        // pugination variables
        const maxOnPage = 10;
        const totalPages = computed(() => Math.ceil(goalsList.value.length / maxOnPage));
        const currentPage = ref(0);
        const renderGoals = computed(() => goalsList.value.slice(currentPage.value * maxOnPage, currentPage.value * maxOnPage + maxOnPage));

        useEventListener(openModal, 'click', () => {
            emit('modalStatus', { isOpen: true, appointment: 'Create new goal' });
        });
        
        // show goal description
        
        useEventListener(controllerNext, 'click', () => {
            if (currentPage.value === totalPages.value - 1) return;
            ++currentPage.value;
        });
        // prev page
        useEventListener(controllerPrev, 'click', () => {
            if (currentPage.value === 0) return;
            --currentPage.value;
        })
        // pugination logic (end)

        return {
            currentPage,
            totalPages,
            renderGoals,
            goalsList,
        }
    }
}
</script>

<style lang="scss" scoped>
.main-card {
    width: 465px;
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
            cursor: pointer;
            border-top: 1px solid #ccc;
            transition: .22s ease-in-out;

            &:hover {
                background-color: #ccc;
            }

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
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid #ccc;
    }
}
</style>