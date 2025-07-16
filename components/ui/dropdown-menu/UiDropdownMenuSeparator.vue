<script setup lang="ts">
import {
    DropdownMenuSeparator,
    type DropdownMenuSeparatorProps,
} from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<DropdownMenuSeparatorProps & {
  class?: HTMLAttributes['class']
}>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <DropdownMenuSeparator v-bind="delegatedProps" :class="[getStyle('ui.dropdown.separator'), props.class]" />
</template>
