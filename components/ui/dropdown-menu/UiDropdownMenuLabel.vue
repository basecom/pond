<script setup lang="ts">
import { DropdownMenuLabel,  useForwardProps } from 'reka-ui';
import type { DropdownMenuLabelProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<DropdownMenuLabelProps & { class?: HTMLAttributes['class'], inset?: boolean }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <DropdownMenuLabel
        v-bind="forwardedProps"
        :class="[{
            [getStyle('ui.dropdown.inset')]: inset
        }, getStyle('ui.dropdown.label'), props.class]"
    >
        <slot />
    </DropdownMenuLabel>
</template>
