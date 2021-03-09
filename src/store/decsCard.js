export default {
    state:() => ({
        descriptionState: {}
    }),
    mutations: {
        loadDescr(state, payload) {
            state.descriptionState = payload;
        }
    },
    getters: {
        goalDesc(state) {
            return state.descriptionState;
        }
    }
}