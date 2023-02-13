<template>
  <div>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in this.storedTodoItems" v-bind:key="todoItem" class="shadow">
        <i class="checkBtn fas fa-check" 
          v-bind:class="{checkBtnCompleted: todoItem.completed}"
          v-on:click="toggleComplete(todoItem, index)">
        </i>
        <span v-bind:class="{textCompleted: todoItem.completed}">{{todoItem.item}}</span>
        <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    removeTodo(todoItem, index) {
      this.$store.commit('removeOneItem', { todoItem, index })
    },
    toggleComplete(todoItem, index) {
      this.$store.commit('toggleOneItem', { todoItem, index })
    }
  },
  computed: {
    /*
    vue에서 권고하는 가이드
    <template></template> 안에서는 가급적이면
    자바스크립트 연산이나 전체적인 속성 조건은 줄이는 게 좋음
    깔끔하게 표현하기 위한 연산은 컴폼넌트 내부 로직 안에서 하는 것이 좋음
    */
    // todoItems() {
    //   return this.$store.getters.storedTodoItems
    // }
    ...mapGetters(['storedTodoItems'])
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 50px;
  color: #62acde;
  margin-right: 5px;
  cursor: pointer;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
  cursor: pointer;
}

/* 리스트 아이템 트렌지션 효과 */
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>