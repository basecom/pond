<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();

const { getStyle } = usePondStyle();
</script>

<template>
    <h5 :class="[getStyle('ui.alert.title'), props.class]">
        <slot />
    </h5>
</template>
