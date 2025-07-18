<script setup lang="ts">
import { ToastTitle  } from 'reka-ui';
import type { ToastTitleProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<ToastTitleProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <ToastTitle v-bind="delegatedProps" :class="[getStyle('ui.toast.title'), props.class]">
        <slot />
    </ToastTitle>
</template>
