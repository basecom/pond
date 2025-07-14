<script setup lang="ts">
import type { RadioGroupItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import {
    RadioGroupIndicator,
    RadioGroupItem,

    useForwardProps,
} from 'reka-ui';

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <RadioGroupItem
        v-bind="forwardedProps"
        :class="[getStyle('ui.radioGroup.item.outer'), props.class]"
    >
        <RadioGroupIndicator :class="getStyle('ui.radioGroup.item.indicator')">
            <Icon name="mdi:check" :class="getStyle('ui.radioGroup.item.icon')" />
        </RadioGroupIndicator>
    </RadioGroupItem>
</template>
