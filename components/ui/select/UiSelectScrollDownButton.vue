<script setup lang="ts">
import { SelectScrollDownButton,  useForwardProps } from 'reka-ui';
import type { SelectScrollDownButtonProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<SelectScrollDownButtonProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <SelectScrollDownButton v-bind="forwardedProps" :class="[getStyle('ui.select.scrollDownButton.outer'), props.class]">
        <slot>
            <Icon name="mdi:chevron-down" :class="getStyle('ui.select.scrollDownButton.icon')" />
        </slot>
    </SelectScrollDownButton>
</template>
