<script setup lang="ts">
import { ToastAction  } from 'reka-ui';
import type { ToastActionProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<ToastActionProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <ToastAction v-bind="delegatedProps" :class="[getStyle('ui.toast.action'), props.class]">
        <slot />
    </ToastAction>
</template>
