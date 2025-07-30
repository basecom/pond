<script setup lang="ts">
import { SelectIcon, SelectTrigger,  useForwardProps } from 'reka-ui';
import type { SelectTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <SelectTrigger
        v-bind="forwardedProps"
        :class="[getStyle('ui.select.trigger.outer'), props.class]"
    >
        <slot />
        <SelectIcon as-child>
            <Icon name="mdi:chevron-down" :class="getStyle('ui.select.trigger.icon')" />
        </SelectIcon>
    </SelectTrigger>
</template>
