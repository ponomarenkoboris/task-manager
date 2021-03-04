<template>
    <div class="container">
        <article class="universal-wrapper">
            <div class="title-wrapper">
                <p><strong>{{ appointment }}</strong></p>
                <p @click="$emit('close')" class="close-card-icon">&times;</p>
            </div>
            <div class="form-wrapper">
                <input type="text" v-model="values.field1" placeholder="First Input">
                <input type="text" v-model="values.field2" placeholder="Second Input">
            </div>
            <div class="btn" @click="submitGoal">Create Goal!</div>
        </article>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { InteractionForm } from '../utils/classes/interactionForm.js';

export default {
    name: 'UniversalForm',
    emits: ['close'],
    props: {
        appointment: String
    },
    setup() {
        const values = reactive({ field1: '', field2: '' });

        function submitGoal() {
            const {field1: name, field2: description} = values;
            new InteractionForm('create:goal', { name, description });
            values.field1 = ''
            values.field2 = ''
        }

        return {
            values,
            submitGoal
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
    justify-content: center;

    ::placeholder {
        color: red;
    }

    .title-wrapper {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-around;

        .close-card-icon {
            cursor: pointer;
        }
    }

    .form-wrapper {
        display: flex;
        flex-direction: column;
        width: 90%;
    }

    .universal-wrapper {
        width: 500px;
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #fff;
        border-radius: 20px;
        
    }
}

</style>