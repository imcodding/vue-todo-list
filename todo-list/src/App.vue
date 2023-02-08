<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <TodoList 
      v-bind:propsdata="todoItems" 
      v-on:removeItem="removeOneItem"
      v-on:toggleItem="toggleOneItem">
    </TodoList>
    <TodoFooter></TodoFooter>
  </div>
  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"/>
  </head>
</template>

<script>

import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  data: function() {
    return {
      todoItems: []
    }
  },
  methods: {
    addOneItem: function(todoItem) {
      var obj = {completed: false, item: todoItem};
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeOneItem: function(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    toggleOneItem: function(todoItem, index) {
      // todoItem.completed = !todoItem.completed;
      // 위의 방식과 동작은 동일하지만, 컴포넌트 간의 구분을 명확히 해주는 것이 좋음.
      this.todoItems[index].completed = !this.todoItems[index].completed;
      localStorage.removeItem(todoItem);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem))
    }
  },
  //인스턴스가 생성되자마자 호출되는 lifecycle hook
  created: function() {
    if(localStorage.length > 0) {
      for(var i = 0; i < localStorage.length; i++) {
        var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
        this.todoItems.push(item);
      }
    }
  },
  components: {
    //컴포넌트 태그명 : 컴포넌트 내용
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #F6F6F6;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
