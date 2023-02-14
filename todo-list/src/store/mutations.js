const addOneItem = (state, todoItem) => {
    const obj = {completed: false, item: todoItem};
    localStorage.setItem(todoItem, JSON.stringify(obj));
    state.todoItems.push(obj);
}
const removeOneItem = (state, data) => {
    localStorage.removeItem(data.todoItem.item);
    state.todoItems.splice(data.index, 1);
}
const toggleOneItem = (state, data) => {
    state.todoItems[data.index].completed = !state.todoItems[data.index].completed;
    localStorage.removeItem(data.todoItem);
    localStorage.setItem(data.todoItem.item, JSON.stringify(data.todoItem))
}
const clearAllItems = (state) => {
    localStorage.clear();
    state.todoItems = [];
}

export { addOneItem, removeOneItem, toggleOneItem, clearAllItems };