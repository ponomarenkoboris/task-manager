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
                <GoalsList @showDesc="showDesc" />
                <GoalDescription :name="showingDesc.name" :description="showingDesc.description" :priority="showingDesc.priority" />
            </section>
        </section>
    </section>
</template>

<script>
import GoalsList from '../components/GoalsList';
import GoalDescription from '../components/GoalDescription';
import { useOnline } from '@vueuse/core';
import { ref } from 'vue';

export default {
    name: 'TaskTracker',
    components: {
        GoalsList,
        GoalDescription
    },
    setup() {
        const isOnline = useOnline();
        const showingDesc = ref({});
        function showDesc(currentGoal) {
            console.log(currentGoal);
            showingDesc.value = {...currentGoal};
        }
        return { isOnline, showDesc, showingDesc }
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