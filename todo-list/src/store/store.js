import Vuex from 'vuex';

const storage = {
    fetch() {
        const arr = [];
        if(localStorage.length > 0) {
            for(let i = 0; i < localStorage.length; i++) {
                arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
            }
        }
        return arr;
    },
};

export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch()
    },
    mutations: {
        addOneItem(state, todoItem) {
            const obj = {completed: false, item: todoItem};
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeOneItem(state, data) {
            localStorage.removeItem(data.todoItem.item);
            state.todoItems.splice(data.index, 1);
        },
        toggleOneItem(state, data) {
            state.todoItems[data.index].completed = !state.todoItems[data.index].completed;
            localStorage.removeItem(data.todoItem);
            localStorage.setItem(data.todoItem.item, JSON.stringify(data.todoItem))
        },
        clearAllItems(state) {
            localStorage.clear();
            state.todoItems = [];
        }
    }
});