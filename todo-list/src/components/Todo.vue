<template>
    <div class="todo">
        <p>{{ title }}</p>
        <p>{{ description }}</p>
        <p>{{ date }}</p>
        <div>
            <Btn circle variant="secondary" @click="$emit('edit')" class="btn edit-todo-btn">
                <Pencil/>
            </Btn>
            <Btn circle variant="danger" @click="$emit('remove')" class="btn">&times;</Btn>
        </div>
    </div>
</template>
<script setup>
import Btn from './Btn.vue';
import Pencil from './icons/Pencil.vue';
const props = defineProps({
    title: {
            required: true,
            type: String,
        },
    description: {
            required: true,
            type: String,
        },
    date: {
            required: true,
            type: Date,
        }
});
const emit  = defineEmits(['remove','edit']);

</script>
<style scoped>
.todo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--accent-color);
    margin-top: 30px;
    padding: 0 20px 0 20px;
    border-radius: 20px;
}
.todo > div{
    display: flex;
}
.btn {
    height: 40px;
    width: 40px;
    font-size: 30px;
}
.edit-todo-btn{
    margin-right: 5px;
}
</style>