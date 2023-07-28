<template>
     <Alert :message="propAlert.alert.message" :show="propAlert.alert.show" :variant="propAlert.alert.variant" @close="propAlert.alert.show = false" />
    <Spinner class="spinner" v-if="isLoading" />
    <div v-else>
        <Todo v-for="todo in todos" :title="todo.title" :description="todo.description" :date="todo.date" @remove="removeTodo(todo.id)"
            @edit="$router.push(`/todos/${todo.id}/edit`)" v-bind:key="todo.id" />
    </div>
</template>
  
<script setup>
import Alert from '@/components/Alert.vue';
import Todo from '@/components/Todo.vue';
import axios from 'axios';
import Spinner from '@/components/Spinner.vue';
import { reactive, ref, watch } from 'vue';
import { useFetch } from "@/composables/fetch"
import { useAlert, useShowAlert } from '../composables/alert';

const propAlert =reactive({...useAlert});
const { data: todos, isLoading } = useFetch('/api/todos', {
    onError: () => propAlert.alert=useShowAlert(propAlert.alert,"Failed loading todos")
});


async function removeTodo(id) {
    await axios.delete(`/api/todos/${id}`);
    todos.value = todos.value.filter((todo) => todo.id !== id);
};


</script>
  
<style scoped>
.spinner {
    margin: auto;
    margin-top: 30px;
}
</style>
  