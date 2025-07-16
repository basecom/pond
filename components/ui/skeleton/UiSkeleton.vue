<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

interface SkeletonProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<SkeletonProps>();
const { getStyle } = usePondStyle();
</script>

<template>
    <div
        data-slot="skeleton"
        :class="[getStyle('ui.skeleton'), props.class]"
    />
</template>
