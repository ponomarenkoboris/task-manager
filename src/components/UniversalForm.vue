<template>
    <div class="container">
        <article ref="modalWind" class="universal-wrapper">
            <div class="title-wrapper">
                <p><strong>{{ appointment }}</strong></p>
                <span ref="closeModalBtn" class="close-card-icon">
                    <i class="fas fa-times"></i>
                </span>
            </div>
            <div v-if="appointment === 'Create new goal'" class="form-wrapper">
                <input type="text" class="new-goal__name" v-model="newGoal.name" placeholder="Goal name">
                <input type="number" class="new-goal__priority" v-model="newGoal.priority" placeholder="Choose priority (from 1 to whatever you want)">
                <input type="text" class="new-goal__description" v-model="newGoal.description" placeholder="Description">
            </div>
            <div v-if="appointment === 'Create new goal'" class="create-btn-wrapper">
                <button class="btn-create" @click="submitGoal">Create Goal!</button>
            </div>
            <!-- add new task -->
            <div v-if="appointment === 'Add new task'" class="form-wrapper">
                <input type="text" class="new-task__title" placeholder="Enter task name...">
                <input type="text" class="new-task-description" placeholder="Enter task description...">
            </div>
            <!-- rename goal -->
            <div v-if="appointment === 'Rename goal'" class="form-wrapper">
                <p class="prev-goal-name">PREV-TASK-NAME</p>
                <input type="text" class="new-goal__name" placeholder="Enter new name...">
            </div>
            <!-- rewrite description -->
            <div v-if="appointment === 'Rewrite Description'" class="form-wrapper">
                <input type="text" class="new-description" placeholder="Enter new description...">
            </div>
            <!-- remove goal -->
            <div v-if="appointment === 'Remove goal'" class="form-wrapper">
                <div class="input-wrapper">
                    <p>Are you sure?</p>
                    <div class="buttons-wrapper">
                        <button class="suggested-answer">Yes, I am.</button>
                        <button class="negative-answer">No, I am not.</button>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
/* eslint-disable */
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { useEventListener, onClickOutside } from '@vueuse/core';

export default {
    name: 'UniversalForm',
    props: {
        appointment: {
            type: String,
            required: true
        },
        currentGoal: Object
    },
    setup(props, { emit }) {
        const modalWind = ref(null);
        const closeModalBtn = ref(null);
        const store = useStore();
        const closeStatus = { isOpen: false, appointment: '' };

        useEventListener(closeModalBtn, 'click', () => {
            emit('modalStatus', closeStatus);
        });

        onClickOutside(modalWind, () => {
            emit('modalStatus', closeStatus);
        });

        const newGoal = reactive({ 
            priority: '',
            name: '', 
            description: '' 
        });

        function submitGoal() {
            const { priority, name, description } = newGoal;
            if (!priority.trim() || !name.trim() || !description.trim()) return;
            store.commit('addGoal', { priority, name, description });
            newGoal.name = '';
            newGoal.priority = '';
            newGoal.description = '';
            emit('modalStatus', closeStatus);
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