<script setup lang="ts">
import type { NumberFieldRootEmits, NumberFieldRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { NumberFieldRoot, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<NumberFieldRootProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<NumberFieldRootEmits>();

const { getStyle } = usePondStyle();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <NumberFieldRoot v-bind="forwarded" :class="[getStyle('ui.numberField.outer'), props.class]">
        <slot />
    </NumberFieldRoot>
</template>
