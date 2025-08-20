<script setup lang="ts">
import type { NumberFieldIncrementProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { NumberFieldIncrement, useForwardProps } from 'reka-ui';

const props = defineProps<NumberFieldIncrementProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
    <NumberFieldIncrement data-slot="increment" v-bind="forwarded" :class="[getStyle('ui.numberField.increment.outer'), props.class]">
        <slot>
            <Icon name="mdi:plus" :class="getStyle('ui.numberField.increment.icon')" />
        </slot>
    </NumberFieldIncrement>
</template>
