<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Primitive, type PrimitiveProps } from 'reka-ui';

const props = withDefaults(
    defineProps<{
        variant?: 'default'|'destructive'|'outline'|'secondary'|'ghost'|'link';
        size?: 'default'|'xs'|'sm'|'lg'|'icon';
        class?: HTMLAttributes['class'];
        isLoading?: boolean;
        isSubmit?: boolean;
    }>(),
    {
        variant: 'default',
        size: 'default',
        class: '',
        isLoading: false,
        isSubmit: false,
    },
);

const { getStyle } = usePondStyle();
</script>

<template>
  <ButtonElement
      :loading="isLoading"
      :submits="isSubmit"
      :class="[getStyle('ui.button.base'), getStyle(`ui.button.variants.${variant}`), getStyle(`ui.button.size.${size}`), props.class]"
      :disabled="isLoading"
      full
  >
    <Icon v-if="isLoading" name="mdi:loading" :class="getStyle('ui.button.spinner')" />

    <slot />
  </ButtonElement>
</template>
