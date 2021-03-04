<template>
    <section class="app-taskT">
        <section class="goals-list-container">
            <section class="goals-list-wrapper">
                <GoalsList />
            </section>
        </section>
    </section>
</template>

<script>
import GoalsList from '../components/GoalsList';
export default {
    name: 'TaskTracker',
    components: {
        GoalsList
    }
}
</script>

<style lang="scss">
.app-taskT {
    padding: 30px;
}
</style>