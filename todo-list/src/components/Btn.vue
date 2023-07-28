<template>
    <button :class="{ circle: applyCircleClass }" v-bind="$attrs">
        <slot />
    </button>
</template>
<script setup>
import { computed } from 'vue';
import { useBackgroundColor,BackgroundColorProps } from '../composables/backgroundColor';
const props = defineProps(
    {
        circle: {
            default: false,
            type: Boolean,
        },
        ...BackgroundColorProps        
    });
const backgroundColor = useBackgroundColor(props);

const applyCircleClass = computed(() => props.circle);

</script>

<style scoped>
button {
    color: var(--text-color);
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: v-bind(backgroundColor);
}

button:disabled {
    opacity: 60%;
}

.circle {
    border-radius: 50%;
}
</style>