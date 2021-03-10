<template>
    <section id="goal-description">
        <div v-if="priority || name || description" class="goal-descr-wrapper">
            <div class="descr-header">
                <p class="descr-title">Goal name: {{ name }}</p>
                <div class="descr-priority-and-config">
                    <p class="descr-priority">Priority: {{ priority }}</p>
                    <div ref="config" class="descr-config">
                        <i class="fas fa-cog"></i>
                    </div>
                    <div v-if="configControl" ref="dropdown" class="config-dropdown">
                        <ul class="configs-list">
                            <li ref="add-task" class="config-item">Add task</li>
                            <li ref="rename-goal" class="config-item">Rename goal</li>
                            <li ref="rewrite-descr" class="config-item">Rewrite description</li>
                            <li ref="remove-goal" class="config-item">Remove goal</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="descr-main-info">
                <p class="descr-main-info__info">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, adipisci dolore! Corrupti quis hic et asperiores dolorum impedit, fuga tempora. Tempora cumque a explicabo neque est velit, quo nihil ipsum!</p>
            </div>
        </div>
        <div v-if="!priority && !name && !description">Nothing!</div>
    </section>
</template>

<script>
import { templateRef, useEventListener, onClickOutside } from '@vueuse/core';
import { ref } from 'vue';

export default {
    name: 'GoalDescription',
    props: {
        priority: Number,
        name: String,
        description: String
    },
    setup(props, { emit }) {
        const config = templateRef('config');
        const dropdown = templateRef('dropdown');
        const addTask = templateRef('add-task');
        const renameGoal = templateRef('rename-goal');
        const rewriteDescr = templateRef('rewrite-descr');
        const removeGoal = templateRef('remove-goal');
        const configControl = ref(false);

        useEventListener(config, 'click', () => {
            configControl.value = true;
        });
        onClickOutside(dropdown, () => {
            configControl.value = false;
        });

        useEventListener(addTask, 'click', () => {
            emit('modalStatus', { isOpen: true, appointment: 'Add new task' });
        });
        useEventListener(renameGoal, 'click', () => {
            emit('modalStatus', { isOpen: true, appointment: 'Rename goal' });
        });
        useEventListener(rewriteDescr, 'click', () => {
            emit('modalStatus', { isOpen: true, appointment: 'Rewrite Description' });
        });
        useEventListener(removeGoal, 'click', () => {
            emit('modalStatus', { isOpen: true, appointment: 'Remove goal' });
        });
        

        return {
            configControl
        }
    }
}
</script>

<style lang="scss" scoped>
#goal-description {
    width: 465px;
    border: 1px solid #ccc;
    border-radius: 20px;

    .goal-descr-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;

        .descr-header {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 100%;
            border-bottom: 3px solid #ccc;

            .descr-priority-and-config {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .descr-priority {
                    display: block;
                    width: 100px;
                }

                .descr-config {
                    cursor: pointer;

                    &:hover {
                        color: red;
                    }
                }

                .config-dropdown {
                    position: absolute;
                    top: 5px;
                    background: #ffffff;

                    .configs-list{
                        list-style-type: none;
                        padding: 3px;
                        border: 1px solid #ccc;
                        border-radius: 10px;

                        .config-item {
                            cursor: pointer;
                            text-align: center;
                            padding: 3px 5px;
                            transition: .33s ease-in-out;

                            &:hover {
                                border-radius: 5px;
                                background-color: #ccc;
                            }

                            &:last-child {
                                &:hover {
                                    border-radius: 5px;
                                    color: #ffffff;
                                    background-color: rgba($color: #d44f46, $alpha: 1.0);   
                                }
                            }
                        }
                    }
                }
            }
        }

        .descr-main-info {
            margin-left: 10px;
            margin-right: 10px;
        }
    }
}
</style>