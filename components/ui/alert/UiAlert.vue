<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = withDefaults(
    defineProps<{
        class?: HTMLAttributes['class']
        variant?: 'default'|'successful'|'destructive'
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
        :class="[getStyle('ui.alert.base'), {
            [getStyle('ui.alert.variants.default')]: variant === 'default',
            [getStyle('ui.alert.variants.destructive')]: variant === 'destructive',
            [getStyle('ui.alert.variants.successful')]: variant === 'successful',
        }, props.class]"
        role="alert"
    >
        <slot />
    </div>
</template>
