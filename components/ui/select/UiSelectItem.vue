<script setup lang="ts">
import {
    SelectItem,
    SelectItemIndicator,
    
    SelectItemText,
    useForwardProps,
} from 'reka-ui';
import type { SelectItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <SelectItem
        v-bind="forwardedProps"
        :class="[getStyle('ui.select.item.outer'), props.class]"
    >
        <span :class="getStyle('ui.select.item.inner')">
            <SelectItemIndicator>
                <Icon name="mdi:check" :class="getStyle('ui.select.item.icon')" />
            </SelectItemIndicator>
        </span>

        <SelectItemText>
            <slot />
        </SelectItemText>
    </SelectItem>
</template>
