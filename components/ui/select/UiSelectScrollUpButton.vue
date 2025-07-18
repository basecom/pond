<script setup lang="ts">
import { SelectScrollUpButton,  useForwardProps } from 'reka-ui';
import type { SelectScrollUpButtonProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<SelectScrollUpButtonProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <SelectScrollUpButton v-bind="forwardedProps" :class="[getStyle('ui.select.scrollUpButton.outer'), props.class]">
        <slot>
            <Icon name="mdi:chevron-up" :class="getStyle('ui.select.scrollUpButton.icon')" />
        </slot>
    </SelectScrollUpButton>
</template>
