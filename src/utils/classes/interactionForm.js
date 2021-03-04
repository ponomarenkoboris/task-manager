import { Goal } from './goal.js';

export class InteractionForm {
    constructor(type, props) {
        if (type === 'create:goal') {
            new Goal(props);
        }
    }
}