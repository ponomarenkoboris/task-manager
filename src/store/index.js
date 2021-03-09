import { createStore } from "vuex";
import descriptionCard from './decsCard.js';

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
        name: '3 issue',
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
  mutations: {
    addGoal(state, payload){
      state.goals.push(payload);
    }
  },
  actions: {},
  modules: {
    descriptionCard
  },
  getters: {
    goals(state) {
      return state.goals.sort((a, b) => a.priority < b.priority ? 1 : -1);
    }
  }
});
