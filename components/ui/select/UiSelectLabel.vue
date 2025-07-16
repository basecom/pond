<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { SelectLabel, type SelectLabelProps } from 'reka-ui';

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>();
const { getStyle } = usePondStyle();
</script>

<template>
    <SelectLabel :class="[getStyle('ui.select.label'), props.class]">
        <slot />
    </SelectLabel>
</template>
