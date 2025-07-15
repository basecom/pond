<script setup lang="ts">
withDefaults(
    defineProps<{
      cartItemTotalPrice?: number
    }>(),
    {
        cartItemTotalPrice: 0,
    },
);
const { getFormattedPrice } = usePrice();
</script>

<template>
    <span class="font-bold">
        <slot name="total-price">
            {{ getFormattedPrice(cartItemTotalPrice) }}*
        </slot>
    </span>
</template>
