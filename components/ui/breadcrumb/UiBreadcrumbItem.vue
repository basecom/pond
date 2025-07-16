<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();

const { getStyle } = usePondStyle();
</script>

<template>
    <li :class="[getStyle('ui.breadcrumb.item'), props.class]">
        <slot />
    </li>
</template>
