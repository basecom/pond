<script setup lang="ts">
import { ToastDescription, type ToastDescriptionProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<ToastDescriptionProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <ToastDescription :class="[getStyle('ui.toast.description'), props.class]" v-bind="delegatedProps">
        <slot />
    </ToastDescription>
</template>
