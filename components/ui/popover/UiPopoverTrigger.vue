<script setup lang="ts">
import { PopoverTrigger, type PopoverTriggerProps } from 'reka-ui';

const props = defineProps<PopoverTriggerProps>();

const { getStyle } = usePondStyle();
</script>

<template>
    <PopoverTrigger v-bind="props" :class="getStyle('ui.popover.trigger')">
        <slot />
    </PopoverTrigger>
</template>
