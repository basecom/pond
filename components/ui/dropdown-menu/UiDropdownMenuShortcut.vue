<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();

const { getStyle } = usePondStyle();
</script>

<template>
    <span :class="[getStyle('ui.dropdown.shortcut'), props.class]">
        <slot />
    </span>
</template>
