import { createStore } from "vuex";

export default createStore({
  state: {
    goals: [
      {
        id: 1,
        priority: 1,
        name: 'First issue',
        tasks: [
          {
            id: 1,
            description: 'jjdsjhf dsjifhijdsf cbc0s0dcb 00c sdcp'
          },
          {
            id: 2,
            description: 'Привет, как дела'
          },
          {
            id: 3,
            description: 'Hellow world'
          }
        ]
      },
      {
        id: 2,
        priority: 2,
        name: 'Second issue',
        tasks: [
          {
            id: 1,
            description: 'jjdsjhf dsjifhijdsf cbc0s0dcb 00c sdcp'
          },
          {
            id: 2,
            description: 'Привет, как дела'
          },
          {
            id: 3,
            description: 'Hellow world'
          }
        ]
      },
      {
        id: 3,
        priority: 3,
        name: 'Third issue',
        tasks: [
          {
            id: 1,
            description: 'jjdsjhf dsjifhijdsf cbc0s0dcb 00c sdcp'
          },
          {
            id: 2,
            description: 'Привет, как дела'
          },
          {
            id: 3,
            description: 'Hellow world'
          }
        ]
      }
    ]
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    goals(state) {
      return state.goals
    }
  }
});
