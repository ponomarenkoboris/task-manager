export class Goal {
    constructor(priority, name, tasks = []) {
        this.priority = priority;
        this.name = name;
        this.tasks = tasks
    }

    test(indx) {
        alert(indx)
    }

    createTask(newTask) {
        const { id, description } = newTask;
        this.tasks.push({ id, status: false, description });
    }

    changeStatus(id) {
        this.tasks = this.tasks.map(item => {
            if (item.id === id) {
                item.status === true ? item.status = false : item.status = true;
                return item;
            } else {
                return item;
            }
        })
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(item => item.id !== id);
    }

    deleteGoal() {
        // this mean that method will send request to database and instance will be deleted there?
         
    }
}