<script setup lang="ts">
import { ToastViewport, type ToastViewportProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<ToastViewportProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <ToastViewport v-bind="delegatedProps" :class="[getStyle('ui.toast.viewport'), props.class]" />
</template>
