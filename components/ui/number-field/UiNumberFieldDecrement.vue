<script setup lang="ts">
import type { NumberFieldDecrementProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { NumberFieldDecrement, useForwardProps } from 'reka-ui';

const props = defineProps<NumberFieldDecrementProps & { class?: HTMLAttributes['class'] }>();

const { getStyle } = usePondStyle();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
    <NumberFieldDecrement data-slot="decrement" v-bind="forwarded" :class="[getStyle('ui.numberField.decrement.outer'), props.class]">
        <slot>
            <Icon name="mdi:minus" :class="getStyle('ui.numberField.decrement.icon')" />
        </slot>
    </NumberFieldDecrement>
</template>
