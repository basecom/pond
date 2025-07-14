<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useVModel } from '@vueuse/core';

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>();

const { getStyle } = usePondStyle();

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
});
</script>

<template>
    <input v-model="modelValue" :class="[getStyle('ui.input'), props.class]">
</template>
