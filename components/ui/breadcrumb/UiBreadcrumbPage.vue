<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();

const { getStyle } = usePondStyle();
</script>

<template>
    <span
        role="link"
        aria-disabled="true"
        aria-current="page"
        :class="[getStyle('ui.breadcrumb.page'), props.class]"
    >
        <slot />
    </span>
</template>
