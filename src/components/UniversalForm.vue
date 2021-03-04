<template>
    <div class="constainer">
        <article class="universal-wrapper">
            <div class="title">
                <h1>Hi! I am UniversalForm!</h1>
                <p><strong>{{ appointment }}</strong></p>
                <p @click="$emit('close')">&times;</p>
            </div>
            <div class="form-wrapper">
                <input type="text" placeholder="First Input">
                <input type="text" placeholder="Second Input">
            </div>
        </article>
    </div>
</template>

<script>
export default {
    name: 'UniversalForm',
    emits: ['close'],
    props: {
        appointment: String
    },
    setup() {

    }
}
</script>

<style lang="scss" scoped>
.constainer {
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

    .universal-wrapper {
        width: 500px;
        height: 400px;
        border: 1px solid #fff;
        border-radius: 20px;
        
    }
}

</style>