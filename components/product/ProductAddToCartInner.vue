<script setup lang="ts">
withDefaults(
    defineProps<{
      isLoading?: boolean;
    }>(),
    {
        isLoading: false,
    },
);

const { getStyle } = usePondStyle();

defineEmits<{
    (event: 'addToCart'): void;
}>();
</script>

<template>
    <slot name="wrapper">
        <UiButton
            :class="getStyle('product.add.outer')"
            :is-loading="isLoading"
            @click="$emit('addToCart')"
        >
            {{ $t('listing.boxAddProduct') }}
        </UiButton>
    </slot>
</template>
