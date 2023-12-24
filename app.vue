<script setup>
  const task = ref("")
  const {todos, addTask, updateTodo, deleteTodo} = useTodos();
  const refreshInput = () => {
    addTask(task.value)
    task.value = ""
  }
</script>
<template>
  <div class="container">
      <UCard class="cards">
        <h1>Todo List</h1>
        <div class="add-todo">
          <input @keydown.enter="refreshInput" type="text" v-model="task" placeholder="What needs to be done?" />
          <UButton @click="refreshInput">Add</UButton>
        </div>
        <UCard @click="() => updateTodo(todo.id)" v-for="todo in todos" :key="todo.id">
          <div class="card">
            <h4 :class="todo.completed ? 'bared' : null">{{ todo.item }} </h4>
            <p @click="() => deleteTodo(todo.id)">X</p>
          </div>
        </UCard>
      </UCard>
  </div>
</template>
<style scoped>
  .container {
    padding: 2rem;
    margin: 0 auto;
    max-width: 50%;
  }
  .cards {
    padding: 2rem;
  }
  .add-todo {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  input {
    outline: none;
  }
  .card  {
    padding: 0.5rem;
    margin-top: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  }
  .bared {
    text-decoration: line-through;
  }
</style>