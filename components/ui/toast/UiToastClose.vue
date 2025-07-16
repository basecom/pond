<script setup lang="ts">
import { ToastClose, type ToastCloseProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<ToastCloseProps & {
  class?: HTMLAttributes['class']
}>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <ToastClose v-bind="delegatedProps" :class="[getStyle('ui.toast.close.outer'), props.class]">
        <Icon name="mdi:close" :class="getStyle('ui.toast.close.icon')" />
    </ToastClose>
</template>
