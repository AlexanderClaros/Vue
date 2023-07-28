<template>
  <div class="alert" v-if="show" :style="{ backgroundColor }">
    <div>{{ message }}</div>
    <div @click="close" class="close-alert">&times;</div>
  </div>
</template>

<script setup>
import {useBackgroundColor,BackgroundColorProps} from '../composables/backgroundColor'
const props = defineProps({
  ...BackgroundColorProps,
  message: {
    required: true,
    type: String
  },
  show: {
    required: true,
    type: Boolean,

  }
})
const emit = defineEmits(['close']);
const backgroundColor = useBackgroundColor(props);

function close() {
  emit('close');
}
</script>

<style scope>
.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 20px 0 20px;
  border-radius: 20px;
  height: 50px;
}

.close-alert {
  font-size: 50px;
  cursor: pointer;
}
</style>