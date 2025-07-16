<script setup lang="ts">
import { DropdownMenuTrigger,  useForwardProps } from 'reka-ui';
import type { DropdownMenuTriggerProps } from 'reka-ui';

const props = defineProps<DropdownMenuTriggerProps>();

const { getStyle } = usePondStyle();

const forwardedProps = useForwardProps(props);
</script>

<template>
    <DropdownMenuTrigger :class="getStyle('ui.dropdown.menuTrigger')" v-bind="forwardedProps">
        <slot />
    </DropdownMenuTrigger>
</template>
