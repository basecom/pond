<script setup lang="ts">
import { withDefaults, defineProps, defineEmits } from 'vue';

withDefaults(
    defineProps<{
        size?: 'xs' | 'sm' | 'md' | 'lg';
    }>(),
    {
        size: 'md',
    },
);

defineEmits(['load-icon']);
</script>

<template>
    <LayoutImagePlaceholderInner v-bind="$props" v-on="$attrs" />
</template>
