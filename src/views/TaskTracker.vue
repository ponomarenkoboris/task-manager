<template>
    <section class="app-taskT">
        <section class="header-wrapper">
            <article class="header-title-wrapper">
                <p class="header__title">TaskTracker</p>
            </article>
            <article class="header__app-status">
                <p v-if="isOnline" class="app-network__status active">Online</p>
                <p v-else class="app-network__status">Offline</p>
            </article>
        </section>
        <section class="goals-list-container">
            <section class="goals-list-wrapper">
                <GoalsList @showDesc="showDesc" @modalStatus="modalStatus"/>
                <GoalDescription v-if="showingDesc" @modalStatus="modalStatus" :name="showingDesc.name" :description="showingDesc.description" :priority="showingDesc.priority" />
                <UniversalForm v-if="modalConfig.isOpen" @modalStatus="modalStatus" :appointment="modalConfig.appointment"/>
            </section>
        </section>
    </section>
</template>

<script>
import GoalsList from '../components/GoalsList';
import GoalDescription from '../components/GoalDescription';
import UniversalForm from '../components/UniversalForm';
import { useOnline } from '@vueuse/core';
import { ref, reactive } from 'vue';

export default {
    name: 'TaskTracker',
    components: {
        GoalsList,
        GoalDescription,
        UniversalForm
    },
    setup() {
        const isOnline = useOnline();
        const showingDesc = ref('');
        const modalConfig = reactive({
            isOpen: false,
            appointment: ''
        });
        function showDesc(currentGoal) {
            showingDesc.value = {...currentGoal};
        }
        function modalStatus(config) {
            const { isOpen, appointment } = config;
            modalConfig.isOpen = isOpen;
            modalConfig.appointment = appointment
        }
        return { isOnline, showDesc, showingDesc, modalConfig, modalStatus }
    }
}
</script>

<style lang="scss">
.app-taskT {
    padding: 30px;

    .header-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .header__title {
            font-weight: bold;
            font-size: 20px;
        }
        
        .app-network__status {
            color: #f52116;
        }
        .active {
            color: #4bf03c;
        }
    }

    .goals-list-wrapper {
        display: flex;
        justify-content: space-around;        
    }
}
</style>