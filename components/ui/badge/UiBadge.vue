<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = withDefaults(
    defineProps<{
        class?: HTMLAttributes['class']
        variant?: 'default'|'secondary'|'destructive'|'outline'|'success'
    }>(),
    {
        class: undefined,
        variant: 'default',
    },
);

const { getStyle } = usePondStyle();
</script>

<template>
    <div
        :class="[getStyle('ui.badge.base'), {
            [getStyle('ui.badge.variants.default')]: variant === 'default',
            [getStyle('ui.badge.variants.secondary')]: variant === 'secondary',
            [getStyle('ui.badge.variants.destructive')]: variant === 'destructive',
            [getStyle('ui.badge.variants.outline')]: variant === 'outline',
            [getStyle('ui.badge.variants.success')]: variant === 'success',
        }, props.class]"
        role="alert"
    >
        <slot />
    </div>
</template>
