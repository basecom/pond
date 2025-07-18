<script setup lang="ts">
import {
    DropdownMenuSubTrigger,
    
    useForwardProps,
} from 'reka-ui';
import type { DropdownMenuSubTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<DropdownMenuSubTriggerProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <DropdownMenuSubTrigger
        v-bind="forwardedProps"
        :class="[getStyle('ui.dropdown.subTrigger.outer'), props.class]"
    >
        <slot />

        <Icon name="mdi:chevron-right" :class="getStyle('ui.dropdown.subTrigger.icon')" />
    </DropdownMenuSubTrigger>
</template>
