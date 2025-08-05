<script setup lang="ts">
import type { NumberFieldIncrementProps } from 'reka-ui';
import { cn } from '@/lib/utils';
import { NumberFieldIncrement, useForwardProps } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<NumberFieldIncrementProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
    <NumberFieldIncrement data-slot="increment" v-bind="forwarded" :class="cn('absolute top-1/2 -translate-y-1/2 right-0 disabled:cursor-not-allowed disabled:opacity-20 p-3 cursor-pointer', props.class)">
        <slot>
            <Icon name="mdi:plus" class="size-4 mt-1.5" />
        </slot>
    </NumberFieldIncrement>
</template>
