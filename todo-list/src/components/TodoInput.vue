<template>
  <div class="inputBox">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo"/><!-- v-model: input text 값을 동적으로 저장 -->
    <span class="addContainer" v-on:click="addTodo">
      <i class="fas fa-plus addBtn"/>
    </span>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      newTodoItem: ''
    }
  },
  methods: {
    addTodo: function() {
      if(this.newTodoItem != '') {
        this.$emit('addTodoItem', this.newTodoItem);
        this.clearInput();
      }
    },
    clearInput: function() {
      this.newTodoItem = ''
    }
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  width: 90%;
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
</style>