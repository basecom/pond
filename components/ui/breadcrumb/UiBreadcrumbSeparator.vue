<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();

const { getStyle } = usePondStyle();
</script>

<template>
    <li
        role="presentation"
        aria-hidden="true"
        :class="[getStyle('ui.breadcrumb.separator'), props.class]"
    >
        <slot>
            <Icon name="mdi:chevron-right" />
        </slot>
    </li>
</template>
