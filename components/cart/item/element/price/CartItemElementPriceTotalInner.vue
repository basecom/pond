<script setup lang="ts">
withDefaults(
    defineProps<{
      cartItemTotalPrice?: string
    }>(),
    {
        cartItemTotalPrice: '',
    },
);
</script>

<template>
    <span class="font-bold">
        <slot name="total-price">
            {{ cartItemTotalPrice }}*
        </slot>
    </span>
</template>
