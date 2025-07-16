<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();

const { getStyle } = usePondStyle();
</script>

<template>
    <span
        role="presentation"
        aria-hidden="true"
        :class="[getStyle('ui.breadcrumb.ellipsis.outer'), props.class]"
    >
        <slot>
            <Icon name="mdi:ellipsis-horizontal" :class="getStyle('ui.breadcrumb.ellipsis.icon')" />
        </slot>

        <span class="sr-only">More</span>
    </span>
</template>
