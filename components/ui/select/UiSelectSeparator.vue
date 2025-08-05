<script setup lang="ts">
import { SelectSeparator  } from 'reka-ui';
import type { SelectSeparatorProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <SelectSeparator v-bind="delegatedProps" :class="[getStyle('ui.select.separator'), props.class]" />
</template>
