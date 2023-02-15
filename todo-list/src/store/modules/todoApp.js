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

const state = {
  todoItems: storage.fetch()
};

const getters = {
  storedTodoItems(state)  {
    return state.todoItems;
  }
};

const mutations = {
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

export default { state, getters, mutations }