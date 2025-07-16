<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Primitive  } from 'reka-ui';
import type { PrimitiveProps } from 'reka-ui';

const props = withDefaults(
    defineProps<PrimitiveProps & {
        variant?: 'default'|'destructive'|'outline'|'secondary'|'ghost'|'link'
        size?: 'default'|'xs'|'sm'|'lg'|'icon'
        class?: HTMLAttributes['class']
        isLoading?: boolean
    }>(),
    {
        variant: 'default',
        size: 'default',
        class: '',
        isLoading: false,
        as: 'button',
    },
);

const { getStyle } = usePondStyle();
</script>

<template>
    <Primitive
        v-auto-animate
        :as="as"
        :as-child="asChild"
        :class="[getStyle('ui.button.base'), getStyle(`ui.button.variants.${variant}`), getStyle(`ui.button.size.${size}`), props.class]"
        :disabled="isLoading"
    >
        <Icon v-if="isLoading" name="mdi:loading" :class="getStyle('ui.button.spinner')" />

        <slot />
    </Primitive>
</template>
