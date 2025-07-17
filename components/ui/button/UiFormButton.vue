<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

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
        isSubmit: true,
    },
);

const { getStyle } = usePondStyle();
</script>

<template>
    <ButtonElement
        :submits="isSubmit"
        name="est"
        :add-class="{
            button: [getStyle('ui.button.base'), getStyle(`ui.button.variants.${variant}`), getStyle(`ui.button.size.${size}`), props.class, 'w-full !border-none'],
        }"
        :remove-class="{
            button: 'vf-btn'
        }"
    >
        <Icon v-if="isLoading" name="mdi:loading" :class="getStyle('ui.button.spinner')" />

        <slot />
    </ButtonElement>
</template>
