<template>
  <Alert :message="propAlert.alert.message" :show="propAlert.alert.show" :variant="propAlert.alert.variant" @close="propAlert.alert.show = false" />
  <form class="add-todo-form">
    <div>
      <label>Title</label>
      <input v-model="todoTitle" type="text" placeholder="Todo Title" />
    </div>
    <div>
      <label>Description</label>
      <input v-model="todoDescription" type="text" placeholder="Todo description"/>
    </div>
    <div>
      <label>Date</label>
      <input v-model="todoDate" type="datetime-local" />
    </div>
    <div class="btn">
      <Btn :disabled="isLoading"  @click.prevent="submit(todoTitle,todoDescription,todoDate)">
        <spinner v-if="isLoading" />
        <span v-else>Add Todo</span>
      </Btn>
    </div>
  </form>
</template>
<script setup>
import { reactive, ref } from 'vue';
import Btn from '../components/Btn.vue';
import Spinner from '../components/Spinner.vue';
import Alert from '../components/Alert.vue';
import { useAlert, useShowAlert } from '../composables/alert';
import axios from 'axios';
import { useRouter } from 'vue-router';

const propAlert =reactive({...useAlert});
const isLoading = ref(false);
const isPostingTodo = ref(false);
const todoTitle = ref('');
const todoDescription = ref('');
const todoDate = ref('');
const router = useRouter();

async function submit(todoTitle,todoDescription,todoDate) {
  if (todoTitle === "" || todoDescription === ""  ||todoDate === "" ) {
    propAlert.alert=useShowAlert(propAlert.alert,"All info is required");
    return;
  }
  isPostingTodo.value = true;
  const res = axios.post(`/api/todos`, {
    title:todoTitle,
    description:todoDescription,
    date:todoDate
  });
 
  isPostingTodo.value = false;
  router.push("/");
}
</script>
<style scoped>
.add-todo-form {
  display: block;
  justify-content: space-between;

}

.add-todo-form input {
  width: 100%;
  border: solid 2px var(--accent-color);
  height: 30px;
}
.add-todo-form div{
  padding: 10px;
  width: 100%;
}

.btn {
  height: 50px;
  justify-content: center;
  display: flex;
}
</style>