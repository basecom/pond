<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useVModel } from '@vueuse/core';

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
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
    <textarea v-model="modelValue" :class="[getStyle('ui.textarea'), props.class]" />
</template>
