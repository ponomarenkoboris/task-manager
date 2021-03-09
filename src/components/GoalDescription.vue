<template>
    <section id="goal-description">
        <h1>Hi description</h1>
            <h1 v-if="id">{{ id }}</h1>
            <h1 v-if="priority">{{ priority }}</h1>
            <h1 v-if="name">{{ name }}</h1>
            <h1 v-if="description">{{ description }}</h1>
        <div v-if="!id && !priority && !name && !description">Nothing!</div>
    </section>
</template>

<script>


export default {
    name: 'GoalDescription',
    props: {
        id: Number,
        priority: Number,
        name: String,
        description: String
    }
}
</script>

<style lang="scss" scoped>
#goal-description {
    width: 465px;
    border: 1px solid #ccc;
    border-radius: 20px;
}
</style>