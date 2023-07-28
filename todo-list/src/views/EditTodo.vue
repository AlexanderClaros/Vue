<template>
  <Spinner class="spinner" v-if="isLoading" />
  <Alert message="Failed Loading todo" :show="error !== null" />
  <div v-if="todo !== null" class="form">
    <h1>Edit Todo</h1>
    <form class="edit-todo-form">
      <div>
        <div>
          <label for="">Todo Title</label>
        </div>
        <input type="text" v-model="todo.title" />
      </div>
      <div>
        <div>
          <label for="">Todo Description</label>
        </div>
        <input type="text" v-model="todo.description" />
      </div>
      <div>
        <div>
          <label for="">Todo Date</label>
        </div>
        <input type="datetime-local" v-model="todo.date" />
      </div>
    </form>
    <div class="submit">
      <Btn :disabled="isUpdatingTodo" @click="submit">
        <Spinner v-if="isUpdatingTodo" />
        <span v-else>Submit</span>
      </Btn>
    </div>
  </div>
</template>
<script setup>
import Btn from '@/components/Btn.vue';
import { useFetch } from '../composables/fetch'
import Spinner from '../components/Spinner.vue';
import Alert from '../components/Alert.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const props = defineProps(['id']);
const isUpdatingTodo = ref(false);
const router = useRouter();

const { data: todo, error, isLoading } = useFetch(`/api/todos/${props.id}`);
async function submit() {
  isUpdatingTodo.value = true;
  await axios.put(`/api/todos/${props.id}`, {
    title: todo.value.title,
    description: todo.value.description,
    date: todo.value.date
  });
  isUpdatingTodo.value = false;
  router.push('/');
}
</script>
<style scoped>
.form {
  background-color: var(--navbar-color);
  padding: 20px;
  border-radius: 10px;
}

.edit-todo-form input {
  width: 100%;
  height: 30px;
  border: 1px solid var(--accent-color);
}
.edit-todo-form div{
  display:  block;
  margin-bottom: 20px;
}

.edit-todo-modal-footer {
  display: flex;
  justify-content: end;
  padding: 10px;

}

.edit-todo-submit-btn {
  margin-right: 5px;
}

.submit {
  margin-top: 20px;
  display: flex;
  justify-content: end;

}

.submit button {
  height: 50px;
  width: 80px;
}

.spinner {
  margin: auto;
}</style>

