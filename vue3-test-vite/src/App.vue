<template>
  <div id="app" data-v-app="">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main" v-show="todosRef.length > 0">
        <input 
        id="toggle-all" 
        class="toggle-all"
        type="checkbox" 
        v-model="allDone"
        
        
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            v-for="todo in filterTodosRef"
            :key="todo.id"
            :class="{ completed: todo.completed,
                      editing : todo === EditingTodoRef
             }"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="editingTodo(todo)" >{{ todo.title }}</label>
              <button class="destroy" @click="remove(todo)"></button>
            </div>
            <input class="edit" type="text" 
             v-model="todo.title" 
            @blur="upDateTodo(todo)" 
            @keyup.enter="upDateTodo" 
            @keyup.escape.prevent='cancelEdit(todo)'
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todosRef.length > 0"  >
        <span class="todo-count">
          <strong>{{ filterTodosRef.length }}</strong>
          <span>item{{ filterTodosRef.length <= 1 ? "" : "s" }} left</span>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibilityRef === 'all' }"
              >All</a
            >
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibilityRef === 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibilityRef === 'completed' }"
              @click="isCompleted"
              >Completed</a
            >
          </li>
        </ul> l
        <button 
        class="clear-completed" 
        style="display: none" 
        v-show="filterTodosRef.length > 0"
        @click="removeAllCompleted"
        
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import useGetTodoList from "./components/useGetTodoList";
import useNewTodo from "./components/useNewTodo";
import useFilteTodo from "./components/useFilteTodo";
import useEditTodo from "./components/useEditTodo";
import useRemoveTodo from "./components/useRemoveTodo";


// import useCompleted from './components/useCompleted'

export default {
  setup() {
    const { todosRef } = useGetTodoList();

    return {
      todosRef,
      ...useNewTodo(todosRef),
      ...useFilteTodo(todosRef),
      // ...useCompleted(todosRef)
      ...useEditTodo(todosRef),
      ...useRemoveTodo(todosRef)
    };
  },
};
</script>
