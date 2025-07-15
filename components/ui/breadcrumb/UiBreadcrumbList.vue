<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();

const { getStyle } = usePondStyle();
</script>

<template>
    <ol
        :class="[getStyle('ui.breadcrumb.list'), props.class]"
    >
        <slot />
    </ol>
</template>
