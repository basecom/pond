<script setup lang="ts">
import { DropdownMenuTrigger, type DropdownMenuTriggerProps, useForwardProps } from 'reka-ui';

const props = defineProps<DropdownMenuTriggerProps>();

const { getStyle } = usePondStyle();

const forwardedProps = useForwardProps(props);
</script>

<template>
    <DropdownMenuTrigger :class="getStyle('ui.dropdown.menuTrigger')" v-bind="forwardedProps">
        <slot />
    </DropdownMenuTrigger>
</template>
